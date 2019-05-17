let character;
let music;
let font;

function preload() {
    //load music
    music = loadSound('/static/assets/sounds/STRUGGLE_FOR_GERA.m4a');

    //load font
    font = loadFont('/static/assets/fonts/Piedra-Regular.ttf');

    character = localStorage.getItem("character");

    console.log(character);

    switch (character) {
        case "ignea":
            preloadIgnea();
            break;

        case "lorewell":
            preloadLorewell();
            break;

        case "caius":
            preloadCaius();
            break;

        case "yakov":
            preloadYakov();
            break;

        case "rinwald":
            preloadRinwald();
            break;

        default:
            return;
    }
}

function setup() {
    clear();

    //loop sound
    if (!music.isPlaying())
        music.play();


    switch (character) {
        case "ignea":
            setupIgnea();
            break;

        case "lorewell":
            setupLorewell();
            break;

        case "caius":
            setupCaius();
            break;

        case "yakov":
            setupYakov();
            break;

        case "rinwald":
            setupRinwald();
            break;

        default:
            return;
    }
}

function draw() {
    switch (character) {
        case "ignea":
            drawIgnea();
            break;

        case "lorewell":
            drawLorewell();
            break;

        case "caius":
            drawCaius();
            break;

        case "yakov":
            drawYakov();
            break;

        case "rinwald":
            drawRinwald();
            break;

        default:
            return;
    }
}