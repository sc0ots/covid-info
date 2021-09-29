import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Descriptions, Button } from 'antd';
import { Header } from 'semantic-ui-react'
import axios from "axios";
import "../../../css/qrcode.css"
var QRCode = require('qrcode.react');


class DetailHealthDcl extends Component {
    constructor() {
        super()
        this.state = {
            user_id: "",

            id: "",
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
            is_fever: "",
            is_cough: "",
            is_nobreath: "",
            is_tire: "",
            is_strong: "",
            timestamp: ""


        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/health_daily/" + id).then(res => {
            this.setState({
                user_id: res.data.user.id,

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
                is_tire: res.data.is_tire,
                timestamp: res.data.timestamp
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
            status: status,
            is_fever: this.state.is_fever,
            is_cough: this.state.is_fever,
            is_nobreath: this.state.is_fever,
            is_tire: this.state.is_fever,
            is_strong: this.state.is_fever,
            timestamp: this.state.is_fever
        }
        return (
            <>
                <Header
                    as='h1'
                    content='DETAIL HEALTH DAILY'
                    subheader=''
                />
                <Button type="primary" style={{ margin: "10px 0" }}>
                    <NavLink to="/showhealthdaily">
                        Back to list
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/reporthealthdaily/${this.state.id}`}>
                        Report
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/showuser/${this.state.user_id}`}>
                        Show user
                    </NavLink>
                </Button>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ width: "50%" }}>
                        <Descriptions title="" labelStyle={{ fontWeight: "bold", width: "20%", fontSize: "20" }} layout="" size="" bordered>
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
                            <Descriptions.Item label="Is fever" span={2}>
                                {this.state.is_fever ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is cough" span={2}>
                                {this.state.is_cough ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is nobreath" span={2}>
                                {this.state.is_nobreath ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is tire" span={2}>
                                {this.state.is_tire ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Is strong" span={2}>
                                {this.state.is_strong ? "Yes" : "No"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Timestamp" span={2}>
                                {this.state.timestamp}
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