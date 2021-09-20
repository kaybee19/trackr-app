import React, { Fragment, useState} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { localDb } from '../../defaults';

// Material
import { makeStyles, createStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { logo } from '../../assets/images';

const Nav = styled(Paper)`
	padding: .25rem 0;
  background:white;
  border-radius: 0!important;
  display: flex;
`;

const LogoWrapper = styled.div`
	margin: auto;
	position: relative;
	left: -24px;
`;

const LinkWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 2rem;
	& a {
		margin-top: 2rem;
	}
`;

export default function Navbar(props) {

  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(!anchor);
  };

  const list = (
    <Box
      sx={{ width: 250, padding: '3rem 2rem' }}
      role="presentation"
      onClick={toggleDrawer(!anchor)}
      onKeyDown={toggleDrawer(!anchor)}
    >
    	<img src={logo} alt="app-logo" width='50' />
    	<NavLinks {...props} />
    </Box>
  );

  return (
    <div>
      <Fragment key={anchor}>
	      <Nav elevation={2}>
	        <Button onClick={toggleDrawer()}><MenuIcon /></Button>
	        <LogoWrapper>
	        	<img src={logo} alt="app-logo" width='35' />
	        </LogoWrapper>
	        <Drawer
	          anchor='left'
	          open={anchor}
	          onClose={toggleDrawer()}
	        >
	          {list}
	        </Drawer>
	      </Nav>
      </Fragment>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	...theme.authClass,
	...theme.spreadThis,
}));

const NavLinks = (props) => {

	const { signOut } = props.auth();
	const classes = useStyles(props);
	const anonCheck = localStorage.getItem("anonymous");
	const text = anonCheck === null ? 'Sign Out' : 'Sign In';
	const link = anonCheck === null ? '' : '/login';

  const handleSignout = () => {
    !anonCheck && localDb('set', 'exercise', null);
    !anonCheck && localDb('remove', 'timer')
    signOut()
  };

	return (
		<LinkWrapper>
			<Link className={classes.linkClass} to='/'>Dashboard</Link>
			<Link className={classes.linkClass} to='/fitness'>Fitness</Link>
			{!anonCheck && <Link className={classes.linkClass} to='/profile'>Profile</Link>}
			<Link className={classes.linkClass} onClick={handleSignout} to={link}>{text}</Link>
		</LinkWrapper>
	)
};
