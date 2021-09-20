import React from 'react';
import styled from 'styled-components'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const PaperWrapper = styled(Paper)`
  background:white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 10%), 0px 3px 4px 0px rgb(0 0 0 / 7%), 0px 1px 8px 0px rgb(0 0 0 / 6%)!important;
  &:hover {
  	cursor: pointer;
  	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)!important;
  }
`

export default function CardWrapper(props) {

	return (
		<PaperWrapper elevation={3}>
			{props.icon}
			<Typography variant='overline' sx={{fontSize: '.85rem'}}>{props.text}</Typography>
		</PaperWrapper>
	);
}
