# purpose of this repo

- This is to implement the "members only" project from the odin project.

https://www.theodinproject.com/lessons/node-path-nodejs-members-only

- This is to go over the authentication learned last lessons using the passport middleware and the bcryptjs library to encrypt/hash passwords and secret keys.

## project specificationsmous posts

- Implement a project where members can
  write anonymous posts, but if logged in, authenticated members can also see who the author of the post is,
  but outside they can only see the story and not see who wrote it.

- I am going to also try to store sessions and cookies to remember who is logged in throughout the app with the use of
  passport's serializeUser() and deserializeUser().

          - Remember to use app.use(passport.session()); after session definition to define session, and use connect-pg-simple to connect the DB with sessions.

## note to myself

- This time, I am just going to practice the concepts of the lesson itself, so I am not styling anything (except for small layout).

- The behavior as I understand it is:

      - If user is not logged in or if user is logged in but not a member:

        1. can view messages
        2. cannot see author of messages
        3. cannot delete, or write posts

      - If user is logged in and a member, but NOT admin:

        1. can view messages
        2. can see author of messages
        3. cannot delete
        4. can write new posts under their username

      - If user is logged in, a member, AND an admin:

        1. can view messages
        2. can see author of messages
        3. can delete messages
        4. can write new posts under their username

- User sign up behavior is:

      - Anyone can signup and login, but not everyone is a member

      - Anyone who has an account can become a "member" by entering in a secret key which changes their membership status. Should be a separate page with a route

      - Anyone who is the admin can either signup as one, or enter in another secret passcode to become one (probably gonna do the passcode thing again).

- User info stored in DB is:

      user table:
      - full names
      - usernames (or emails)
      - password (hashed)
      - membership status
      - admin status

      messages table:
      - author (username)
      - title of message
      - message content 
      - timestamp of when message was made

      membership password table:
      - membership pass

      admin password table:
      - admin pass

      Sessions table:
      (user sessions get stored here from connect-pg-simple and passport)



