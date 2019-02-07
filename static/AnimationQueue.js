export default class AnimationQueue {
    
    /**
     * Constructs an animation queue.
     * @param {PIXI.Application} app a reference to the pixi application
     */
    constructor(app) {
        this.queue = [];
        app.ticker.add(function(delta) {
            for(var i of queue) {
                i.sprite.x += i.xDistance*delta;
                i.sprite.y += i.yDistance*delta;
            }
            this.queue = this.queue.filter(function(value) {
                return !(Math.abs(to.x-value.sprite.x) <= i.xDistance*delta);
            })
        })
    }

    /**
     * Adds an animation to the queue.
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

        this.queue.push({
            sprite: sprite,
            xDistance: dx/totalDistance * vel,
            yDistance: dy/totalDistance * vel,
            to: to,
        });
    }


}