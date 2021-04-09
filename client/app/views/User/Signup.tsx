import * as React from 'react';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ButtonBasic, ErrorBoxBasic, TextInputBasic } from '../../components';
import { ISignupValues, UserCreateRequestViewModel, ModuleUser_UserController } from '../../modules/module.user';
import { BaseErrorResponseViewModel } from '../../core/view-models/base-error-response.vm';
import '../../../assets/styles';

export const Signup: React.FC = () => {
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
      .catch((error: AxiosError<BaseErrorResponseViewModel>) => {
        const errorText = error.response.data.errorDetails[0];

        setValues({ ...values, error: errorText });
      });
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <TextInputBasic pHolder={'Name'} label={'Name'} onChange={handleChange('name')} className={'signup-input'} />
      <TextInputBasic pHolder={'Email'} label={'Email'} onChange={handleChange('email')} className={'signup-input'} />
      <TextInputBasic
        pHolder={'Password'}
        label={'Password'}
        onChange={handleChange('password')}
        className={'signup-input'}
      />
      <ErrorBoxBasic isVisible={!!values.error} errorText={values.error as string} className="signup-error-box" />
      <ButtonBasic title={'SUBMIT'} onClick={clickSubmit} className={'signup-submit-button'} type={'submit'} />
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
