import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'

const Container = styled.div`
	width: 50vw;
	max-height: 350px;
	overflow: scroll;
	background: white;
	border-radius: 8px;
	padding: 2rem;
	position: absolute;
	top: 25%;
	left: 0;
	right: 0;
	margin: auto;
	@media (max-width: 900px) {
		width: 500px
	};
	@media (max-width: 550px) {
		width: 300px
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
`;

export default function PopupWrapper({children, text, icon}) {

	return (
		<Container>
			<Wrapper>
				{icon}
				<Typography sx={{marginLeft: '1rem'}} variant='overline'>{text}</Typography>
			</Wrapper>
			{children}
		</Container>
	);
}
