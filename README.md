# dispensable-chat
 Socket.io party chat
 Team: Eugene Baah and Jeff Ware

 http://jsdev.learnersguild.org/goals/378-Socket-Party_Chat.html

 ## Instructions

 Type the following in your terminal
 1. `git clone https://github.com/eobaah/socketio.git`
 2. `cd trevorSocket`
 3. `npm run init-db`
 4. Get the Secret code from our team via Slack
 5. `echo "The secret code you got from us" > .env`
 6. `npm start`
 8. Open Google chrome to `localhost:3000`
 9. Say "WOW this is amazing!"
 10. Give us 100% on the project in slack by typing `/review our amazing project`
 11. Give us high-fives too.

 ## Specifications

 Our own added spec. (Gives us credit/points for it? I heard it's a guild wide spec now)
 - [ ] No linting errors. You can run eslint with `npm run lint`.

 ### General Specs

 - [ ] App has a **landing page** (on route `/`) where a user can either **log in** of **sign up**.
 - [ ] App has a **home page** (on route `/home`) where the user can see a list of chatrooms they have subscribed to along with a feed of all the conversation for currently selected room.
 - [ ] Uses Socket.io to make a socket.
 - [ ] Uses ajax/fetch calls to communicate with API endpoints.
 - [ ] Backend view rendering ( via pug or HTML ) is separated from API and socket actions.
 - [ ] Uses Javascript and/or jQuery for dymanic DOM mode creation and manipulation.
 - [ ] Repo includes a README.md with [spec list](http://jsdev.learnersguild.org/) and it is checked off with completed specs.
 - [ ] All dependancies are properly declared in a `package.json`
 - [ ] Variables, functions, files, etc. have appropriate and meaningful names.
 - [ ] Functions are small and serve a single purpose.
 - [ ] The artifact produced is properly licensed, preferably with the MIT license.

 ### User log-in/sign-up story

 - [ ] View has a `log-in` button.
 - [ ] View has a `sign-up` button.
 - [ ] When `log-in` button is clicked, both `log-in` and `sign-up` button are hidden and a `log-in form` takes their place on the screen.
 - [ ] Same as above for `sign` up, but instead of a `log-in form` we see a `sign-up form`.
 - [ ] On **either form** clicking a `cancel` button removes the form from view, and we again get a view with the two buttons.
 - [ ] On `log-in form`, clicking submit will check to see if the user exists and authenticate the entered password with the user's stored password.
 - [ ] On `sign-up form`, clicking submit adds them to the database and logs them in.
 - [ ] On log-in, after the user is authenticated, a session is set.
 - [ ] Closing the page and reopening it will redirect user to `/home`
 - [ ] Session persists until `logout` or after 30 minutes pass.

 ### User chatroom story

 - [ ] User can make a new chatroom by clicking a button.
 - [ ] User can search on a search bar that auto-completes with all of the chatrooms in the database that match the entered string.
 - [ ] User can see a `chatroom list` of all of the chatrooms they have subscribed too.
 - [ ] `<div class='messages [other classes] >'` exists as a container to where messages for a current chatroom are displayed.
 - [ ] When a chatroom in `chatroom list` is clicked, the `<div class='messages [other classes] >` displays a list of all the current messages in that chatroom.
 - [ ] User can unsubscribe from a chatroom and it is deleted from their `chatroom list`.
 - [ ] `messages div` has a textarea where you can enter a message.
 - [ ] User can send a message by clicking a send button and/or pressing the enter keyboard key.
 - [ ] Messages are displayed in descending chronological order. ( oldest on top of history )
 - [ ] User's sent messages are displayed on the right side, all other messages on the left side.
 - [ ] Anytime a message is sent, anyone in the chatroom can see the new message almost immediately. (You can do this by logging in as a different user on a new browser window )
