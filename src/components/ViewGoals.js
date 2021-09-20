import React, { useState } from 'react';
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Comps
import Popup from './layout/Popup';
import ViewHistory from './layout/ViewHistory';

const ButtonWrapper = styled(IconButton)`
	float: right;
`;

const Text = styled(Typography)`
  padding: .5rem 1rem;
  &:hover {
    background: rgba(0,0,0,.05);
    transition: .5s;
    cursor: pointer;
  }
`;

export default function ViewGoals() {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

	return (
		<div>
      <ButtonWrapper
        onClick={handleClick}
      >
        <MoreVertIcon />
      </ButtonWrapper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div>
        	<Popup close={handleClose} wrapper={<Text>View History</Text>}>
        		<ViewHistory />
      		</Popup>
        </div>
      </Popover>
		</div>
	);
}
