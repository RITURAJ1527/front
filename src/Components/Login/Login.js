import React, { Component } from 'react';

import AppLoader from '../loader/loader';
import LoginService from '../../service/login-service';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.state = {
            email: '',
            password: '',
            logged: null,
            hidden: true,
            password: '',
            name: '',
            loading: false
        };
    }

    signUp = () => {
        document.getElementById('cont').classList.add("right-panel-active");
    };

    signIn = () => {
        document.getElementById('cont').classList.remove("right-panel-active");
    };

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    login(e) {
        e.preventDefault();
        //localStorage.setItem('email', user.email);
        let updatedState = { ...this.state };
        updatedState.loading = true;
        this.setState(updatedState);
        const userCred = {
            _id: this.state.email,
            password: this.state.password
        }
        LoginService.signIn(userCred).then((response) => {
            updatedState.loading = false;
            this.setState(updatedState);
            if (!response.data.isAuthenitcated) {
                alert(response.data.data);
            } else {
                localStorage.setItem('email', this.state.email);
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
                this.props.history.push('/home');
            }
        }).catch((error) => {
            updatedState.loading = true;
            this.setState(updatedState);
            alert("It seems like you are entering wrong email&/password or may be you are new to us.")
        });
    }

    signup(e) {
        e.preventDefault();
        const users = {
            _id: this.state.email,
            password: this.state.password,
            name: this.state.name
        }
        LoginService.signUp(users).then((u) => {
        }).then((u) => {
            console.log(u);
            window.alert("Successfully Created account.")
        }
        )
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        if (this.props.password) {
            this.setState({ password: this.props.password });
        }
    }


    render() {

        return (
            <div className="row">
                <div className="col-lg-3 col-md-3 col-12"></div>
                <div className="cont col-lg-6 col-md-6 col-12" id="cont" style={{ marginTop: "7em" }}>
                    <div className="form-cont sign-up-cont">
                        <form>
                            <h1>Create Account</h1>
                            <span>
                                <h5>use your email for registration</h5>
                            </span>
                            <div className="form-group">
                                <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-control"
                                    id="name" aria-describedby="name" placeholder="Enter your full name" />
                            </div>
                            <div className="form-group">
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <input value={this.state.password} onChange={this.handlePasswordChange} type={this.state.hidden ?
                                    "password" : "text"} name="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Password" />
                                <span onClick={this.toggleShow} onMouseEnter={this.toggleShow} onMouseLeave={this.toggleShow} style={{ cursor: "pointer" }}><i
                                    className="fas fa-eye" /></span>
                            </div>
                            <button onClick={this.signup} className="btn btn-success">Signup</button>
                        </form>
                    </div>
                    <div className="form-cont sign-in-cont">
                        <form>
                            <h1>Sign in</h1>
                            <div className="form-group">
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control"
                                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                            </div>
                            <div className="form-group">
                                <input value={this.state.password} onChange={this.handlePasswordChange} type={this.state.hidden ?
                                    "password" : "text"} name="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Password" />
                                <span onClick={this.toggleShow} onMouseEnter={this.toggleShow} onMouseLeave={this.toggleShow} style={{ cursor: "pointer" }}><i
                                    className="fas fa-eye" /></span>
                            </div>
                            <a href="#">Forgot your password?</a>
                            <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                        </form>
                    </div>
                    <div className="overlay-cont">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h6>Already a member?</h6>
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with your personal info
                    </p>
                                <button className="ghost" id="signIn" onClick={this.signIn}> Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" onClick={this.signUp}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-12"></div>
                { this.state.loading && <AppLoader message="Validating your credentials, please wait..." /> }
            </div>
        );
    }
}

export default Login;