let FlexTokens = (function() {
    return {
        choose: function(app, game, total, completion) {
            let plusButton1 = new PIXI.Sprite(textures.plusButton);
            let plusButton2 = new PIXI.Sprite(textures.plusButton);
        
            let actionTokenCount = 0;
            let monsterTokenCount = 0;
        
            let actionTokenText = new PIXI.Text(actionTokenCount, {fontFamily: 'Helvetica',
            fill: 0xffffff,
            fontSize: 100,
            stroke: 'black',
            strokeThickness: 8,
            align: 'center'});
        
            let monsterTokenText = new PIXI.Text(monsterTokenCount, {fontFamily: 'Helvetica',
            fill: 0xffffff,
            fontSize: 100,
            stroke: 'black',
            strokeThickness: 8,
            align: 'center'});

            let doneButton = new PIXI.Sprite()

            let tokenContainer = new PIXI.Container();

            app.stage.addChild(tokenContainer);
            tokenContainer.width = app.stage.width * .5;
            tokenContainer.height = app.stage.height * .5;

            tokenContainer.x = .25 * app.stage.width;
            tokenContainer.y = .25 * app.stage.height;

            tokenContainer.interactiveChildren = true;

            plusButton1.anchor.y = .5;
            tokenContainer.addChild(plusButton1);
            plusButton1.x = 0;
            plusButton1.y = tokenContainer.height * .5;
            plusButton1.height = plusButton1.width = tokenContainer.height * .15;

            plusButton2.anchor.y = .5;
            tokenContainer.addChild(plusButton2);
            plusButton2.height = plusButton2.width = tokenContainer.height * .15;
            plusButton2.x = tokenContainer.width - plusButton2.width;
            plusButton1.y = tokenContainer.height * .5;

            actionTokenText.anchor.x = actionTokenText.anchor.y = .5;
            let actionWTHRatio = actionTokenText.width / actionTokenText.height;
            //TODO: finish this
            


        }
    }
})();