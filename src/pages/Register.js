import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Auth";
import { firestore } from "../firebase";

// Material UI
import { makeStyles, createStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Comps
import { skippingImg, logo } from '../assets/images';

const useStyles = makeStyles((theme: Theme) => createStyles({
	...theme.authClass,
	...theme.spreadThis,
  bgImage: {
    height: '100vh',
    backgroundImage: `url(${skippingImg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: 'auto',
    [theme.breakpoints.down('md')]: {
      display: 'none',
      height: 'auto'
    }
  },
  stackClass: {
    minHeight: '100vh',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: '4rem'
    }
  },
  nameClass: {
  	display: 'flex',
  	width: '100%',
  	justifyContent: 'space-between'
  }
}));

export default function Register(props) {

  const classes = useStyles(props);

  const { user, signUp } = useAuth();
  const history = useHistory();

	const [firstName, setFirst] = useState('');
	const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [message] = useState();

  const handleSubmit = (e) => {
  	e.preventDefault();

    if (firstName === '' || lastName === '' || email === '' || password === '') {
      return setError("Fields cannot be empty");
    }

    signUp(email, password).then((d) => {
    	let userId = d.user.uid;
      firestore.doc(`/users/${userId}`).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userId: userId,
        createdOn: new Date().toISOString()
      });
	    setLoading(false);
			localStorage.removeItem("anonymous");
      history.push("/");
    })
    .catch(err => err);
  };

	return (
		<Grid container>
			<Grid item xs={12} md={8}>
				<Container maxWidth="xs">
					<Stack className={classes.stackClass}>
						<span className={classes.logoContainer}>
							<img src={logo} alt="app-logo" width="35" />
							<Typography variant="h4" className={classes.titleClass}>TRACKr</Typography>
						</span>
						<Box className={classes.boxClass}>
						</Box>
						<Box className={classes.boxClass}>
				      <form>
				      	<div className={classes.nameClass}>
					        <TextField
					        	style={{marginBottom: '1rem'}}
					          name="name"
					          variant="standard"
					          type="name"
					          label="First Name"
					          value={firstName}
					          onChange={e => setFirst(e.target.value)}
					        />
					        <TextField
					        	style={{marginBottom: '1rem'}}
					          name="name"
					          variant="standard"
					          type="name"
					          label="Last Name"
					          value={lastName}
					          onChange={e => setLast(e.target.value)}
					        />
				      	</div>
				        <TextField
				        	style={{marginBottom: '1rem'}}
				          name="email"
				          variant="standard"
				          fullWidth
				          type="email"
				          label="Email"
				          value={email}
				          onChange={e => setEmail(e.target.value)}
				        />
			          <TextField
			          	style={{marginBottom: '1rem'}}
			            name="password"
			            variant="standard"
			            fullWidth
			            type="password"
			            label="Password"
			            value={password}
			            onChange={e => setPassword(e.target.value)}
			          />
				        {message && <div className={classes.error}>{message}</div>}
				        {error && <div className={classes.error}>{error}</div>}
				        <Button
				        	className={classes.submitClass}
				          type="submit"
				          variant="contained"
				          onClick={handleSubmit}
				          loading={loading}
				        >Register Account</Button>
				      </form>
						</Box>
						<Box className={classes.boxClass}>
							<Typography variant="caption">Already have an account?</Typography>
							<Link to='/login' className={classes.linkClass}>Login</Link>
						</Box>
					</Stack>
				</Container>
			</Grid>
			<Grid item xs={12} md={4} className={classes.bgImage}>
			</Grid>
		</Grid>
	);
}
