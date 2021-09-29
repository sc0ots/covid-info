import React, { Component } from "react";
import axios from "axios";
import "../../../css/form.css"
import { Redirect } from "react-router-dom"
import { withFormik, Form, Field } from "formik";
import { Select, Header } from 'semantic-ui-react'
import * as Yup from "yup";
import ValidationText from "../../main/ValidationText";



class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: "",
            status: "",
            isRedirect: false,
        }

    }
    handleChangeSelectGender = (e, data) => {
        this.setState({
            gender: data.value
        })
    }
    handleChangeSelectStatus = (e, data) => {
        this.setState({
            status: data.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { values} = this.props;
        const user = {
            name: values.name,
            citizen_id: values.citizen_id,
            gender: this.state.gender,
            yob: values.yob,
            address: values.address,
            phone: values.phone,
            status: this.state.status,
        }
        axios.post(`http://localhost:8080/covid/users/`, user)
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    this.setState({ isRedirect: true })
                }
            })
            .catch(error => {
                console.log(error)
            })

    }


    render() {

        if(this.state.isRedirect){
            return <Redirect to="/showuser"/>
        }
        return (
            <>
                <Header
                    as='h1'
                    content='CREATE USER'
                    subheader=''
                />
                <Form onSubmit={this.handleSubmit} style={{ width: "50%" }}>
                    <div className="input-group" error={!!this.props.errors.name}>
                        <div className="input-label">Name</div>
                        <Field
                            name="name"
                            render={({ field }) => (
                                <input type="text" className="input-text"   {...field} placeholder='Input name'></input>
                            )}
                        />
                        {this.props.touched.name && <ValidationText>{this.props.errors.name}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.citizen_id}>
                        <div className="input-label">Citizen ID</div>
                        <Field
                            name="citizen_id"
                            render={({ field }) => (
                                <input type="text" className="input-text"  {...field} placeholder='Input citizen id'></input>
                            )}
                        />
                        {this.props.touched.gender && <ValidationText>{this.props.errors.gender}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.gender}>
                        <div className="input-label">Gender</div>
                        <Select placeholder='Gender'
                            onChange={this.handleChangeSelectGender}
                            options={[{ value: 0, text: 'Female' },
                            { value: 1, text: 'Male' }]} />
                        {this.props.touched.gender && <ValidationText>{this.props.errors.gender}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.yob} >
                        <div className="input-label">Year of Birth</div>
                        <Field
                            name="yob"
                            render={({ field }) => (
                                <input type="text" className="input-text" {...field} placeholder='Input Year of birth'></input>
                            )}
                        />
                        {this.props.touched.yob && <ValidationText>{this.props.errors.yob}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.address} >
                        <div className="input-label">Address</div>
                        <Field
                            name="address"
                            render={({ field }) => (
                                <input type="text" className="input-text" {...field} placeholder='Input address'></input>
                            )}
                        />
                        {this.props.touched.address && <ValidationText>{this.props.errors.address}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.phone} >
                        <div className="input-label">Phone number</div>
                        <Field
                            name="phone"
                            render={({ field }) => (
                                <input type="text" className="input-text" {...field} placeholder='Input phone'></input>
                            )}
                        />
                        {this.props.touched.phone && <ValidationText>{this.props.errors.phone}</ValidationText>}
                    </div>
                    <div className="input-group">
                        <div className="input-label">Status</div>
                        <Select placeholder='Status'
                            onChange={this.handleChangeSelectStatus}
                            options={[{ value: 0, text: 'Normal' },
                            { value: 1, text: 'F1' },
                            { value: 2, text: 'F0' }]} required={true}/>
                    </div>
                    <button type='submit' disabled={false} className="btn-submit">Submit</button>
                </Form>
            </>
        )
    }
}
const FormikForm = withFormik({
    mapPropsToValues() {
        // Init form field
        return {
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
        };
    },

    validationSchema: Yup.object().shape({
        // Validate form field
        name: Yup.string()
            .required("Name is required")
            .min(5, "Name must have min 5 characters")
            .max(50, "Name have max 50 characters"),
        citizen_id: Yup.string()
            .required("Citizen id is required")
            .min(2, "Citizen id must have min 5 characters")
            .max(20, "Citizen id have max 20 characters"),
        gender: Yup.string()
            .required("Gender is required"),
        yob: Yup.string()
            .required("Yob is required")
            .min(5, "Yob must have min 5 characters")
            .max(20, "Yob have max 20 characters"),
        address: Yup.string()
            .required("Address is required")
            .min(5, "Address must have min 5 characters")
            .max(50, "Address have max 50 characters"),
        phone: Yup.string()
            .required("Phone is required")
            .min(5, "Phone must have min 5 characters")
            .max(20, "Phone have max 20 characters"),
        status: Yup.string()
            .required("Password is required"),

    })
})(CreateUser);
export default FormikForm;