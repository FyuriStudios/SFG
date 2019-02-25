//for easier use of control f when making shapes
this.SizeQueue = this.SizeQueue.filter((value)=>{
    let targetdx = (to.x * sprite.scale.x) - sprite.scale.x;
    let targetdy = (to.y * sprite.scale.y) - sprite.scale.y;
    let targetsDistance = Math.sqrt(targetdx*targetdx+targetdy*targetdy);

    let framedx = value.xsDistance * delta;
    let framedy = value.ysDistance * delta;
    let framesDistance = Math.sqrt(framedx*framedx + framedy*framedy);

    if(targetsDistance <= framesDistance) {
          value.sprite.scale.x = value.to.x * value.startx;
          value.sprite.scale.y = value.to.y * value.starty;
          value.sprite.inSizeQueue = false;
          if (typeof value.sprite.sq !== 'undefined' && value.sprite.sq.length > 0) {
            let push = value.sprite.sq[0];
            let dsx = (push.to.x * push.sprite.scale.x) - push.sprite.scale.x;
            let dsy = (push.to.y * push.sprite.scale.y) - push.sprite.scale.y;
            let tsd = Math.sqrt(dsx*dsx + dsy*dsy);

            //find the total sDistance travelled
            nsq.push({
              sprite: sprite,
              xsDistance: dsx/tsd * vel,
              ysDistance: dsy/tsd * vel,
              startx: push.sprite.scale.x,
              starty: push.sprite.scale.y,
              to: push.to,
              vel: push.vel
            });
            value.sprite.sq.shift();
            value.sprite.inSizeQueue = true;

          }
          return false;
        }
    return true;
});
