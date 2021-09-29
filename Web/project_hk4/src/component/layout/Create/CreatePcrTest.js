import React, { Component } from "react";
import axios from "axios";
import "../../../css/form.css"
import { Redirect } from "react-router-dom"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationText from "../../main/ValidationText";
import { Header, Select } from 'semantic-ui-react'
import { message } from "antd";


class CreatePcrTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result:  "",
        }

    }
    handleSubmit = (e) => {
        e.preventDefault()
        const pcr = {
            user_id: this.props.id,
            result: this.state.result,
        }
        axios.post(`http://localhost:8080/covid/pcrs/`, pcr)
            .then(response => {
                if (response.status == 200) {
                    message.success("Success")
                    this.props.parentCallback(false)
                } else {
                    message.error("Error")
                }
            })
            .catch(error => {
                console.log(error)
            })
        
    }
    handleChangeSelect = (e,data)=> {
        this.setState({
            result: data.value
        })
    }

    render() {
        return (
            <>
                <Header
                    as='h1'
                    content='+ PCR'
                    subheader=''
                />
                <Form onSubmit={this.handleSubmit} style={{display: "flex", flexDirection: "column" }}>
                    <Select placeholder='Result'
                        onChange={this.handleChangeSelect}
                        options={[
                        { value: "POSITIVE", text: 'POSITIVE' },
                        { value: "NEGATIVE", text: 'NEGATIVE' }]} required={true} />
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
            result: "",
            time: "",
        };
    },

    validationSchema: Yup.object().shape({
        // Validate form field
        result: Yup.string()
            .required("Name is required"),
        // time: Yup.string()
        //     .required("Address is required")
        //     .min(5, "Address must have min 5 characters")
        //     .max(50, "Address have max 50 characters"),
    })
})(CreatePcrTest);
export default FormikForm;
