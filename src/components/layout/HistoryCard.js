import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import RunCircleIcon from '@mui/icons-material/RunCircle';
import { exerciseTypes } from '../../defaults'
import { useDb } from '../../context/DbContext';

const PaperWrapper = styled(Paper)`
	margin: 1rem 0;
	padding: 1rem;
	display: flex;
	align-items: center;
	&:hover {
		cursor: pointer;
	}
`;
const PaperSpan = styled.span`
	margin-left: 1rem;
	display: flex;
	justify-content: space-around;
	width: 100%;
	@media (max-width: 600px) {
		flex-direction: column;
	}
`;

export default function HistoryCard(props) {

	const { updateGoal } = useDb();
	const fil = exerciseTypes.filter(f => props.data.type === f.id);
	const handleUpdate = () => {
		updateGoal(props.index)
	}

	return (
		<div>
			<PaperWrapper onClick={handleUpdate} elevation={3}>
				<RunCircleIcon />
				<PaperSpan>
					<Typography variant='overline'>
						Exercise: <span style={{fontWeight: 'bold'}}>{fil[0].name}</span>
					</Typography>
					<Typography variant='overline'>
						Time: <span style={{fontWeight: 'bold'}}>{props.data.duration}</span> days
					</Typography>
					<Typography variant='overline'>
						Target: <span style={{fontWeight: 'bold'}}>{props.data.target}</span> minutes
					</Typography>
				</PaperSpan>
			</PaperWrapper>
		</div>
	);
}