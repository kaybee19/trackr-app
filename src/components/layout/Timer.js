import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles, createStyles } from '@mui/styles';
import PlayArrow from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { localDb } from '../../defaults';

const useStyles = makeStyles((theme: Theme) => createStyles({
	body: {
	  margin: '0 auto',
	  marginTop: '2.5rem',
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	timer: {
		display: 'flex',
		justifyContent: 'center',
	  fontSize: '3rem',
	  marginBottom: '1rem',
	  color: 'black',
	},
	buttonClass: {
		textAlign: 'center',
		borderRadius: '0',
		textTransform: 'capitalize',
		width: 'fit-content',
		margin: 'auto'
	}
}));


export default function Timer(props) {
  const classes = useStyles(props);
	const [time, setTime] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {

  	// Localdb check timer
    let checkTime = localDb('get', 'timer');
    checkTime && setTime(checkTime);

    // Localdb check active
    let checkActive = localDb('get', 'active');
  	checkActive && setIsActive(checkActive);

	},[])

	const handleClick = () => {
		setIsActive(!isActive);
	}

  useEffect(() => {
  	
  	let checkTime = localDb('get', 'timer');
  	checkTime && props.handleSession(true);

  	localDb('set', 'active', isActive);

    // Timer
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {

        const comTime = time + 1;
        setTime(comTime);

        localDb('set', 'timer', time+1);
      }, 1000)
    }

    return () => clearInterval(intervalId);
    
  }, [isActive, time])

  return (
  	<Container maxWidth='lg'>
			<div className={classes.body}>
				<div className={classes.timer}>
					<span>{new Date(time * 1000).toISOString().substr(11, 8)}</span>
				</div>
        <Button
        	startIcon={isActive ? <StopIcon sx={{marginBottom: '3px'}} color='primary' /> : <PlayArrow sx={{marginBottom: '3px'}} color='secondary' />}
        	className={classes.buttonClass}
        	variant="outlined"
        	color='primary'
        	onClick={handleClick}
      	>
        	<Typography variant='overline'>
	          {
	          	(time === '00' && time === '00' && !isActive) ? 'Start' : (
	          		isActive ? "Stop": "Continue"
	          	)
	          }
        	</Typography>
        </Button>
			</div>
  	</Container>
  )
}