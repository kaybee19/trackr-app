import React from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { useAuth } from '../Auth';

// Material
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import RunCircleIcon from '@mui/icons-material/RunCircle';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

// Comps
import CardWrapper from '../components/layout/CardWrapper';
import UserCard from '../components/layout/UserCard';
import Goals from '../components/layout/Goals';
import Graph from '../components/layout/Graph';
import Popup from '../components/layout/Popup';
import GoalSet from '../components/layout/GoalSet';

const ContainerWrapper = styled(Container)`
	margin: 3rem auto;
`;

const GridWrapper = styled(Grid)`
  @media (max-width: 1200px) {
    display: block!important;
  }
`;

const Items = (props) => {
	return (
		<Grid sx={{height: 'fit-content'}} item xs={12} md={12} lg={props.grid} onClick={props.click ? props.click : undefined}>
			<CardWrapper icon={props.icon} text={props.text} />
		</Grid>
	)
}

export default function Dash() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useAuth();
	let history = useHistory();

  const handlePush = () => {
    history.push("/fitness");
  }

  const handleLogin = () => {
    history.push("/login");
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

	return (
		<ContainerWrapper maxWidth='lg'>
			<Grid container>
				<GridWrapper container item xs={12} md={6} lg={8} spacing={2}>
					<Items text='exercise session' grid={6} click={handlePush} icon={<RunCircleIcon color='secondary' sx={{fontSize: '5rem'}} />} />
					<Grid sx={{height: 'fit-content'}} item xs={12} md={12} lg={6}>
	        	<Popup
	        	 	close={handleClose}
	        		wrapper={
	        			<Items text='set new targets' click={!user && handleLogin} grid={12} icon={<TrackChangesIcon color='primary' sx={{fontSize: '5rem'}} />} />
	        		}
	        		>
	        		<GoalSet />
						</Popup>
					</Grid>
					<Grid item xs={12} md={12}><Graph /></Grid>
				</GridWrapper>
				<Grid item xs={12} md={6} lg={4}>
					<UserCard user>
						<Goals />
					</UserCard>
				</Grid>
			</Grid>
		</ContainerWrapper>
	);
}
