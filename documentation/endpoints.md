**Individual Exercises**

  - /exercises - POST new individual Exercise
  - /exercises/ - GET Exercises with Ratings, Comments, and Likeds
  - /exercises/:id - DELETE individual Exercise
  - /exercises/:id - PUT edit individual Exercise
  - /exercises/:id/ratings - POST new rating
  - /exercises/:id/ratings/ - PUT edit rating
  - /exercises/:id/comments - POST new comment
  - /exercises/:id/comments/ - PUT edit comment
  - /exercises/:id/comments/:id - DELETE comment

**Workout Plans**

  - /workouts - POST new Workout
  - /workouts - GET all Workouts with Ratings, Comments, and Likeds
  - /workouts/:id/exercises - GET workout plan's Exercises
  - /workouts/:id - DELETE Workout plan
  - /workouts/:id - PUT edit workout plan
  - /workouts/:id/rating - POST new rating
  - /workouts/:id/rating/ - PUT edit rating
  - /workouts/:id/comments - POST new comment
  - /workouts/:id/comments/:id - PUT edit comment
  - /workouts/:id/comments/:id - DELETE comment

**User Settings**

  - /users/:id - GET user profile information
  - /users/:id - PUT edit user information
  - /users/:id - DELETE user

**Stretch Goal Endpoints**

  - /body-map - GET mappable body image for exercises
  - /recipes - GET all recipes
  - /recipes - POST new recipes
  - /recipes/:id - GET individual recipe
  - /recipes/:id - PUT edit recipe
  - /recipes/:id - DELETE individual recipe
