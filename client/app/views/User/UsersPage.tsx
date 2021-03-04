import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  // Card,
  // CardContent,
  // CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { ArrowForward, Person } from '@material-ui/icons';
import { ModuleUser_UserController, UserViewModel } from '../../modules/module.user';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

export const UsersPage: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<Array<UserViewModel>>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    ModuleUser_UserController.getUsers(signal).then((data) => {
      setUsers(data);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Doctors
      </Typography>
      <List dense={true}>
        {users.map((user, i) => {
          return (
            <Link to={'/user/' + user.id} key={i}>
              <ListItem button={true}>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};
