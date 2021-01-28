import * as React from 'react';
import { Link } from 'react-router-dom';

interface State {
  readonly username: string;
  readonly password: string;
  readonly submitted: boolean;
}

export class MainPage extends React.Component<{}> {
  readonly state: State = {
    username: '',
    password: '',
    submitted: false,
  };

  constructor(props: {}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      console.log(username);
      console.log(password);
    }
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
