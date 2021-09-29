import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Descriptions } from 'antd';
import axios from "axios";
import { Button, Header } from 'semantic-ui-react';

class DetailTravelHistory extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            citizen_id: "",
            travelHistory: "",
            date: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",

        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/travel_histories/" + id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.user.name,
                citizen_id: res.data.user.citizen_id,
                travelHistory: res.data.address,
                date: res.data.date,
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
                    content='DETAIL TRAVEL HISTORY'
                    subheader=''
                />
                <NavLink to="/showtravelhistory" style={{ marginBottom: "16px", display: "block" }}>
                    <Button primary>Back to list</Button>
                </NavLink>
                <Descriptions title="" labelStyle={{ fontWeight: "bold", width: "10%", fontSize: "20" }} layout="horizontal" bordered size="default">
                    <Descriptions.Item extra label="ID" span={3} >
                        {this.state.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name" span={3}>
                        {this.state.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Travel History" span={3}>
                        {this.state.travelHistory}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date" span={3}>
                        {this.state.date}
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

export default DetailTravelHistory;