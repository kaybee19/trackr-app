import React from 'react';
import styled from 'styled-components'
import { grey } from '@mui/material/colors';
import { useDb } from '../../context/DbContext';

// Material UI
import Typography from '@mui/material/Typography';

// Comps
import GoalGuage from './GoalGuage';
import ViewGoals from '../ViewGoals';

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default function Goals() {

	const { currentGoal } = useDb();

	return (
		<div>
			<Wrapper>
				<Typography variant='h6' color={grey[700]} sx={{fontWeight:'600'}}>Fitness Goals</Typography>
				<ViewGoals />
			</Wrapper>
			{ currentGoal ? <GoalGuage data={currentGoal} /> : <Typography variant='overline'>Select goal to view status</Typography> }
		</div>
	);
}
