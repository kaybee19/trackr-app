import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'inherit!important',
      color: `${theme.palette.primary.main}!important`,
    },
  }),
);

export default function AuthButton({link, text, icon, full}) {

  const classes = useStyles();

	return (
		<Link to={`/${link}`} style={{ textDecoration: 'none' }}>
			<Button className={classes.root} variant="contained" style={full && {width: '100%'}}>
				<span style={ icon && {margin: '.5rem 0.5rem auto 0'}}>
					{icon}
				</span>
				<Typography style={{ textTransform: 'capitalize' }} variant='body2'>{text}</Typography>
			</Button>
		</Link>
	);
}
