
import React from 'react';
import { useCountdown } from '../../useCountdown';

// Material-UI
import Typography from '@mui/material/Typography';

const ExpiredNotice = () => {
  return (
    <Typography variant="caption" display="block" color="error">Expired</Typography>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Typography variant="caption" display="block" color="primary">{minutes}:{seconds}</Typography>
  );
};

const CountdownTimer = ({ targetDate, setExpriedFlg }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate, setExpriedFlg);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
  
export default CountdownTimer;
