# Bodybuilding Project
Bodybuilding project is an app focused primarily on helping people get in shape in a sustainable and healthy way.  Our focus is not to sell you supplements, but to sell you the benefits of hard work, proper nutrition, and consistency.


## Features

 - Authorization and Authentication
 - Create, Read, Update, and Delete of exercises for individual body parts
 - Create, Read, Update, and Delete of workout guides composed of the individual exercises
 - Create, Read, Update, and Delete 0-5 star reviews of exercises, along with the ability to add comments

### Stretch Goals

  - Exercises and Workouts Likeable/Favoritable
  - Mappable body which takes you to individual body part exercises
  - Create, Read, Update, and Delete health recipes

## Technologies Used

 - **React-Redux frontend** (Create React App)
	 - **Material-UI** for icons
	 - **React-Stars** to implement and utilize a rating system for exercises
	 - **React-Bootstrap** to implement a navigation bar
	 - **React-Player** for embedding YouTube videos
	 - **React-Redux** for utilizing the Global Redux Store with React Hooks
 - **Express backend API**
	 - **JWT** for authentication
	 - **Sequelize** for database manipulation and migration
	 - **Bcryptjs** for hashing passwords before storing in the database
	 - **CORS** to incorporate Cross Origin Resource Sharing between frontend/backend
	 - **Morgan** for logging and debugging
	 - **Express Validator** for handling validation errors
	 - **Express Bearer Token** for securing server communication
	 - **Moment** for formatted dates and times
