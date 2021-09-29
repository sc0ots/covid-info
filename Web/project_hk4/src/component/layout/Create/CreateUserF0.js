import React, { Component } from "react";
import axios from "axios";
import "../../../css/form.css"
import { Redirect } from "react-router-dom"
import { withFormik, Form, Field } from "formik";
import { Select, Header } from 'semantic-ui-react'
import * as Yup from "yup";
import ValidationText from "../../main/ValidationText";
import { message } from "antd";
import { Result } from 'antd';



class CreateUserF0 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            area_id: "",
            treatmentareas: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/covid/treatmentarea/show").then(res => {
            const treatmentareas = res.data
            this.setState({ treatmentareas })
        })
    }
    handleChangeSelectArea = (e, data) => {
        this.setState({
            area_id: data.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const treatment = {
            user_id: this.props.id,
            temp: this.props.values.temp,
            heart_rate: this.props.values.heart_rate,
            tlc: this.props.values.tlc,
            spo2: this.props.values.spo2,
            area_id: this.state.area_id
        }
        axios.post(`http://localhost:8080/covid/user_f0s/`, treatment)
            .then(response => {
                console.log(response)
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
        const { treatmentareas } = this.state
        return (
            <>
                <Header
                    as='h1'
                    content='CREATE USER F0'
                    subheader=''
                />
                <Form onSubmit={this.handleSubmit}>
                    <div className="input-group" error={!!this.props.errors.temp}>
                        <div className="input-label">Temp</div>
                        <Field
                            name="temp"
                            render={({ field }) => (
                                <input type="number" className="input-text"   {...field} placeholder='Input temp'></input>
                            )}
                        />
                        {this.props.touched.temp && <ValidationText>{this.props.errors.temp}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.heart_rate}>
                        <div className="input-label">Heart Rate</div>
                        <Field
                            name="heart_rate"
                            render={({ field }) => (
                                <input type="number" className="input-text"   {...field} placeholder='Input heart rate'></input>
                            )}
                        />
                        {this.props.touched.heart_rate && <ValidationText>{this.props.errors.heart_rate}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.tlc}>
                        <div className="input-label">Tlc</div>
                        <Field
                            name="tlc"
                            render={({ field }) => (
                                <input type="number" className="input-text"   {...field} placeholder='Input tlc'></input>
                            )}
                        />
                        {this.props.touched.tlc && <ValidationText>{this.props.errors.tlc}</ValidationText>}
                    </div>
                    <div className="input-group" error={!!this.props.errors.spo2}>
                        <div className="input-label">Spo2</div>
                        <Field
                            name="spo2"
                            render={({ field }) => (
                                <input type="number" className="input-text"   {...field} placeholder='Input spo2'></input>
                            )}
                        />
                        {this.props.touched.spo2 && <ValidationText>{this.props.errors.spo2}</ValidationText>}
                    </div>
                    <div className="input-group">
                        <div className="input-label">Treatment Area</div>
                        <Select placeholder='Status'
                            onChange={this.handleChangeSelectArea}
                            options={[
                                ...treatmentareas.map((treatmentarea, index) => {
                                    return (
                                        { text: treatmentarea.name, value: treatmentarea.id }
                                    )
                                })
                            ]} required={true} />
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
            temp: "",
            heart_rate: "",
            tlc: "",
            spo2: "",
        };
    },
    validationSchema: Yup.object().shape({
        // Validate form field
        temp: Yup.string()
            .required("Temp is required")
            .min(1, "Temp must have min 1 characters")
            .max(50, "Temp have max 50 characters"),
        heart_rate: Yup.string()
            .required("Heart rate id is required")
            .min(1, "Heart rate id must have min 1 characters")
            .max(20, "Heart rate id have max 20 characters"),
        tlc: Yup.string()
            .required("Tcl is required")
            .min(1, "Tcl must have min 1 characters")
            .max(20, "Tcl have max 20 characters"),
        spo2: Yup.string()
            .required("Spo2 is required")
            .min(1, "Spo2 must have min 1 characters")
            .max(50, "Spo2 have max 50 characters"),
    })
})(CreateUserF0);
export default FormikForm;