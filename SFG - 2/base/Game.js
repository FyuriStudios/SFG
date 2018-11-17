import './Events'

class Game {

  constructor(player1, player2) {
    this.player1 = player1
    this.player2 = player2
    this.turnCounter = 0
    this.eventHistory = []
  }

  get allEffects() {
    return player1.board.concat(player1.effects).concat(player1)
  }

  get currentPlayer() {
    return (turnCounter%4 == 1 || turnCounter%4 == 2) ? player1:player2
    //if it's 1,2... 5,6... 9,10... then player 1's turn.
    //if it's 3,4... 7.8... player 2's turn.
  }

  endTurn() {
    eventHistory.push(new TurnEndEvent(this))
    turnCounter++
    for(element in effects){
      if(element.hasTurnIncrement())
        element.turnIncrement()
    }
    killDead()
  }

  startTurn() {
    eventHistory.push(new events.TurnBeginsEvent(this))
    turnCounter++
    for(element in effects){
      if(element.hasTurnIncrement())
        element.turnIncrement()
    }
    killDead()
  }

  killDead() {

  }

  runTurn() {
    startTurn()
    currentPlayer.draw()

    turnRunning = true

    do {
    	input = currentPlayer.waitForInput()




    } while(turnRunning)




  }

}