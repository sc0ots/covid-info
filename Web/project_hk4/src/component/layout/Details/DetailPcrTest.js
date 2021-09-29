import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Descriptions, Button } from 'antd';
import axios from "axios";
import {Header } from 'semantic-ui-react';

class DetailPcrTest extends Component {
    constructor() {
        super()
        this.state = {
            user_id: "",

            id: "",
            name: "",
            citizen_id: "",
            result: "",
            time: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",

        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/pcrs/" + id).then(res => {
            this.setState({
                user_id: res.data.user.id,

                id: res.data.id,
                name: res.data.user.name,
                citizen_id: res.data.user.citizen_id,
                result: res.data.result,
                time: res.data.time,
                gender: res.data.user.gender,
                yob: res.data.user.yob,
                address: res.data.user.address,
                phone: res.data.user.phone,
                status: res.data.user.status,
            })
        }
        )
    }
    render() {
        let gender;
        if (this.state.gender) {
            gender = "Male"
        } else {
            gender = "Female"
        }
        let status;
        if (this.state.status == 0) {
            status = "Normal"
        } else if (this.state.status == 1) {
            status = "F1"
        } else {
            status = "F0"
        }
        return (

            <>
                <Header
                    as='h1'
                    content='DETAIL PCR'
                    subheader=''
                />
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={"/showallpcrtest"}>
                        Back to list
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/showuser/${this.state.user_id}`}>
                        Show user
                    </NavLink>
                </Button>
                <Descriptions title="" labelStyle={{ fontWeight: "bold", width: "10%", fontSize: "20" }} layout="horizontal" bordered size="default">
                    <Descriptions.Item extra label="ID" span={3} >
                        {this.state.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name" span={3}>
                        {this.state.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Travel History" span={3}>
                        {this.state.result}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date" span={3}>
                        {this.state.time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender" span={3}>
                        {gender}
                    </Descriptions.Item>
                    <Descriptions.Item label="Yob" span={3}>
                        {this.state.yob}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>
                        {this.state.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone" span={3}>
                        {this.state.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        {status}
                    </Descriptions.Item>
                </Descriptions>
            </>
        );
    }
}

export default DetailPcrTest;