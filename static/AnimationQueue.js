class AnimationQueue {

    /**
     * Constructs an animation queue.
     * @param {PIXI.Application} app a reference to the pixi application
     */
    constructor(app) {
        this.queue = [];
    }

    /**
     * The queue doesn't animate until this function is called.
     */
    startAnimating() {
        app.ticker.add(function(delta) {
            this.queue.forEach(function(request){
                request.sprite.x += i.xDistance*delta;
                request.sprite.y += i.yDistance*delta;
            });
            this.queue = this.queue.filter(function(value) {
                return !(Math.abs(to.x-value.sprite.x) <= i.xDistance*delta);
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
