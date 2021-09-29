import React, { Component } from "react";
import axios from "axios";
import "../../../css/form.css"
import { Redirect } from "react-router-dom"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationText from "../../main/ValidationText";
import { Header } from 'semantic-ui-react'
import { message } from "antd";


class CreateQuarantine extends Component {
    constructor(props) {
        super(props);
        this.state = {

            fieldType: ""
        }

    }
    handleSubmit = (e) => {
        e.preventDefault()
        const quarantine = {
            name: this.props.values.name,
            address: this.props.values.address
        }
        axios.post(`http://localhost:8080/covid/quarantinearea/`, quarantine)
            .then(response => {
                if (response.status == 200) {
                    message.success("Success")
                    this.props.parentCallback(false)
                }else{
                    message.error("Error")
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
   
        return (
            <>
                <Header
                    as='h1'
                    content='CREATE QUARANTINE AREA'
                    subheader=''
                />
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
                    <div className="input-group" error={!!this.props.errors.address}>
                        <div className="input-label">Address</div>
                        <Field
                            name="address"
                            render={({ field }) => (
                                <input type="text" className="input-text"   {...field} placeholder='Input name'></input>
                            )}
                        />
                        {this.props.touched.address && <ValidationText>{this.props.errors.address}</ValidationText>}
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
            address: "",
        };
    },

    validationSchema: Yup.object().shape({
        // Validate form field
        name: Yup.string()
            .required("Name is required")
            .min(5, "Name must have min 5 characters")
            .max(50, "Name have max 50 characters"),
        address: Yup.string()
            .required("Address is required")
            .min(5, "Address must have min 5 characters")
            .max(50, "Address have max 50 characters"),
    })
})(CreateQuarantine);
export default FormikForm;