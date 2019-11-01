import React, { useState, useEffect } from "react";
// import axios from 'axios';

// import {withRouter} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  // InputBase,
  Menu,
  MenuItem,
  // Fab,
} from "@material-ui/core";
import {
  Dashboard as MenuIcon,
  // MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  // Search as SearchIcon,
  // Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
// import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  // toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut, updateNotificationReadStatus} from "../../context/UserContext";

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  // var notificationData = getNotifications();
  

  // local
  // var [mailMenu, setMailMenu] = useState(null);
  // var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  // var [isSearchOpen, setSearchOpen] = useState(false);

  var [notifications, setNotifications] = useState([]);//[];
  // useEffect(function() {
  //   setNotifications = getNotifications();
  //   console.log(notifications);
  // });


  useEffect(async() => {
    var urlpath = process.env.NODE_ENV == "development" ? process.env.REACT_APP_URL_PATH : "";
      fetch(`${urlpath}/api/notifications/${localStorage.getItem("userid")}`)
    .then(response => response.json())
    .then(response => setNotifications(response))

  }, []);

  // console.log(notifications);
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          // onClick={() => toggleSidebar(layoutDispatch)}
          href="#/app/dashboard"
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          FoodShare
        </Typography>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        
        
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          
            
          {notifications.map(notification => (
            <MenuItem
              key={notification.notificationid}
              onClick={() => {
                setNotificationsMenu(null);
                
                updateNotificationReadStatus(notification.notificationid);

              }}
              className={classes.headerMenuItem}
              href ={notifications.destination}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {/* John Smith */}
              {localStorage.getItem("fullname")}
            </Typography>
            <Typography variant="h6" weight="medium" color="primary">
              {/* John Smith */}
              {localStorage.getItem("usergroup")}
            </Typography>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
