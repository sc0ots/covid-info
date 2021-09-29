import React, { Component } from "react";
import { Button, Form, Input } from 'semantic-ui-react'
import axios from "axios";
import { Redirect } from "react-router-dom"
import { message } from 'antd';

class UpdateMedicalStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            dob: "",
            medical_lícense: "",
            username: "",
            password: "",
            medicalstaffs: [],
            isRedirect: false,
        }

    }
    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
        axios.get("http://localhost:8080/covid/medstf/" + id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                dob: res.data.dob,
                medical_lícense: res.data.medical_lícense,
                username: res.data.username,
                password: res.data.password,
            })
        })
        axios.get("http://localhost:8080/covid/medstf/show").then(res => {
            const medicalstaffs = res.data
            this.setState({ medicalstaffs })
        })

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmitForm = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        axios.put(`http://localhost:8080/covid/medstf/${id}`, this.state)
            .then(response => {
                if (response.status == 200) {
                    this.setState({ isRedirect: true })

                }
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })


    }

    render() {
        const { match } = this.props;
        const { name, dob, medical_lícense, username, password } = this.state;
        if (this.state.isRedirect) {
            message.success("Success")
            return <Redirect to="/showmedicalstaff" />
        }
        return (
            <Form onSubmit={this.handleSubmitForm}>
                <Form.Field>
                    <label>User ID</label>
                    <input type="text" onChange={this.handleChange} name="id" value={match.params.id} placeholder='Input your name' />
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input type="text" onChange={this.handleChange} name="name" value={name} placeholder='Input your name' />
                </Form.Field>
                <Form.Field>
                    <label>Day of Birth</label>
                    <input type="date" onChange={this.handleChange} name="dob" value={dob} placeholder='Input your birthday' />
                </Form.Field>
                <Form.Field>
                    <label>Medical Lisence</label>
                    <input type="text" onChange={this.handleChange} name="medical_lícense" value={medical_lícense} placeholder='Input your medical lisence' />
                </Form.Field>
                <Form.Field>
                    <label>User name</label>
                    <input type="text" onChange={this.handleChange} name="username" value={username} placeholder='Input your username' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="text" onChange={this.handleChange} name="password" value={password} placeholder='Input your password' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}
export default UpdateMedicalStaff;