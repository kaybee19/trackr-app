import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDb } from '../../context/DbContext';

export default function User() {

  const { updateProfile, updateInfo } = useDb();
	const [height, setHeight] = useState();
	const [weight, setWeight] = useState();
	const [age, setAge] = useState();

	const handleUpdate = () => {
		updateProfile(height, weight, age);
		updateInfo(height, weight, age);
	}

	return (
		<div>
			<TextField
	    	style={{marginBottom: '1rem'}}
	      name="height"
	      variant="standard"
	      type="number"
	      fullWidth
	      label="Height (cm)"
	      value={height}
	      onChange={e => setHeight(e.target.value)}
	    />
			<TextField
	    	style={{marginBottom: '1rem'}}
	      name="weight"
	      variant="standard"
	      type="number"
	      fullWidth
	      label="Weight (lbs)"
	      value={weight}
	      onChange={e => setWeight(e.target.value)}
	    />
			<TextField
	    	style={{marginBottom: '1rem'}}
	      name="age"
	      variant="standard"
	      type="number"
	      fullWidth
	      label="Age"
	      value={age}
	      onChange={e => setAge(e.target.value)}
	    />
	    <Button sx={{margin: '1rem', fontSize: '.75rem'}} onClick={handleUpdate} variant='contained'>Update Profile</Button>
		</div>
	);
}
