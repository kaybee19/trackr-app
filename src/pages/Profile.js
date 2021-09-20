import React from 'react';
import styled from 'styled-components'

// Material
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// Comps
import UserCard from '../components/layout/UserCard';
import User from '../components/layout/User';;

const ContainerWrapper = styled(Container)`
	margin: 3rem auto;
`;

export default function Profile() {

	return (
		<ContainerWrapper maxWidth='lg'>
			<Grid container justifyContent='center'>
				<Grid item xs={12} md={4}>
					<UserCard user>
						<User />
					</UserCard>
				</Grid>
			</Grid>
		</ContainerWrapper>
	);
}
