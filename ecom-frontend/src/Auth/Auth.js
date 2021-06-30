import React from 'react';
import * as actionTypes from '../store/actionTypes';
import AuthService from '../services/auth';
import { withState } from '../ecom-context';
import { withRouter } from 'react-router-dom';
import './Auth.css'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: 'abc@123.com',
            password: 'abc123',
            isSignUp: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    authModeChangeHandler = () => {
        this.setState({ isSignUp: !this.state.isSignUp });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ error: '' });
        const { email, password } = this.state;
        const data = { email: email, password: password }
        if (this.state.isSignUp) {

            AuthService.signup(data).then(res => {
                this.props.dispatch({ type: actionTypes.AUTH_SUCCESS, user: res })
                this.props.history.goBack();
            }).catch(err => {
                this.props.dispatch({ type: actionTypes.AUTH_FAIL, error: err.message })
            })
        } else {

            AuthService.login(data).then(res => {
                this.props.dispatch({ type: actionTypes.AUTH_SUCCESS, user: res })
                this.props.history.goBack();
            }).catch(err => {
                this.props.dispatch({ type: actionTypes.AUTH_FAIL, error: err.message })
            })
        }
    };

    render() {

        return (
            <div className="auth px-3">
                <form className="mb-2 bg-light text-dark" onSubmit={(ev) => this.handleSubmit(ev)}>
                    <p className="head">Fill in the form below to login to your account.</p>
                    <div className="m-3">
                        <input
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="m-3">
                        <input
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <div className="m-3">
                        {this.state.error ? <p >{this.state.error}</p> : null}
                        <button type="submit" className="btn btn-block btn-primary">
                            {this.state.isSignUp
                                ? "Sign Up"
                                : "Sign In"
                            }
                        </button>
                    </div>
                </form>
                <div className="m-3">
                    <button onClick={this.authModeChangeHandler} className="btn-block btn-outline-dark btn">
                        {!this.state.isSignUp
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"
                        }
                    </button>
                </div>
            </div>
        );
    }
};

export default withRouter(withState(Auth));