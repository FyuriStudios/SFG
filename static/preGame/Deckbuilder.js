let character;
let font;

// console.log(document.getElementById('music'));
// document.getElementById('music').play();

character = localStorage.getItem("character");
console.log(character);

let app = new PIXI.Application({
    antialias: true,
    transparent: true,
    forceCanvas: false //these are just some options that we applied in the constructor. See PIXI documentation for more details.
});

document.addEventListener('mousedown', function (event) {
    console.log('x: ' + event.clientX / app.stage.width);
    console.log('y: ' + event.clientY / app.stage.height);
});

/*
            Don't touch this. Everything breaks if you do.
            */
setTimeout(() => {
    app.stage.width = innerWidth;
    app.stage.height = innerHeight;

    app.renderer.resize(innerWidth, innerHeight);

    document.body.appendChild(app.view);
}, 50);




switch (character) {
    case "ignea":
        ignea();
        break;

    case "lorewell":
        lorewell();
        break;

    case "caius":
        caius();
        break;

    case "yakov":
        yakov();
        break;
}


function resizeDisplay() {

    /*
    Changes height and width to the new screen size.
    */
    app.stage.width = innerWidth;
    app.stage.height = innerHeight;

    /*
    Force resizes the screen in the renderer.
    */
    app.renderer.resize(innerWidth, innerHeight);

    /*
    Adds a new view child. This might be unnecessary but I haven't tested it much.
    */
    document.body.appendChild(app.view);
}