import React, { Component } from "react";
import { Button } from "antd";
import { NavLink } from 'react-router-dom';
import { Descriptions } from 'antd';
import axios from "axios";
import { Header } from 'semantic-ui-react'


class DetailMedicalStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: '',
            dob: '',
            medical_lícense: '',
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
        axios.get(`http://localhost:8080/covid/medstf/` + id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                dob: res.data.dob,
                medical_lícense: res.data.medical_lícense,
                username: res.data.username,
                password: res.data.password
            })
        })
    }

    render() {
        return (
            <>
                <Header
                    as='h1'
                    content='Details Medicalstaff'
                    subheader=''
                />
                <Button type="primary" style={{ margin: "10px 0" }}>
                    <NavLink to="/showmedicalstaff">Back to list</NavLink>
                </Button>
                <Descriptions title="" labelStyle={{ fontWeight: "bold", width: "10%", fontSize: "20" }} layout="horizontal" bordered size="default">
                    <Descriptions.Item extra label="ID" span={3} >
                        {this.state.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name" span={3}>
                        {this.state.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Medical Lisence" span={3}>
                        {this.state.medical_lícense}
                    </Descriptions.Item>
                    <Descriptions.Item label="User Name" span={3}>
                        {this.state.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="Password" span={3}>
                        {this.state.password}
                    </Descriptions.Item>
                </Descriptions>
            </>
        )
    }

}
export default DetailMedicalStaff