import React, { Component } from "react";
import axios from "axios";
import "../../../css/form.css"
import { NavLink, Redirect } from "react-router-dom"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationText from "../../main/ValidationText";
import { Header, Image, Table } from 'semantic-ui-react'
import YesImg from "../../../img/yes.svg"
import NoImg from "../../../img/no.svg"
import { message } from 'antd';


class FormDeleteUserF0 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            listuserf0s: [],
            isRedirect: false
        }

    }
    componentDidMount() {
        axios.get("http://localhost:8080/covid/user_f0s/show").then(res => {
            const listuserf0s = res.data
            this.setState({
                listuserf0s
            })
        })
    }
    handleDelete = (e) => {
        if ((35 <= this.props.values.temp && this.props.values.temp <= 37) && ((60 <= this.props.values.heart_rate && this.props.values.heart_rate <= 120)) && (6000 <= this.props.values.tlc && this.props.values.tlc <= 8000) && (90 <= this.props.values.spo2 && this.props.values.spo2 <= 100)) {
            this.setState({ listuserf0s: this.state.listuserf0s.filter(listuserf0 => listuserf0.id !== this.props.id) });
            axios.delete(`http://localhost:8080/covid/user_f0s/` + this.props.id)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("Success")
                        this.props.parentCallback(false)
                    } else {
                        message.error("Error")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            message.error("Not eligible for hospital discharge")
        }
    }

    render() {
        if (this.state.isRedirect) {
            return <Redirect to="/showuser" />
        }
        let imgTemp;
        if (35 <= this.props.values.temp && this.props.values.temp <= 37) {
            imgTemp = YesImg
        } else {
            imgTemp = NoImg
        }
        let imgHeart;
        if (60 <= this.props.values.heart_rate && this.props.values.heart_rate <= 120) {
            imgHeart = YesImg
        } else {
            imgHeart = NoImg
        }
        let imgTlc;
        if (6000 <= this.props.values.tlc && this.props.values.tlc <= 8000) {
            imgTlc = YesImg
        } else {
            imgTlc = NoImg
        }
        let imgSpo2;
        if (90 <= this.props.values.spo2 && this.props.values.spo2 <= 100) {
            imgSpo2 = YesImg
        } else {
            imgSpo2 = NoImg
        }
        console.log(this.props.values.temp)

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Form >
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
                    <button disabled={false} primary className="btn-submit" onClick={this.handleDelete}>Xuất viện</button>
                </Form>
                <div style={{ marginLeft: "80px", marginTop: "30px" }}>
                    <h2>Conditions for discharge from hospital</h2>
                    <Table basic='very' celled collapsing size="large">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Health</Table.HeaderCell>
                                <Table.HeaderCell>Condition</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={imgTemp} rounded size='mini' />
                                        <Header.Content>
                                            Temp
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>35-37C</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={imgHeart} rounded size='mini' />
                                        <Header.Content>
                                            Heart Rate
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>60-120 BPM</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={imgTlc} rounded size='mini' />
                                        <Header.Content>
                                            Tlc
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>6000-8000ml</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={imgSpo2} rounded size='mini' />
                                        <Header.Content>
                                            Spo2
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>90-100%</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>

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
            .required("Temp is required"),
        heart_rate: Yup.string()
            .required("Heart rate is required"),
        tlc: Yup.string()
            .required("Tlc is required"),
        spo2: Yup.string()
            .required("Spo2 is required")

    })
})(FormDeleteUserF0);
export default FormikForm;