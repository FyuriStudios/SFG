let AnimationQueue = (function() {

    let moveQueue = [];
    let completions = [];

return {

    startAnimating: function (pixiApp) {

        let app = pixiApp;

        app.ticker.add((delta)=>{

            //filters out complete requests from the MoveQueue.
            moveQueue = moveQueue.filter((value)=>{

                let targetdx = value.to.x-value.sprite.x;
                let targetdy = value.to.y-value.sprite.y;
                let targetDistance = Math.sqrt(targetdx*targetdx + targetdy*targetdy);
    
                let framedx = value.xDistance * delta * app.stage.height / 1080;
                let framedy = value.yDistance * delta * app.stage.height / 1080;
                let frameDistance = Math.sqrt(framedx*framedx + framedy*framedy);
    
                if(targetDistance <= frameDistance || value.xDistance * (value.sprite.x - value.to.x) == -1 || value.yDistance * (value.sprite.y - value.to.y) == -1) {
                    value.sprite.x = value.to.x;
                    value.sprite.y = value.to.y;
                    value.sprite.inMoveQueue = false;

                    if(value.onComplete != null) {
                        completions.push(value.onComplete);
                    }

                    return false;
                }
                
                else if(value.sprite.inMoveQueue) {
                    value.sprite.x += value.xDistance*delta;
                    value.sprite.y += value.yDistance*delta;
                    return true;
                }

                return false;

            });

            completions.forEach(callBack => callBack());
            completions = [];

        });
    },

    cancelMoveRequest: function(sprite){
        for(let i = 0; i < moveQueue.length; i++) {
            if(moveQueue[i].sprite != undefined && moveQueue[i].sprite == sprite) {
                moveQueue.splice(i, 1);
            }
        }
        sprite.inMoveQueue = false;
    },

    /**
    * Adds an movement animation to the MoveQueue.
    * @param {PIXI.Sprite} sprite
    * @param {Any} to the location to animate to
    * @param {number} vel the velocity to animate the sprite at, optional
    * @returns void
    */
    addMoveRequest: function (sprite, to, vel = 1, onComplete = null) {
        if(to.x == sprite.x && to.y == sprite.y) {
            if(onComplete != null) {
                onComplete();
            }
            return true;
        }

        let dx = to.x - sprite.x;
        let dy = to.y - sprite.y;

        //find the total distance travelled
        let totalDistance = Math.sqrt(dx*dx + dy*dy);

        //pushes request object in MoveQueue array
        if(!sprite.inMoveQueue) {
            sprite.inMoveQueue = true;
            moveQueue.push({
                onComplete : onComplete,
                sprite: sprite,
                xDistance: dx/totalDistance * vel,
                yDistance: dy/totalDistance * vel,
                to: to,
                vel: vel,
            });
            return true;
        } 
        return false;
    }

}    

})();
