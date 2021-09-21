import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Typography from '@mui/material/Typography';
import ReactApexChart from "react-apexcharts";
import styled from 'styled-components'
import { useDb } from '../../context/DbContext';
import { useAuth } from '../../Auth';
import { exerciseTypes } from '../../defaults';

const GraphWrapper = styled.div`
	margin-top: .5rem;
	background-color: white;
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 10%), 0px 3px 4px 0px rgb(0 0 0 / 7%), 0px 1px 8px 0px rgb(0 0 0 / 6%)!important;
`;

export default function Graph() {

	dayjs.extend(relativeTime);
  const [value, setValue] = useState(null);
  const [types, setTypes] = useState();
  const { exercise } = useDb();
  const { user } = useAuth();

	useEffect(() => {
		let getTypes = [];
		exerciseTypes.forEach((f) => {
			getTypes.push(f.name)
		})
		setTypes(getTypes)
	}, [])

	const [state, setState] = useState({
		series:[ 
			{ name: 'Time', data: [] },
		],
    options: {
    	chart: { type: 'bar', height: 350 },
      plotOptions: {
      	bar: { horizontal: false, columnWidth: '15%', endingShape: 'rounded' },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: { categories: ['Jogging','Swimming','Running','Skipping','Cycling'], },
      yaxis: {
      	title: { text: 'time (minutes)' }
      },
      fill: { opacity: 1 },
      tooltip: {
        y: { formatter: function (val) { return + val + " minutes" }
      }
    }}
	})


	useEffect(() => {

		const filterDate = (exercise !== undefined) && (exercise !== null) && (value !== null) && exercise.filter((fil) => {
			return dayjs(fil.['createdAt']).format('DD/MM/YYYY') === dayjs(JSON.stringify(value).split('"')[1]).format('DD/MM/YYYY')
		});

		// Get exercise types
		let getTypes = [];
		exerciseTypes.forEach((f) => {
			getTypes.push({id: f.id, time: 0})
		});

		
		(exercise !== undefined) && (exercise !== null) && (value !== null) && filterDate.forEach(d => {
			getTypes.[d.exerciseId-1]['time'] +=d.time
		})

		// set new state data
		let stateItem = [state.options];
		let stateData = []
		getTypes.forEach((f) => {
			stateData.push(f.time)
		})

		setState({series:[{ name: 'Time', data: stateData },], option:{ ...stateItem}})
	}, [exercise, value])

	return (
		<GraphWrapper>
	    <LocalizationProvider dateAdapter={AdapterDateFns}>
	      <DatePicker
	        label="Select Date"
	        value={value}
	        onChange={(newValue) => {
	          setValue(newValue);
	        }}
	        renderInput={(params) => <TextField {...params} />}
	      />
	    </LocalizationProvider>
	    {
	    	!user ? <div style={{marginTop: '1rem'}}><Typography variant='overline'>Please log in to view exercise chart</Typography></div> :
	    	<ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
	    }
		</GraphWrapper>
	);
}