import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu/";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddIcon from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout.js";
import HomeIcon from "@mui/icons-material/Home";
import { signOut } from "../../../services/auth.js";
import { useUser } from "../../../context/UserContext.js";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function Nav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user, setUser } = useUser();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const theme = useTheme();

    const navigate = useNavigate();

    if (!user) return;

    const handleClose = (e) => {
        e.target.id === "home" && navigate("/home");
        e.target.id === "add-recipe" && navigate("/recipe-editor");
        // e.target.id === "my-recipes" && navigate("/my-recipes");
        // e.target.id === "find-recipes" && navigate("/find-recipes");
        // e.target.id === "my-calendar" && navigate("/my-calendar");
        e.target.id === "settings" && navigate("/settings");

        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        signOut();
        setUser(null);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Typography
                    sx={{
                        minWidth: 100,
                        color: theme.palette.primary.contrastText,
                    }}
                >{`Welcome Back ${user.email}`}</Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {user.email[0]}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: theme.palette.background.paper,
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                        "& *": {
                            color: theme.palette.primary.contrastText,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem title="Profile" onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem title="My Account" onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem id="home" title="Home" onClick={handleClose}>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    Home
                </MenuItem>
                <MenuItem
                    id="add-recipe"
                    title="Add A Recipe"
                    onClick={handleClose}
                >
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    Add A Recipe
                </MenuItem>
                <MenuItem title="Menu Plan" onClick={handleClose}>
                    <ListItemIcon>
                        <MenuBookIcon fontSize="small" />
                    </ListItemIcon>
                    Recipe Book
                </MenuItem>
                <MenuItem title="Explore" onClick={handleClose}>
                    <ListItemIcon>
                        <RestaurantMenuIcon fontSize="small" />
                    </ListItemIcon>
                    Explore
                </MenuItem>
                <MenuItem title="Menu Plan" onClick={handleClose}>
                    <ListItemIcon>
                        <CalendarMonthIcon fontSize="small" />
                    </ListItemIcon>
                    Menu Plan
                </MenuItem>
                <MenuItem id="settings" title="Settings" onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem
                    name="logout"
                    id="logout"
                    title="Logout"
                    onClick={handleLogout}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
