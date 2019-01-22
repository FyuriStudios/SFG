# Struggle for Gera
This is an original digital card game, currently in the very early pre-alpha development stages.
The SFG team consists of a group of friends who love to argue about what makes Hearthstone a bad game, or why Gwent sucks. When we realized that we could do something productive with our arguments like make our own game, we blew our own minds. So here we are. [Here](https://docs.google.com/document/d/1ToZ-R1VW1rttV7YrFwHCyrx4SerWhkX7QIUp_DqHmvk/edit?usp=sharing) is the link to the official rules document. If the rules don't make any sense, sorry: We wrote them, so maybe it only makes sense to us.

## The code
The frontend code is located [here](./static). The backend code is located [here](./base). Tests are located [here](./tests).

The backend code is meant to be run using NodeJS on a server. It serves up a webpage (which is mostly just an embedded JS script, lol.) ```/static``` contains everything regarding the webpage.

If you have questions about the backend, go to Hughes. He wrote all of it.

If you have questions about the frontend, go to Sean. That's his job.

#### To do list:
1. Implement graphics.

2. Get monster combat working.

3. Get event history working.
  *   Add event history to graphics.
  *   Get event history to function with the backend.
  *   Get event history to function with the frontend.
  
4. Get an effect framework working.
  *   Get it functioning with events.
  *   Make a few simple test cards.
  
5. Get quests working.
  *   Add graphics for quests.
  *   Add quests on the backend.
  *   Add quests on the frontend.
  
6. Get effects added fully.
  *   Add graphics.
  *   Test for frontend and backend.
  
7. Add cards to game.

8. Create a deckbuilder.
  *   Add a graphical deckbuilder.
  *   Implement on backend.
  *   Implement on frontend.
  
9. Make graphics pretty.

10. Win.

11. Profit
