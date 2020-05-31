import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import {STORE_CONSTANT} from "./../../../Utility";
import {history} from "./../../../history";
import {loginActions} from "./Login.actions";
import {Common} from "./../../../Utility";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            showSpinner: false,
            showErrorMsg : 'Loading...'
        }
    }

    setValues(fieldName, event) {
        this.setState({
            [fieldName]: event.target.value
        })
    }

    validateLogin(event) {
        const {dispatch} = this.props;
        event.preventDefault();
        const userDetails = {
            "username": this.state.username,
            "password": this.state.password,
            "employee_name": 1+this.state.username
        }
        this.setState({
            showSpinner: true
        })
        dispatch(dispatch => {
            loginActions.validateLogin(userDetails)
            .then(data => {
                if(data && data.id) {
                    this.setState({
                        showSpinner: false,
                        showErrorMsg: ''
                    });
                    Common.setUserDetails(userDetails);
                    dispatch({
                        type: STORE_CONSTANT.LOGIN_SUCCESS,
                        userDetails: this.state.username
                    })
                } else {
                    this.setState({
                        showSpinner: false,
                        showErrorMsg: 'Something went wrong. Check your cors policy'
                    })
                }               
            })
        });
    }
    render() {
        return (
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={this.validateLogin.bind(this)} autoComplete="off" noValidate="noValidate">
                    <div className="form-group">
                        <input type="text" name="user" placeholder="Email" value={this.state.username} onChange={this.setValues.bind(this, 'username')} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.setValues.bind(this, 'password')} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {this.state.showSpinner && 
                <>
                <div class="spinner-border" role="status">                    
                </div>
                    <div>{this.state.showErrorMsg}</div>
                </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginDetails:  state.LoginReducer ? state.LoginReducer.userLogin : "test"
    }
}
const connectLoginComponent = connect(mapStateToProps, null)(Login);
export {connectLoginComponent as Login};
