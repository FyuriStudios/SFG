class AnimationQueue {

    /**
     * Constructs an animation MoveQueue.
     * @param {PIXI.Application} app a reference to the pixi application
     */
    constructor(app) {
        this.MoveQueue = [];
        this.SizeQueue = [];
        this.app = app;
    }

    /**
     * The MoveQueue doesn't animate until this function is called.
     */
    startAnimating() {
        //PIXI's standard ticker
        //nmq and nsq are how we get around scope errors.
        var nmq = [];
        var nsq = [];
        this.app.ticker.add((delta)=>{
            nmq.forEach(element => this.MoveQueue.push(element));
            nmq = [];
            nsq.forEach(element => this.SizeQueue.push(element));
            nsq = [];
            this.MoveQueue.forEach((request)=>{
                request.sprite.x += request.xDistance*delta;
                request.sprite.y += request.yDistance*delta;
            });
            this.SizeQueue.forEach((request)=>{

                request.sprite.scale.x += (request.to.x / request.init.x)/(request.ticks*(60/delta));
                request.sprite.scale.y += (request.to.y / request.init.y)/(request.ticks*(60/delta));
                request.ticksDone++;
            });
            //filters out complete requests from the MoveQueue.
            this.MoveQueue = this.MoveQueue.filter((value)=>{
                let targetdx = value.to.x-value.sprite.x;
                let targetdy = value.to.y-value.sprite.y;
                let targetDistance = Math.sqrt(targetdx*targetdx+targetdy*targetdy);

                let framedx = value.xDistance * delta;
                let framedy = value.yDistance * delta;
                let frameDistance = Math.sqrt(framedx*framedx + framedy*framedy);

                if(targetDistance <= frameDistance) {
                      value.sprite.x = value.to.x;
                      value.sprite.y = value.to.y;
                      value.sprite.inMoveQueue = false;
                      if (typeof value.sprite.mq !== 'undefined' && value.sprite.mq.length > 0) {
                        let push = value.sprite.mq[0];
                        let dx = push.to.x - value.sprite.x;
                        let dy = push.to.y - value.sprite.y;

                        //find the total distance travelled
                        let totalDistance = Math.sqrt(dx*dx + dy*dy);
                        nmq.push({
                            sprite: value.sprite,
                            xDistance: dx/totalDistance * push.vel,
                            yDistance: dy/totalDistance * push.vel,
                            to: push.to,
                            vel: push.vel
                        });
                        value.sprite.mq.shift();
                        value.sprite.inMoveQueue = true;

                      }
                      return false;
                    }
                return true;
            });
            this.SizeQueue = this.SizeQueue.filter((value)=>{
                if(value.ticksDone > value.ticks) {
                      console.log('hey');
                      value.sprite.scale.x = value.to.x * value.startx;
                      value.sprite.scale.y = value.to.y * value.starty;
                      value.sprite.inSizeQueue = false;
                      if (typeof value.sprite.sq !== 'undefined' && value.sprite.sq.length > 0) {
                        let push = value.sprite.sq[0];
                        let initsx = push.sprite.scale.x;
                        let initsy = push.sprite.scale.y;

                        //find the total sDistance travelled
                        nsq.push({
                          sprite: push.sprite,
                          init: {x:initsx,y:initsy},
                          to: push.to,
                          ticks: push.ticks,
                          ticksDone: 0
                        });
                        value.sprite.sq.shift();
                        value.sprite.inSizeQueue = true;

                      }
                      return false;
                    }
                return true;
            });
        });
    }

    cancelMoveRequest(sprite){
      for (let i = 0; i < this.MoveQueue.length; i++) {
        if (this.MoveQueue[i].sprite !== undefined) {
        if (this.MoveQueue[i].sprite == sprite) {
          this.MoveQueue.splice(i, 1);
          if (sprite.mq !== undefined && sprite.mq.length > 0) {
            let push = sprite.mq[0];
            let dx = push.to.x - sprite.x;
            let dy = push.to.y - sprite.y;

            //find the total distance travelled
            let totalDistance = Math.sqrt(dx*dx + dy*dy);
            this.MoveQueue.push({
                sprite: sprite,
                xDistance: dx/totalDistance * push.vel,
                yDistance: dy/totalDistance * push.vel,
                to: push.to,
                vel: push.vel
            });
            sprite.mq.shift();
            sprite.inMoveQueue = true;
        }
      }
    }
    }
  }
    /**
     * Adds an movement animation to the MoveQueue.
     * @param {PIXI.Sprite} sprite
     * @param {Any} to the location to animate to
     * @param {number} vel the velocity to animate the sprite at, optional
     * @returns void
     */
    addMoveRequest(sprite, to, vel = 1) {
        let dx = to.x - sprite.x;
        let dy = to.y - sprite.y;

        //find the total distance travelled
        let totalDistance = Math.sqrt(dx*dx + dy*dy);
        //pushes request object in MoveQueue array
        if (sprite.inMoveQueue !== true) {
          sprite.inMoveQueue = true;
          this.MoveQueue.push({
              sprite: sprite,
              xDistance: dx/totalDistance * vel,
              yDistance: dy/totalDistance * vel,
              to: to,
              vel: vel,
          });
        } else if (sprite.mq == undefined) {
          sprite.mq = [];
          sprite.mq.push({
              sprite: sprite,
              xDistance: dx/totalDistance * vel,
              yDistance: dy/totalDistance * vel,
              to: to,
              vel: vel
          });
        } else {
          sprite.mq.push({
              sprite: sprite,
              xDistance: dx/totalDistance * vel,
              yDistance: dy/totalDistance * vel,
              to: to,
              vel: vel
          });
        }
    }
    addSizeRequest(sprite, to, ticks = 60) {
      let initsx = sprite.scale.x;
      let initsy = sprite.scale.y;

      if (sprite.inSizeQueue !== true) {
        sprite.inSizeQueue = true;
        this.SizeQueue.push({
          sprite: sprite,
          init: {x:initsx,y:initsy},
          to: to,
          ticks: ticks,
          ticksDone: 0
        })
      } else if (sprite.sq == undefined) {
        sprite.sq = [];
        sprite.sq.push({
          sprite: sprite,
          init: {x:initsx,y:initsy},
          to: to,
          ticks: ticks,
          ticksDone: 0
        });
      } else {
        sprite.sq.push({
          sprite: sprite,
          init: {x:initsx,y:initsy},
          to: to,
          ticks: ticks,
          ticksDone: 0
        });
      }

    }
    /**
     * Adds a size animation to the MoveQueue.
     * @param {PIXI.Sprite} sprite
     * @param {Any} targetSize the target size multiplier (i.e. 2 would be twice as big)
     * @param {number} vel the velocity to animate the sprite at, optional
     * @returns void


    addSizeRequest(sprite, targetSize, vel = 1) {
      let dsx =
      let dsy =
    }
    */
}
