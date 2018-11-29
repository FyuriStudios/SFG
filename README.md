# The repository currently housing the NodeJS SFG project.
The main code is mostly sitting under "base". Go in there, unless you're writing the frontend.
## If you want to host your own server, you'll have to set up a port forward on your home router. 
If you need help with that, ask ~~Jesus~~ the Internet. I recommend setting the server up on port 6001 because then you won't have to edit the code at all.
Then, you'll need to run "Server.js" because I haven't properly configured the startup file yet. I'm lazy, sorry.
Something like:
```bash
> cd "~/git/SFG/base"
> node Server.js
```
If that doesn't work, ask ~~Jesus~~ Hughes for help. Or just ask him to host a server for you since he wrote the source code.

#### To do:
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
