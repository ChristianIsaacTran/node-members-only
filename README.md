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


