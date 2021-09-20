import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import styled from 'styled-components'
import PopupWrapper from './PopupWrapper';
import { exerciseTypes } from '../../defaults';
import { useDb } from '../../context/DbContext';

const DivWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const TimeWrapper = styled.div`
`;

const Errors = styled.span`
	color: red;
	font-size: 10px;
`;

export default function GoalSet(props) {

	const { setGoal } = useDb();
	const [hours, setHour] = useState('');
	const [minutes, setMinute] = useState('');
	const [type, setType] = useState('');
	const [days, setDay] = useState('');
	const [months, setMonth] = useState('');
	const [years, setYear] = useState('');
	const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleClick = () => {

    if ((hours+minutes === '') || type === '' || (months+years+days === '')) {
      return setError(true);
    }
    else {    	
	  	setGoal({
	  		duration: (years*365)+(months*30)+days,
	  		target: (hours*60)+minutes,
	  		type: type
	  	})
	    setOpen(true);
			setError(false)
			setType('');
			setDay('');
			setMonth('');
			setYear('');
			setHour('');
			setMinute('');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

	return (
		<PopupWrapper text='Set New Goals' icon={<TrackChangesIcon fontSize='large' />}>
			<DivWrapper>
	      <FormControl variant="standard" sx={{marginBottom: '.75rem', width: '450px'}}>
	        <Select
	          id="exercise-id"
	          value={type}
	          onChange={handleChange}
	          label="Age"
	        >
	        { exerciseTypes.map((ex, key) => <MenuItem key={ex.id} value={ex.id}>{ex.name}</MenuItem> )}
	        </Select>
	      </FormControl>
		    <Typography sx={{marginTop: '.75rem'}} variant="overline">Time (per day)</Typography>
		    <TimeWrapper>
					<TextField
			    	style={{marginBottom: '.75rem'}}
			      name="hours"
			      variant="standard"
			      sx={{maxWidth: '100px', marginRight: '.75rem'}}
			      type="number"
			      label="hours"
			      value={hours}
			      onChange={e => setHour(e.target.value)}
			    />
					<TextField
			    	style={{marginBottom: '.75rem'}}
			      name="minutes"
			      variant="standard"
			      sx={{maxWidth: '100px', marginRight: '.75rem'}}
			      type="number"
			      label="minutes"
			      value={minutes}
			      onChange={e => setMinute(e.target.value)}
			    />
		    </TimeWrapper>
		    <Typography sx={{marginTop: '.75rem'}} variant="overline">Duration</Typography>
		    <TimeWrapper>
					<TextField
			    	style={{marginBottom: '.75rem'}}
			      name="years"
			      variant="standard"
			      sx={{maxWidth: '100px', marginRight: '.75rem'}}
			      type="number"
			      label="Year"
			      value={years}
			      onChange={e => setYear(e.target.value)}
			    />
					<TextField
			    	style={{marginBottom: '.75rem'}}
			      name="months"
			      variant="standard"
			      sx={{maxWidth: '100px', marginRight: '.75rem'}}
			      type="number"
			      label="Months"
			      value={months}
			      onChange={e => setMonth(e.target.value)}
			    />
					<TextField
			    	style={{marginBottom: '.75rem'}}
			      name="day"
			      variant="standard"
			      sx={{maxWidth: '100px', marginRight: '.75rem'}}
			      type="number"
			      label="Days"
			      value={days}
			      onChange={e => setDay(e.target.value)}
			    />
		    </TimeWrapper>
				{error && <Errors>Fields cannot be empty!</Errors>}
			</DivWrapper>
			<Button variant='contained' sx={{margin: '.75rem 0'}} onClick={handleClick}>Set Goals</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          New goals added!
        </Alert>
      </Snackbar>
		</PopupWrapper>
	);
}
