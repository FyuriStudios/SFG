//for easier use of control f when making shapes
     if (innerWidth * aspectRatio  <= innerHeight) {
        app.renderer.resize(window.innerWidth - offset, window.innerWidth*aspectRatio - offset);
        ScalerX = window.innerWidth - offset;
        ScalerY = window.innerWidth*aspectRatio - offset;
    } else if (innerWidth * aspectRatio  > innerHeight) {
        app.renderer.resize(window.innerHeight/aspectRatio - offset, window.innerHeight - offset);
        ScalerX = window.innerHeight/aspectRatio - offset;
        ScalerY = window.innerHeight - offset;
    }
