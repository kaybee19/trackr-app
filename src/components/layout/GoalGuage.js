import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import { useDb } from '../../context/DbContext';
import { exerciseTypes } from '../../defaults'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Bold = styled.span`
	font-weight: bold
`;

export default function Guage(props) {

	dayjs.extend(relativeTime);
	const { exercise } = useDb();
	const [complete, setComplete] = useState(0)

	const [state] = useState({
		series: [67.5],
		options: {
			chart: { height: 100, type: 'radialBar', offsetY: -15 },
			plotOptions: {
				radialBar: { startAngle: -120, endAngle: 120,
					dataLabels: {
						name: { fontSize: '12px', color: grey[600], offsetY: 85 },
						value: { offsetY: -15, fontSize: '32px', color: 'black', formatter: function (val) { return val + "%" } }
					}
				}
			},
			fill: {
			  colors: ['#05b7ac']
			},
			stroke: { dashArray: 4 },
			labels: [`You have achived 67.5% of your current goal`],
		}
	});

	useEffect(() => {
		let matchExercise = exercise.filter(f => f.exerciseId === props.data.type)
		let completed = 0;
		matchExercise.forEach(f => completed += f.time)
		setComplete(completed);
	})

	const exType = exerciseTypes.filter((f) => f.id === props.data.type);

	return (
		<div id="chart">
			<ReactApexChart options={state.options} series={state.series} type="radialBar" height={350} />
			<Wrapper>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Exercise</Bold>: {exType[0]['name']}
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Overall Target</Bold>: {props.data !== null && props.data.target} hours
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Completed</Bold>: {complete} minutes
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Time Left</Bold>: {props.data !== null && dayjs(props.data.createdAt).diff((dayjs(props.data.createdAt).subtract(props.data.duration, 'day')), 'day')} days left
				</Typography>
			</Wrapper>
		</div>
	)
};

