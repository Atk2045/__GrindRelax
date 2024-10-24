# GrindRelax - Pomodoro Clock with Ambient Music and Motivational Quotes

## 📄 Program Description 

GrindRelax is a productivity tool that combines the Pomodoro technique with ambient music and motivational quotes to help users stay focused and motivated. It offers a distraction-free experience by integrating features like a timer, background music, and inspiring quotes—all in one app. The app also enables users to track their progress through session stats and downloadable CSV reports.

This project is motivated by the need to enhance productivity by minimizing distractions from switching between multiple tabs for different tools like timers, music players, and motivational content. By combining these essential elements into a single interface, GrindRelax helps users stay in the flow, focus on their tasks, and track their productivity effectively.

## 🎯 Problem Solved

The Pomodoro technique is a popular productivity method, but implementing it efficiently often requires using several tools simultaneously—one for the timer, another for background music, and sometimes a third for motivational content. Constantly switching between these tools not only interrupts your workflow but also increases cognitive load, and it can consume system resources. Having multiple tabs or apps running can slow down your computer and, in some cases, even cause crashes or lag, especially on devices with limited performance capabilities.

**GrindRelax** addresses these issues by combining everything you need into a single, seamless application. Instead of juggling different apps or tabs for a timer, music, and motivation, GrindRelax provides all of these features in one place. This integration reduces the overhead on your system, minimizing the risk of performance issues or crashes, and allows you to focus entirely on your tasks. By simplifying the experience, it helps users maintain their flow, track their productivity, and stay motivated without the distractions or technical hiccups caused by running multiple applications at once.


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

### API Integration

**Quote Fetching:** 
**1.Set up the API and Proxy** The app uses the AllOrigins proxy to fetch data from the API without running into CORS issues.


1. **Set up the API and Proxy:** The app uses the AllOrigins proxy to fetch data from the API without running into CORS issues.
   ```bash
   const ALL_ORIGINS_PROXY = 'https://api.allorigins.win/get?url=';
   const FORISMATIC_API = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';



2. **Fetch the Quote: The app fetches quotes using the fetch() function, with the AllOrigins proxy wrapping around the API**
      ```bash
      npm install
      const fetchQuote = async () => {
        try {
          const response = await fetch(ALL_ORIGINS_PROXY + encodeURIComponent(FORISMATIC_API));
          const data = await response.json();
          const parsedData = JSON.parse(data.contents);
          const quoteText = parsedData.quoteText;
          const quoteAuthor = parsedData.quoteAuthor || 'Unknown';
          return `${quoteText} - ${quoteAuthor}`;
        } catch (error) {
          console.error('Error fetching quote:', error);
          return 'Stay motivated!';
        }
      };

3. **Display the Quote: Once the quote fetched, its stored in the app’s state and displayed to the user.updated every 5 minutes**

   Run the app in development mode:

      ```bash
      useEffect(() => {
        if (inUsage) {
          const updateQuote = async () => {
            const newQuote = await fetchQuote();
            setMotivQuote(newQuote);
          };
          updateQuote();
        }
      }, [inUsage]);


### Error Handling

If the API fails to fetch a quote (due to network issues or API downtime), the app will display a fallback message: "Stay motivated!" This ensures that the user always has an inspiring message.

## 💻 How to Run the Code

1. **Clone the repository**
   ```bash
   git clone https://github.com/atk2045/__GrindRelax.git
   cd __GrindRelax

2. **Install Dependencies**

   Run the following command to install all the necessary packages:

      ```bash
      npm install

      
3. **Start the Application**

   Run the app in development mode:

      ```bash
      npm start

The application will open at (http://localhost:3000).

That's it! The app is now up and running. 🎉

## 🧠 AI Assistance

Throughout this project, I utilized AI assistance, mainly ChatGPT, to improve my understanding of React and JavaScript since I am better in Python programming. Specifically, I used AI to help me with:

- Setting up API integration with error handling and solving CORS issues.
- Optimizing the logic for state management in the Pomodoro timer.
- Providing guidance on transforming Python-like logic to JavaScript.
- Writing parts of the CSS for better UI design.

AI was especially helpful in explaining how to structure and optimize the code, allowing me to overcome challenges such as API errors and user design.

## 🚀 Future Enhancements

Here are some potential future improvements to **GrindRelax**:

- **Custom Timer Settings**: Allow users to customize the duration of work and break sessions.
- **Additional Music Options**: Provide a selection of ambient tracks to choose from.
- **Progress Visualization**: Add visual charts to show how much time was spent on study vs. breaks over multiple sessions.
- **User Authentication**: Enable saving user sessions to the cloud and logging into accounts for long-term tracking.
