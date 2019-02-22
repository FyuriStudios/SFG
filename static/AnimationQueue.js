class AnimationQueue {

    /**
     * Constructs an animation queue.
     * @param {PIXI.Application} app a reference to the pixi application
     */
    constructor(app) {
        this.queue = [];
        this.app = app;
    }

    /**
     * The queue doesn't animate until this function is called.
     */
    startAnimating() {
        //PIXI's standard ticker
        this.app.ticker.add((delta)=>{

            this.queue.forEach((request)=>{
                console.log(request.xDistance + ' ' + request.yDistance);
                request.sprite.x += request.xDistance*delta;
                request.sprite.y += request.yDistance*delta;
            });
            //filters out complete requests from the queue.
            this.queue = this.queue.filter((value)=>{
                let targetdx = value.to.x-value.sprite.x;
                let targetdy = value.to.y-value.sprite.y;
                let targetDistance = Math.sqrt(targetdx*targetdx+targetdy*targetdy);

                let framedx = value.xDistance * delta;
                let framedy = value.yDistance * delta;
                let frameDistance = Math.sqrt(framedx*framedx + framedy*framedy);

                if(targetDistance <= frameDistance) {
                      value.sprite.x = value.to.x;
                      value.sprite.y = value.to.y;
                      return false;
                    }
                return true;
            });
        });
    }

    /**
     * Adds an movement animation to the queue.
     * @param {PIXI.Sprite} sprite
     * @param {Any} to the location to animate to
     * @param {number} vel the velocity to animate the sprite at, optional
     * @returns void
     */
    addRequest(sprite, to, vel = 1) {
        let dx = to.x - sprite.x;
        let dy = to.y - sprite.y;

        //find the total distance travelled
        let totalDistance = Math.sqrt(dx*dx + dy*dy);
        //pushes request object in queue array
        this.queue.push({
            sprite: sprite,
            xDistance: dx/totalDistance * vel,
            yDistance: dy/totalDistance * vel,
            to: to,
        });
    }

    /**
     * Adds a size animation to the queue.
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
