import axios from 'axios';
import React, { Component } from 'react';
import { Redirect, useHistory } from 'react-router';
import { message } from 'antd';

import "../../../css/login.css"


class LoginForm extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            response: "",
            role: "",
            flag:0,
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username
        const password = this.state.password
        axios.get(`http://localhost:8080/covid/admins/login?username=${username}&password=${password}`).then(res => {
            if(res.data.response == 1){
                localStorage.setItem("user", JSON.stringify({
                    username: username,
                    password: password,
                    role: res.data.role,
                }))
                this.setState({
                    response: res.data.response
                })
                this.setState({
                    role: res.data.role
                })
            }else{
                message.error("Invalid username or password")
            }
            console.log(res.data.response)
         
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillUnmount(){
       window.location.reload();
    }

    render() {
        console.log(this.state.response, this.state.role)
        const isLoggedParse = JSON.parse(localStorage.getItem("user"))
        const isLogged = localStorage.getItem("user")
        if(isLogged !== null){
            return <Redirect to="/showmedicalstaff"/>
        }
        return (
            <div className="login-wrapper">
                <form onSubmit={this.onSubmit} className="login-block">
                    <div className="login-form">
                        <h2 className="login-heading">Login</h2>
                        <div className="login-form-group">
                            <div className="login-label">User Name</div>
                            <input className="login-input" name="username" value={this.state.username} onChange={this.handleChange}></input>
                        </div>
                        <div className="login-form-group">
                            <div className="login-label">Password</div>
                            <input type="password" className="login-input" name="password" value={this.state.password} onChange={this.handleChange}></input>
                        </div>
                        <button className="login-btn">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;