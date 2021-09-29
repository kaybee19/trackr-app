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

	const [state, setState] = useState({
		series: [0],
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
			labels: ['Percentage of Goal Achieved'],
		}
	});

	useEffect(() => {
		let matchExercise = props.data !== null && exercise.filter(f => (f.exerciseId === props.data.type) && (f.createdAt > props.data.createdAt));
		let completed = 0;
		matchExercise.forEach(f => completed += f.time)
		setComplete(completed);
		let tempState = state.options;
		setState({
			series: [Math.round(completed*10/(props.data.target))],
			options: {...tempState}
		})
	}, [exercise, props.data.target, props.data.type])

	const exType = exerciseTypes.filter((f) => f.id === props.data.type);

	const dateFunc = (p) => {
		let date1 = dayjs(props.data.createdAt).format('MM/DD/YYYY');

		const newDate1 = new Date(JSON.stringify(date1));
		const thisDate = new Date();

		const diffTime = Math.abs(thisDate - newDate1);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		let result = props.data.duration - diffDays + 1;

		if (result > 0) {
			return `${result} day(s) left`
		} else
		{
			return 'Completed'
		}
	}


	return (
		<div id="chart">
			<ReactApexChart options={state.options} series={state.series} type="radialBar" height={350} />
			<Wrapper>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Exercise</Bold>: {exType[0]['name']}
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Daily Target</Bold>: {props.data !== null && props.data.target} minutes
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Duration</Bold>: {props.data !== null && props.data.duration} days
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Overall Target</Bold>: {props.data !== null && Math.round((props.data.target*props.data.target/60)*10)/10} hours
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Completed</Bold>: {complete} minutes
				</Typography>
				<Typography sx={{fontSize: '.85rem'}} variant='caption'>
					<Bold>Time Left</Bold>: {props.data !== null && dateFunc(props.data.createdAt)}
				</Typography>
			</Wrapper>
		</div>
	)
};

