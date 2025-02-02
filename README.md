# Project Plan - Chat Application with RTK Query

## Requirement Analysis

1. user can register. after registering, user will be automatically logged in, we will store login info to localStorage (for login persistance) and redirected to inbox page

2. user can login and after login we will save the login information in localStorage (for login persistance) and redirect user to inbox

3. load sidebar messages from conversation API and implement load more feature

4. load specific conversation messages when user clicks on it and implement load more feature

5. when user sends message,
   a) if conversation id is present, update conversation table and also inserts into messages table
   b) if conversation id is missing, get conversation id using filter
   _ if conversation id exists, then update that conversation and add to messages table
   _ if conversation id is missing, insert that conversation and add to messages table

6. sidebar conversation list scroll - sort by latest first and when user loads more, bring previous "10 conversations sorted by latest first" and pushed into the conversations array

7. messages list scroll - bring "10 latest messages per request sorted by oldest first". when user loads more, "bring previous 10 messages sorted again by oldest first" and unshift into the array

## Required APIs

1. register
2. login
3. get list of users other than requesting user
4. update conversation
5. insert conversation
6. find conversation
7. list conversation
8. list messages by conversation id
9. send message (insert messages into messages table)

Please follow the below instructions to run this branch in your machine:

1. Login to the GitHub account on which you have been granted access to this repository. If you have purchased the course but didn't get the access to this repository, please contact our support team. You will find contact details below.

2. Clone this repository -
   ```sh
   git clone https://github.com/sumancse26/chat-application.git
   ```
3. Go to the cloned project directory

   ```sh
   cd chat-application
   ```

4. Install dependencies
   ```sh
   npm i
   ```
5. Install VS Code [Live Server plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) & start the server.
   ```sh
   npm start
   ```
6. Your app should be available in http://localhost:3000

<br>
