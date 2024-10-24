# GrindRelax - Pomodoro Clock with Ambient Music and Motivational Quotes

## 🎯 Problem Solved

GrindRelax is designed to help users stay productive by solving the need to switch between multiple tabs for a timer, background music, and motivational content. Often, when using the Pomodoro technique, we need a timer, music for focus, and some inspiration to keep going. GrindRelax combines all these elements in one app, allowing you to stay focused, track your progress, and feel motivated without distractions.


## 🔧 Features

GrindRelax offers the following features to enhance your productivity:

- **Pomodoro Timer**: Automatically switches between 25 minutes of work and 5 minutes of break time.
- **Motivational Quotes**: New quotes every 5 minutes to keep you inspired.
- **Ambient Music**: Background music to create a focused environment. The user can toggle music on or off by clicking the "Enable Ambient Music" button. 
- **CSV Export**: Track and download your session's work and break times as a CSV file.
- **Interactive Buttons**: 
  - **Start/Pause**: Starts or pauses the Pomodoro timer.
  - **Reset**: Resets the timer back to 25 minutes.
  - **Finish Session**: Completes the session and provides session statistics.
  - **Enable/Disable Music**: Toggle background ambient music for focus during the session.
- **Modals & Alerts**: Receive pop-up alerts when it's time to start a break or get back to work.

## 🛠️ Technologies Used

- **React**: The app is built using the React framework to manage component-based UI and state.
- **JavaScript (ES6)**: Used to implement the logic for the timer, API fetching, and other interactive features.
- **CSS**: For styling the user interface and providing a clean, responsive design.
- **Fetch API**: To retrieve motivational quotes from an external API.
- **Blob API**: Used to generate and download CSV files for session tracking.

## 🌐 API

- **Forismatic API**: Provides the motivational quotes for the app. I encountered some issues with CORS, so I used a proxy to fetch the quotes successfully.
- **AllOrigins Proxy**: The proxy allows us to fetch data from Forismatic API without CORS issues.

## 💻 How to Run the Code

## 💻 How to Run the Code

### Step 1: Clone the Repository

```bash
git clone https://github.com/atk2045/GrindRelax.git
cd GrindRelax

### Step 2: Install Dependencies

Run the following command to install all the necessary packages:

```bash
npm install


Step 3: Start the Application
Run the app in development mode:

```bash
npm start

The application will open at http://localhost:3000.

That's it! The app is now up and running. 🎉


## 🧠 AI Assistance

Throughout this project, I utilized AI assistance, mainly chat GPT to improve my understanding of React and JavaScript since I am better in python programming. Specifically, I used AI to help me with:

- Setting up API integration with error handling and solving CORS issues.
- Optimizing the logic for state management in the Pomodoro timer.
- Providing guidance on transforming Python-like logic to JavaScript.
- Writing parts of the CSS for better UI design.

AI was especially helpful in explaining how to structure and optimize the code, allowing me to overcome challenges such as API errors and user design which I needed the help of AI in.

## 🚀 Future Enhancements

Here are some potential future improvements to **GrindRelax**:

- **Custom Timer Settings**: Allow users to customize the duration of work and break sessions.
- **Additional Music Options**: Provide a selection of ambient tracks to choose from.
- **Progress Visualization**: Add visual charts to show how much time was spent on study vs. breaks over multiple sessions.
- **User Authentication**: Enable saving user sessions to the cloud and logging into accounts for long-term tracking.





