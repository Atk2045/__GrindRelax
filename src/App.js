// Import useState, useEffect, and useRef (React Hooks)
import React, { useState, useEffect, useRef } from 'react';
// App.css file imported to be able to apply the styles
import './App.css';  

// API URL for the motivational quotes
// used the proxy as instructed by the AI since the fetching process was not working then tested fetching with postman
const ALL_ORIGINS_PROXY = 'https://api.allorigins.win/get?url=';
const FORISMATIC_API = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

// function created to generate random integers to act like the key number in the API url
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

// wrote most of the constants with python code first then transformed it to js 
// with the help of AI I got all the errors solved and created all the constants in the component
// used arrow function for clearer (anonymous function)
// Main component for the Pomodoro Clock application
const App = () => {
  const [sec, setSec] = useState(10); // 25 minutes for study session
  const [inUsage, setInUsage] = useState(false); // Timer active when the user starts it
  const [isBreak, setIsBreak] = useState(false); // Break time when the session ends
  const [motivQuote, setMotivQuote] = useState(''); // motivational quote generated for the user
  const [subject, setSubject] = useState(''); // study subject added by the user
  const [totStudySession, setTotStudySession] = useState(0); // Tracks total study time
  const [totBreakTime, setTotBreakTime] = useState(0); // Tracks break time
  const [sessionDone, setSessionDone] = useState(false); // when the session is done by the user
  const [quoteDiff, setQuoteDiff] = useState(true); // quote visibility and fades
  const [quoteInterval, setQuoteInterval] = useState(300); // 5 minutes interval for quotes
  const [showModal, setShowModal] = useState(false);  // Modal visibility set to false not to appear in the beginning of the program
  const [userMessage, setUserMessage] = useState('');  // Message when timer is done and break or work time approached
  const [csvData, setCsvData] = useState([]); // CSV data stored in memory for user
  const [musicPlaying, setMusicPlaying] = useState(false); // Toggle state for music for user to show if he wants the music
  const audioRef = useRef(null); // Reference to the audio element used

  // Fetch quote using AllOrigins Proxy as instructed by the AI
  // code notation was searched and implemented the same way where we fetch the API using python and async function used as the video
  const fetchQuote = async () => {
    // error handling if the API did not fetch a motivational quote 
    try {
      // the key is needed for the API since each number corresponds to a different quote so we get random numbers
      const response = await fetch(ALL_ORIGINS_PROXY + encodeURIComponent(FORISMATIC_API + "&key=" + getRandomInt(9999)));
      // Parse the contents returned by the API in JSON
      const data = await response.json();
      const parsedData = JSON.parse(data.contents); 
      const quoteText = parsedData.quoteText;
      // if no author is mentioned then 'Unknown' is printed to user
      const quoteAuthor = parsedData.quoteAuthor || 'Unknown';
      return `${quoteText} - ${quoteAuthor}`;
    } catch (error) {
      // if error print this 
      console.error('Error fetching quote from Forismatic API:', error);
      //Fallback message if API fails
      setMotivQuote('Keep going! Stay motivated!'); 
    }
  };

  // useEffect is used here to display the first quote immediately when the timer starts so the user can view it
  useEffect(() => {
    // The effect relies on `inUsage` and `motivQuote` 
    if (inUsage && motivQuote === '') {
      // async function to get the first motivational quote from the API
      const fetchInitialQuote = async () => {
        const initialQuote = await fetchQuote();
        setMotivQuote(initialQuote);
      };
      fetchInitialQuote();
    }
    // runs whenever there's a change in the constants
  }, [inUsage, motivQuote]);

  // UseEffect used again to create the timer

  useEffect(() => {
    let interval = null;
    // if the seconds are postive countdown by negative 1 second
    if (inUsage && sec > 0) {
      interval = setInterval(() => {
        // logic for countdown as stated above
        setSec((prevSec) => prevSec - 1);
      }, 1000);

      // if condition used only to Play music only during the study session by the user
      // not during break or paused
      if (!isBreak && musicPlaying && audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
        // error messege diplayed if error
          console.error('Audio play failed:', error);
        });
      }
    // checks if break is over since the countdown reaches 0 and restarts the session
    } else if (sec === 0) {
      if (isBreak) {
        // prints this message to user so he can focus again
        openModal('Break over! Time to grind.');
        // add the 300 secs which are 5 mins break time to total and then reset 25 mins
        setTotBreakTime((prev) => prev + 300); 
        setSec(1500); 
        // break then changed to false and back to work initated
        setIsBreak(false);
        // however if no break and timer countdown reaches 0 then break is now and prints break
      } else {
        openModal('Work session over! BREAK TIME!!!');
        // same process and logic add 25 minutes to total study time and set 5 minute break time
        setTotStudySession((prev) => prev + 1500); 
        setSec(300); 
        // turn isbreak to true and break mode initaied
        setIsBreak(true);
      }
      // if condition to stop music during break and reset music to start after break
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; 
      }
    }
