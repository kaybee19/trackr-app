import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Auth";

// Material UI
import { makeStyles, createStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';

// Comps
import LinkButton from '../components/layout/LinkButton'
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
}));

export default function Login(props) {

  const classes = useStyles(props);

  const { signIn } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [message] = useState();

  const handleAnonymous = () => {
  	localStorage.setItem("anonymous", true);
  }

  const handleSubmit = async (e) => {
  	e.preventDefault();

    if (email === '' || password === '') {
      return setError("Fields cannot be empty");
    }

    try {
      setLoading(true);
      await signIn(email, password);
      localStorage.removeItem("anonymous");
      history.push("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
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
							<span onClick={handleAnonymous}>
								<LinkButton link='' color='primary' full text='Continue Without Signing In' icon={<FaceRetouchingOffIcon />} />
							</span>
						</Box>
						<Box className={classes.boxClass}>
				      <form>
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
				        >Sign In</Button>
				      </form>
						</Box>
						<Box className={classes.boxClass}>
							<Typography variant="caption">Dont have an account yet?</Typography>
							<Link to='/register' className={classes.linkClass}>Register</Link>
						</Box>
					</Stack>
				</Container>
			</Grid>
			<Grid item xs={12} md={4} className={classes.bgImage}>
			</Grid>
		</Grid>
	);
}
