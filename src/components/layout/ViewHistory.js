import React from 'react';
import PopupWrapper from './PopupWrapper';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import HistoryCard from './HistoryCard';
import { useDb } from '../../context/DbContext';

export default function ViewHistory() {

	const { goals } = useDb();

	return (
		<PopupWrapper text='View Goals History' icon={<TrackChangesIcon fontSize='large' />}>
			<div>
				{
					goals !== null && goals !== undefined && goals.map((d, i) =>  <HistoryCard data={d} index={i} key={i} /> )
				}
			</div>
		</PopupWrapper>
	);
}
