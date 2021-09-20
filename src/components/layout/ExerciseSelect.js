import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import PopupWrapper from './PopupWrapper';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { exerciseTypes, localDb } from '../../defaults';

const FormWrapper = styled(FormControl)`
	margin: 2rem auto 3rem!important;
`

export default function ExerciseSelect(props) {

	const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
    props.timer()
  };

  useEffect(() => {
  	const exercise = exerciseTypes.filter((fil) => fil.id === type);
  	// Set temp cache with exercise type
		type && localDb('set', 'exercise', ...exercise);
  }, [type])

	return (
		<PopupWrapper text='Select exercise' icon={<RunCircleIcon fontSize='large' />}>
			<Typography variant='body1'>Please select an exercise</Typography>
      <FormWrapper variant="standard" sx={{width: '300px'}}>
        <Select
          id="exercise-id"
          value={type}
          onChange={handleChange}
          label="Age"
        >
        { exerciseTypes.map((ex, key) => <MenuItem key={ex.id} value={ex.id}>{ex.name}</MenuItem> )}
        </Select>
      </FormWrapper>
		</PopupWrapper>
	);
}

