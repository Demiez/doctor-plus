import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextInputBasic } from '../../components/TextInputBasic';
import { ISignupValues, UserCreateRequestViewModel, ModuleUser_UserController } from '../../modules/module.user';
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
      .catch((error) => {
        setValues({ ...values, error });
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
      <button />
    </div>
  );
};
