import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { localDb } from '../defaults';
import { useDb } from '../context/DbContext';
import { useAuth } from '../Auth';

// Material
import { makeStyles, createStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';

// Comps
import CardWrapper from '../components/layout/CardWrapper';
import UserCard from '../components/layout/UserCard';
import Popup from '../components/layout/Popup';
import Timer from '../components/layout/Timer';
import ExerciseSelect from '../components/layout/ExerciseSelect';

const ContainerWrapper = styled(Container)`
	margin: 3rem auto;
`;

const GridWrapper = styled(Grid)`
  @media (max-width: 1200px) {
    display: block!important;
  }
`;

const useStyles = makeStyles((theme: Theme) => createStyles({
	inactiveClass: {
		opacity: .5,
		pointerEvents: 'none'
	}
}));


const Items = (props) => {

  const classes = useStyles(props);

	return (
		<Grid
			sx={{height: 'fit-content'}}
			className={props.inactive && classes.inactiveClass}
			item
			xs={12} md={12} lg={props.grid}
			onClick={props.click}
		>
			<CardWrapper icon={props.icon} text={props.text} />
		</Grid>
	)
}

const text = (
	<Typography sx={{textAlign: 'center'}} variant='overline'>
		Select an exercise to start
	</Typography>
);

export default function Fitness() {

  const { setExercise } = useDb();
  const { user } = useAuth();
	const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [timer, setTimer] = useState(false);
  const [session, setSession] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showTimer = () => {
  	setTimer(true)
  };

  const handleSession = (s) => {
  	setSession(s)
  }

  const handleLogin = () => {
		history.push("/login")
  }

  React.useEffect(() => {
  	localDb('get', 'exercise') !== null && setTimer(true);
  }, [timer])

  // Save exercise
  const handleSave = () => {

  	let exercise = localDb('get', 'exercise');
  	let time = localDb('get', 'timer');
  	setExercise(exercise.id, time);
  }

	return (
		<ContainerWrapper maxWidth='lg'>
			<Grid container>
				<GridWrapper container item xs={12} md={6} lg={8} spacing={2}>
					<Grid item xs={12} md={12} lg={12}>
	        	<Popup
	        		inactive={session}
	        	 	close={handleClose}
	        		wrapper={
	        			<Items
	        				text='start new exercise'
	        				inactive={session}
	        				grid={12}
	        				icon={<PlayCircleIcon color='primary' sx={{fontSize: '5rem'}} />}
        				/>
	        		}
	        		>
	        		<ExerciseSelect timer={showTimer} />
						</Popup>
					</Grid>

    			{ !user ?
    				<Items
    					text='login to save exercise'
    					inactive={!session}
    					click={handleLogin}
    					grid={12}
    					icon={<FaceRetouchingOffIcon color='primary' sx={{fontSize: '5rem'}} />}
  					/>
    				:
    				<Items
    					text='save exercise'
    					inactive={!session}
    					click={handleSave}
    					grid={12}
    					icon={<CheckCircleIcon color='secondary' sx={{fontSize: '5rem'}} />}
  					/>
    				}
				</GridWrapper>
				<Grid item xs={12} md={6} lg={4}>
					<UserCard>
						{timer ? <Timer handleSession={handleSession} /> : text}
					</UserCard>
				</Grid>
			</Grid>
		</ContainerWrapper>
	);
}
