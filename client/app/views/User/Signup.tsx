import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextInputBasic } from '../../components/TextInputBasic';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CardMedia,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { ISignupValues, UserCreateRequestViewModel, ModuleUser_UserController } from '../../modules/module.user';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

export const Signup: React.FC = () => {
  const classes = useStyles();
  const [values, setValues] = useState<ISignupValues>({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [name]: event.currentTarget.value });
  };

  const clickSubmit = () => {
    const user = new UserCreateRequestViewModel(values);

    ModuleUser_UserController.createUser(user)
      .then((data) => {
        setValues({ ...values, error: '', open: true });
      })
      .catch((error) => {
        setValues({ ...values, error });
      });
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <TextInputBasic pHolder={'Name'} label={'Name'} onChange={handleChange('name')} />
      <TextInputBasic pHolder={'Email'} label={'Name'} onChange={handleChange('name')} />
      <TextInputBasic pHolder={'Password'} label={'Name'} onChange={handleChange('name')} />
      <button />
    </div>
    // <div>
    //   <Card className={classes.card}>
    //     <CardContent>
    //       <Typography variant="h6" className={classes.title}>
    //         Sign Up
    //       </Typography>
    //       <TextField
    //         id="name"
    //         label="Name"
    //         className={classes.textField}
    //         value={values.name}
    //         onChange={handleChange('name')}
    //         margin="normal"
    //       />
    //       <br />
    //       <TextField
    //         id="email"
    //         type="email"
    //         label="Email"
    //         className={classes.textField}
    //         value={values.email}
    //         onChange={handleChange('email')}
    //         margin="normal"
    //       />
    //       <br />
    //       <TextField
    //         id="password"
    //         type="password"
    //         label="Password"
    //         className={classes.textField}
    //         value={values.password}
    //         onChange={handleChange('password')}
    //         margin="normal"
    //       />
    //       <br />{' '}
    //       {values.error && (
    //         <Typography component="p" color="error">
    //           <Icon color="error" className={classes.error}>
    //             error
    //           </Icon>
    //           {values.error}
    //         </Typography>
    //       )}
    //     </CardContent>
    //     <CardActions>
    //       <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>
    //         Submit
    //       </Button>
    //     </CardActions>
    //   </Card>
    //   <Dialog open={values.open} disableBackdropClick={true}>
    //     <DialogTitle>New Account</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>New account successfully created.</DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       <Link to="/signin">
    //         <Button color="primary" variant="contained">
    //           Sign In
    //         </Button>
    //       </Link>
    //     </DialogActions>
    //   </Dialog>
    // </div>
  );
};