// clean up function to be called as advised by the LLM for better functionality
    return () => clearInterval(interval);
    // rerun when any of those states change
  }, [inUsage, sec, isBreak, musicPlaying]);

  // useEffect is used here with to fetch a new code every 5 minutes to make the user motivated
  useEffect(() => {
    // if condition to make sure timer is used now not paused or in a break
    if (inUsage) {  
      // async function used as per the video
      const quoteTimer = setInterval(async () => {
        // the process of hiding the quote for animation and transition
        setQuoteDiff(false); 
        setTimeout(async () => {
          // same fetching a new quote from Forismatic API like the one above
          const newQuote = await fetchQuote(); 
          setMotivQuote(newQuote);
          // fade-in animation here by setQuoteDiff to true not false
          setQuoteDiff(true); 
          // update this part every 5 mins and then clean up function called as previous by the LLM
        }, 1000);
      }, quoteInterval * 1000);  
      return () => clearInterval(quoteTimer); 
    }
    // Updates quote every quoteInterval(5 mins) and  stops when inusage state is false paused or break 
  }, [inUsage, quoteInterval]);

  // AI assitance was used to create open and close modals which are the messages diplayed to the user
  // openModal sets a message and displays the modal to user to indicate the state
  const openModal = (message) => {
    setUserMessage(message);
    setShowModal(true);
  };

  // close modal hides the modal when user presses on button 
  const closeModal = () => {
    setShowModal(false);
  };

  // toggleTimer was first created using python since notation was not the best and then transformed to js 
  // function is used to turn on or off the music

  const toggleTimer = () => {
    setInUsage(!inUsage);
    // if the session is paused stop the music 
    if (inUsage && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  // creating the function to resert the timer to 25 mins and stop the timer and change the state 
  // will comment on the most necessary
  const resetTimer = () => {
    setSec(1500); 
    // not in break and not in usage reset states IsBreak and IsUsage
    setInUsage(false);
    setIsBreak(false); 
    //reset study and break time totals 
    setTotStudySession(0); 
    setTotBreakTime(0); 
    setMotivQuote(''); 
    setSessionDone(false);
    // ensures that if its paused or not in usage music stops and music resets
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; 
    }
  };

  // function created to finish the session and save data upon the user click
  const finishSession = () => {
    // Inusage sets to false so stop the timer and lebel session as complete with True for session done
    setInUsage(false); 
    setSessionDone(true); 
    // call to save the session CSV and stop the music because the inusage is false
    saveSessionToCSV(); 
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause(); 
    }
  };

  // function for the music to enable or disable upon the user preference
  const toggleMusic = () => {
    // if condition the music is not playing, start the music
    setMusicPlaying(!musicPlaying); 
    // error handeling method is the audio does not work 
    // error handeling was first created in python then changed to js with the help of an AI because it was causing an error
    if (!musicPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Audio play failed:', error);
      });
    } else {
      // Pause the music when pause button is pressed and reset the music from the beginning features 
      audioRef.current.pause();
      audioRef.current.currentTime = 0; 
    }
  };

  // function created to be able to save and export the session to the CSV file
  const saveSessionToCSV = () => {
    const newSession = {
      // these parameters are created in the excutable csv file 
      subject: subject,
      //conversions from seconds to minutes takes place
      totalStudyTime: Math.floor(totStudySession / 60) + ' minutes',
      totalBreakTime: Math.floor(totBreakTime / 60) + ' minutes'
    };
// Add the new session to the array of CSV data using spread operator as instructed by the AI and update the data after 
    const newCSVData = [...csvData, newSession];
    setCsvData(newCSVData);
  };

  // function to generate CSV file 
  const generateCSVContent = () => {
    // header of the csv file
    const header = 'Subject, Total Study Time, Total Break Time\n';
    // rows generated for each study session, formatted as 'subject, study time, break time' then combined after
    // used AI in this part to help overcome the syntax error i got before
    const rows = csvData.map((session) => `${session.subject}, ${session.totalStudyTime}, ${session.totalBreakTime}`).join('\n');
    return header + rows;
  };

  // function used to download the CSV file
  const downloadCSV = () => {
    const csvContent = generateCSVContent();
    // Blob is created containing the CSV data, specifying its type as 'text/csv' which i wanted to excute
    // I knew the logic but helped with LLM to write it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pomodoro_sessions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format time display (MM:SS)
  const formatTime = () => {
    //
    const minutes = Math.floor(sec / 60);
    const remainderSeconds = sec % 60;
    return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Pomodoro Clock</h1>
      
      {!sessionDone && (
        <>
          <div>
            <label htmlFor="subject">Study Subject: </label>
            <input 
              id="subject" 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="What are you studying today?"
            />
          </div>

          <div className="timer">
            <h2>{isBreak ? 'Break Time' : 'Work Time'}</h2>
            <p>{formatTime()}</p>
          </div>
          <button onClick={toggleTimer}>{inUsage ? 'Pause' : 'Start'}</button>
          <button onClick={resetTimer}>Reset</button>
          <button onClick={finishSession}>Finish Session</button>

          {/* Toggle Music Button */}
          <button onClick={toggleMusic}>{musicPlaying ? 'Disable Music' : 'Enable Ambient Music'}</button>

          {motivQuote && (
            <div className={`quote-container ${quoteDiff ? 'fade-in' : 'fade-out'}`}>
              <p>{motivQuote}</p>
            </div>
          )}

          {showModal && (
            <>
              <div className="modal-overlay" onClick={closeModal}></div>
              <div className="modal">
                <h3>{userMessage}</h3>
                <button onClick={closeModal}>Close</button>
              </div>
            </>
          )}
        </>
      )}

      {sessionDone && (
        <div className="summary">
          <h2>Session Complete</h2>
          <p>Subject: {subject}</p>
          <p>Total Study Time: {Math.floor(totStudySession / 60)} minutes</p>
          <p>Total Break Time: {Math.floor(totBreakTime / 60)} minutes</p>

        <div className="session-buttons">
          <button onClick={downloadCSV}>Download CSV</button>
          <button onClick={resetTimer}>Start New Session</button> {/* Re-added the Start New Session button */}
        </div>
      </div>
      )}

      {/* Audio element for ambient music */}
      <audio ref={audioRef} loop>
        <source src="/ambient_music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default App;
