import React, { useState, useEffect } from 'react';

const TimeTracker = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [tokensRemaining, setTokensRemaining] = useState(1440);
  const [progressPercentage, setProgressPercentage] = useState(100);
  const [weekMinutes, setWeekMinutes] = useState(0);

  useEffect(() => {
    const updateDisplay = () => {
      const now = new Date();
      const midnight = new Date(now).setHours(0, 0, 0, 0);
      const secondsPassed = (now - midnight) / 1000;
      const secondsInDay = 24 * 60 * 60;
      
      const percentageRemaining = (secondsInDay - secondsPassed) / secondsInDay;
      const tokens = Math.floor(1440 * percentageRemaining);
      
      // Calculate minutes left in the week
      const currentDay = now.getDay();
      const daysRemaining = (7 - currentDay) % 7;
      const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysRemaining, 23, 59, 59, 999).getTime();
      const millisecondsLeft = endOfWeek - now.getTime();
      const minutesLeftInWeek = Math.floor(millisecondsLeft / (1000 * 60));
      
      // Format time to 12-hour clock
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = `${hours}:${minutes} ${ampm}`;
      
      // Format date
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const strDate = `${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
      
      setCurrentTime(strTime);
      setCurrentDate(strDate);
      setTokensRemaining(tokens);
      setProgressPercentage(Math.round(percentageRemaining * 100));
      setWeekMinutes(minutesLeftInWeek);
    };

    updateDisplay();
    const interval = setInterval(updateDisplay, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: 'black',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>
        <div style={{
          color: '#60A5FA',
          fontSize: '2rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(59, 130, 246, 0.7)'
        }}>
          {currentTime}
        </div>
        <div style={{
          color: '#60A5FA',
          fontSize: '1.25rem',
          textShadow: '0 0 8px rgba(59, 130, 246, 0.7)'
        }}>
          {currentDate}
        </div>
      </div>
      
      <h1 style={{
        fontSize: '3rem',
        marginTop: '10px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        1440TIME™
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '80px'
      }}>
        <div style={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#EF4444'
        }}>
          {tokensRemaining}
        </div>
        
        <div style={{ width: '80%', maxWidth: '600px' }}>
          <div style={{
            width: '100%',
            height: '16px',
            backgroundColor: '#374151',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: '#10B981',
              width: `${100 - progressPercentage}%`,
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
        
        <div style={{
          fontSize: '3rem',
          color: '#10B981'
        }}>
          {progressPercentage}%
        </div>
        
        <div style={{
          fontSize: '3rem',
          color: '#EF4444',
          marginTop: '20px'
        }}>
          {weekMinutes}
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;