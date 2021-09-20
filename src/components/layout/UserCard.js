import React, { Fragment } from 'react';
import styled from 'styled-components'
import { useDb } from '../../context/DbContext';

// Material
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { grey } from '@mui/material/colors';

const Wrapper = styled(Paper)`
	margin: 0 1rem;
	padding: 2rem;
	display: flex;
	min-width: 250px;
	flex-direction: column;
	@media (max-width: 900px) {
		margin: 1rem 0 0
	}
`;

const UserWrapper = styled.div`
	line-height: 1rem;
	flex-direction: column;
	display: flex;
	width: 100%;
	align-items: center;
	margin-bottom: 2rem
`;

const DetailWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	line-height: 1rem;
	margin-bottom: 2rem
`;

export default function UserCard({user, children}) {

  const { info } = useDb();

  return (
    <div>
    	<Wrapper elevation={2}>
    	{
    		user &&
    		<Fragment>
	    		<UserWrapper>
	    			<AccountCircleIcon color='secondary' sx={{fontSize: '7.5rem'}} />
	    		</UserWrapper>
	    		<DetailWrapper>
	    			<Detail item='height' value={info !== null && info.height} prefix='cm' />
	    			<Detail item='weight' value={info !== null && info.weight} prefix='lbs' />
	    			<Detail item='age' value={info !== null && info.age} prefix='years'  />
	    		</DetailWrapper>
    		</Fragment>
    	}
  	  	{children}
    	</Wrapper>
    </div>
  )
}

const Detail = ({item, value, prefix}) => (
	<div>
		<Typography color={grey[600]} variant='overline'>{item}</Typography>
		<Typography sx={{textTransform: 'lowercase'}} variant='body2'>{value} {prefix}</Typography>
	</div>
);