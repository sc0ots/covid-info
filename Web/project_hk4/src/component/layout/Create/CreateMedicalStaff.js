import React, { Component } from "react";
import "../../../css/form.css"
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationText from "../../main/ValidationText";
import { Header } from 'semantic-ui-react'
import { message } from "antd";


class CreateMedicalStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // name: "",
            // dob: "",
            // medical_lícense: "",
            // username: "",
            // password: "",
            isRedirect: false,
            isConfirm: false,
            cantPost: "",
            medicalstaffs: []
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:8080/covid/medstf/show`)
            .then(res => {
                const medicalstaffs = res.data;
                this.setState({ medicalstaffs: medicalstaffs.map(medicalstaff => medicalstaff.username) });

            })
            .catch(error => console.log(error));
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { values } = this.props
        const medical = {
            name: values.name,
            dob: values.dob,
            medical_lícense: values.medical_lícense,
            username: values.username,
            password: values.password,
        }
        if (values.name == "" || values.dob == "" || values.medical_lícense == "" || values.username == "" || values.password == "") {
            this.setState({
                cantPost: "Vui lòng nhập dữ liệu"
            })
        } else {
            axios.post(`http://localhost:8080/covid/medstf/`, medical)
                .then(response => {
                    console.log(response)
                    if (response.status == 200 && response.data.id != null) {
                        message.success("Success")
                        this.props.parentCallback(false)
                    }else{
                        message.error("Error")
                    }
                    if (response.data.id == null) {
                        this.setState({
                            isConfirm: true
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        }
    }


    render() {
     
        return (
            <>  
                <Header
                        as='h1'
                        content='Create Medical Staff'
                        subheader=''
                    />
                <p>{this.state.cantPost}</p>
                <Form onSubmit={this.handleSubmit}>
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
                    <div className="input-group" error={!!this.props.errors.dob}>
                        <div className="input-label">Day of Birth</div>
                        <Field
                            name="dob"
                            render={({ field }) => (
                                <input type="date" className="input-text"  {...field} placeholder='Input your birthday'></input>
                            )}
                        />
                        {this.props.touched.dob && <ValidationText>{this.props.errors.dob}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.medical_lícense}>
                        <div className="input-label">Medical Lisence</div>
                        <Field
                            name="medical_lícense"
                            render={({ field }) => (
                                <input type="text" className="input-text" {...field} placeholder='Input medical lisence'></input>
                            )}
                        />
                        {this.props.touched.medical_lícense && <ValidationText>{this.props.errors.medical_lícense}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.username} >
                        <div className="input-label">User name</div>
                        <Field
                            name="username"
                            render={({ field }) => (
                                <input type="text" className="input-text" {...field} placeholder='Input username'></input>
                            )}
                        />
                        {this.state.isConfirm ? <ValidationText>Username already in used</ValidationText> : (this.props.touched.username && <ValidationText>{this.props.errors.username}</ValidationText>)}

                    </div>
                    <div className="input-group" error={!!this.props.errors.password} >
                        <div className="input-label">Password</div>
                        <Field
                            name="password"
                            render={({ field }) => (
                                <input type="password" className="input-text" {...field} placeholder='Input password'></input>
                            )}
                        />
                        {this.props.touched.password && <ValidationText>{this.props.errors.password}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.passwordconfirm} >
                        <div className="input-label">Password Confirm</div>
                        <Field
                            name="passwordconfirm"
                            render={({ field }) => (
                                <input type="password" className="input-text" {...field} placeholder='Input passwordconfirm'></input>
                            )}
                        />
                        {this.props.touched.passwordconfirm && <ValidationText>{this.props.errors.passwordconfirm}</ValidationText>}
                    </div>
                    <button type='submit' primary disabled={!this.props.isValid} className="btn-submit">Submit</button>
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
            dob: "",
            medical_lícense: "",
            username: "",
            password: "",
            passwordconfirm: "",
        };
    },

    validationSchema: Yup.object().shape({
        // Validate form field
        name: Yup.string()
            .required("Name is required")
            .min(5, "Name must have min 5 characters")
            .max(50, "Name have max 50 characters"),
        dob: Yup.date()
            .required("Dob is required"),
        medical_lícense: Yup.string()
            .required("Medical is required")
            .min(5, "Medical must have min 5 characters")
            .max(20, "Medical have max 20 characters"),
        username: Yup.string()
            .required("Username is required")
            .min(5, "Username must have min 5 characters")
            .max(20, "Username have max 20 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(5, "Password must have min 5 characters")
            .max(20, "Password have max 20 characters"),
        passwordconfirm: Yup.string()
            .required("Password is required")
            .oneOf([Yup.ref('password'),null], "Password must match")
    })
})(CreateMedicalStaff);

export default FormikForm;