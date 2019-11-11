# Live Chat Support System

This is a simple app built in react native for providing a live chat support system wherein a bot replies to the user an at any point of time a supervised human intervention can take over the bot by manipulating with a file named `bot.js`.

# Technology Stack used

The tech-stack used in this particular project are React-Native as it's base and all the database operations are managed using firebase

# Platforms supported

This project is capable of generating an iOS and Android app and has been tested for compatibility on both the platforms

# Usage

This app consists of 2 screens
  * Home screen
  * Chat screen
 The home screen has been created under `home.js` and the chat screen has been created under `chat.js`.
 
 There are 2 entities used in this particular project
  * Bot/System
  * User
 They have been declared and exported in independent files named after them
 
 The home screen consists of a blue-colored button-like object and once clicked on it, it redirects the user to the chat screen where the user can interact with the system, However, it is imperative to note that the system is minimally trained using basic RegEx to evaluate the text written by the user and there is scope for further training of the system, the system responds to the user at real time
 
 # Caveats
 
 There are certain focal points where the app needs improvement and they are being mentioned below so that developers all around can openly contribute to the project and release patches to make it efficient and even effective.
 
  * The app can have a better file structure
  * The training of the system has been done in a method (as a minimilist approach), it can be done in a class with certain parameters for effective and efficient evaluation and it can be done in an individual file and the objects can be very well exported
  * A component can be created for training the bot and RegEx patterns can be passed as a prop to the component, this may help other developers to import the component and use it with ease
  * A better home page design can very well be implemented.
  * Though this is a multiprocess system, the database isn't configured to keep a track of the users, it can as well be configured to do so, as of now it does keep a track of the messages along with necessary parameters
