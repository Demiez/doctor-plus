import * as React from 'react';
import { useState, useEffect } from 'react';
import { ModuleUser_UserController, UserViewModel } from '../../modules/module.user';
import { ListItemBasic } from '../../components/ListItemBasic';
import userIcon from '../../../assets/images/user_icon.png';

import '../../../assets/styles';

export const UsersPage: React.FC = () => {
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
    <div className="userspage">
      <h2>All Registered Doctors:</h2>
      {users.map((user) => (
        <ListItemBasic to="/" key={`userspage-list-item-${user.id}`}>
          <img src={userIcon} alt="User Icon" />
          <span>{user.name}</span>
        </ListItemBasic>
      ))}
    </div>
  );
};
