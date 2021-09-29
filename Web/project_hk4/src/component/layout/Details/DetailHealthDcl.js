import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Descriptions, Button } from 'antd';
import axios from "axios";
import { Header } from 'semantic-ui-react'
import "../../../css/qrcode.css"
var QRCode = require('qrcode.react');

class DetailHealthDcl extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
            is_travel: "",
            is_fever: "",
            is_cough: "",
            is_nobreath: "",
            is_pnue: "",
            is_throat: "",
            is_tire: "",
            is_contact_f0: "",
            is_contact_suspect: "",
            have_chronic: "",
            have_heart_pressure: "",
            have_hiv_immu: "",
            have_transplant: "",
            have_diabetes: "",
            have_cancer: "",
            have_prenant: "",
            time: ""

        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/health_dcls/" + id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.user.name,
                citizen_id: res.data.user.citizen_id,
                gender: res.data.user.gender,
                yob: res.data.user.yob,
                address: res.data.user.address,
                phone: res.data.user.phone,
                status: res.data.user.status,
                is_travel: res.data.is_travel,
                is_fever: res.data.is_fever,
                is_cough: res.data.is_cough,
                is_nobreath: res.data.is_nobreath,
                is_pnue: res.data.is_pnue,
                is_throat: res.data.is_throat,
                is_tire: res.data.is_tire,
                is_contact_f0: res.data.is_contact_f0,
                is_contact_suspect: res.data.is_contact_suspect,
                have_chronic: res.data.have_chronic,
                have_heart_pressure: res.data.have_heart_pressure,
                have_hiv_immu: res.data.have_hiv_immu,
                have_transplant: res.data.have_transplant,
                have_diabetes: res.data.have_diabetes,
                have_cancer: res.data.have_cancer,
                have_prenant: res.data.have_prenant,
                time: res.data.time
            })
        }
        )
    }
    render() {
        let status = "";
        if (this.state.status == 0) {
            status = "Normal"
        } else if (this.state.status == 1) {
            status = "F1"
        } else {
            status = "F0"
        }
        const data = {
            name: this.state.name,
            citizen_id: this.state.citizen_id,
            gender: this.state.gender,
            yob: this.state.yob,
            address: this.state.address,
            phone: this.state.phone,
            status: this.state.status,
            is_travel: this.state.is_travel,
            is_fever: this.state.is_fever,
            is_cough: this.state.is_cough,
            is_nobreath: this.state.is_nobreath,
            is_pnue: this.state.is_pnue,
            is_throat: this.state.is_throat,
            is_tire: this.state.is_tire,
            is_contact_f0: this.state.is_contact_f0,
            is_contact_suspect: this.state.is_contact_suspect,
            have_chronic: this.state.have_chronic,
            have_heart_pressure: this.state.have_heart_pressure,
            have_hiv_immu: this.state.have_hiv_immu,
            have_transplant: this.state.have_transplant,
            have_diabetes: this.state.have_diabetes,
            have_cancer: this.state.have_cancer,
            have_prenant: this.state.have_prenant,
            time: this.state.time
        }
        return (
            <>
                <Header
                    as='h1'
                    content='DETAIL HEALTH DECLARATION'
                    subheader=''
                />
                <Button type="primary" style={{ margin: "10px 0" }}>
                    <NavLink to="/showhealthdcl">
                        Back to list
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/reporthealthdcl/${this.state.id}`}>
                        Report
                    </NavLink>
                </Button>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ width: "50%" }}>
                        <Descriptions title="" labelStyle={{ fontWeight: "bold", width: "20%", fontSize: "20" }} layout="" size="small" bordered>
                            <Descriptions.Item extra label="ID" span={2} >
                                {this.state.id}
                            </Descriptions.Item>
                            <Descriptions.Item label="Name" span={2}>
                                {this.state.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Citizen ID" span={2}>
                                {this.state.citizen_id}
                            </Descriptions.Item>
                            <Descriptions.Item label="Gender" span={2}>
                                {this.state.gender ? "Male" : "Female"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Year of birth" span={2}>
                                {this.state.yob}
                            </Descriptions.Item>
                            <Descriptions.Item label="Address" span={2}>
                                {this.state.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone" span={2}>
                                {this.state.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status" span={2}>
                                {status}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is Travel" span={2}>
                                {this.state.is_travel ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is Fever" span={2}>
                                {this.state.is_fever ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is Cough" span={2}>
                                {this.state.is_cough ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is Nobreath" span={2}>
                                {this.state.is_nobreath ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is Pnue" span={2}>
                                {this.state.is_pnue ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is Throat" span={2}>
                                {this.state.is_throat ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is Tire" span={2}>
                                {this.state.is_tire ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is contact f0" span={2}>
                                {this.state.is_contact_f0 ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is contact suspect" span={2}>
                                {this.state.is_contact_suspect ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Have chronic" span={2}>
                                {this.state.have_chronic ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Have heart pressure" span={2}>
                                {this.state.have_heart_pressure ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Have hiv immu" span={2}>
                                {this.state.have_hiv_immu ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Have transplant" span={2}>
                                {this.state.have_transplant ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Have diabetes" span={2}>
                                {this.state.have_diabetes ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Have cancer" span={2}>
                                {this.state.have_cancer ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Have prenant" span={2}>
                                {this.state.have_prenant ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Time" span={2}>
                                {this.state.time}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className="qr-code">
                        <QRCode size="250" value={JSON.stringify(data)} />
                    </div>
                </div>
            </>
        );
    }
}

export default DetailHealthDcl;