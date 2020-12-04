import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './stylesheets/NavBar.css';

function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="navBar">
            <div className="navBar__menuLink">
                {/* Exercises */ }
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick }>
                    Exercises
            </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={ anchorEl }
                    keepMounted
                    open={ Boolean(anchorEl) }
                    onClose={ handleClose }
                >
                    <MenuItem onClick={ handleClose }>Profile</MenuItem>
                    <MenuItem onClick={ handleClose }>My account</MenuItem>
                    <MenuItem onClick={ handleClose }>Logout</MenuItem>
                </Menu>

                {/* Workouts */ }
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick }>
                    Workouts
            </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={ anchorEl }
                    keepMounted
                    open={ Boolean(anchorEl) }
                    onClose={ handleClose }
                >
                    <MenuItem onClick={ handleClose }>Profile</MenuItem>
                    <MenuItem onClick={ handleClose }>My account</MenuItem>
                    <MenuItem onClick={ handleClose }>Logout</MenuItem>
                </Menu>

                {/* UserInfo */ }
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick }>
                    Settings
            </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={ anchorEl }
                    keepMounted
                    open={ Boolean(anchorEl) }
                    onClose={ handleClose }
                >
                    <MenuItem onClick={ handleClose }>Profile</MenuItem>
                    <MenuItem onClick={ handleClose }>My account</MenuItem>
                    <MenuItem onClick={ handleClose }>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    );
    // return (
    //     <div>
    //         Nav Bar

    //         {/* Exercises Popover */ }

    //         {/* Workouts Popover */ }
    //     </div>
    // );
}

export default NavBar;
