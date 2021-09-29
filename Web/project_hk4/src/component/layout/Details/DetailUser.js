import React, { Component } from 'react';
import axios from 'axios';
import { Button, Empty } from "antd";
import { NavLink } from 'react-router-dom';
import { Descriptions } from 'antd';
import { Label, Table, Header } from 'semantic-ui-react'
import "../../../css/qrcode.css"
// import MapTravel from "../Map/MapTravel"
var QRCode = require('qrcode.react');



class DetailUser extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
            vac_status: "",
            vac1: "",
            date1: "",
            vac2: "",
            date2: "",

            listPcrs: [],
            listTravels: [],
            listHealthDcls: [],
            listHealthDailys: [],

        }
    }

    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
        axios.get("http://localhost:8080/covid/users/" + id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                citizen_id: res.data.citizen_id,
                gender: res.data.gender,
                yob: res.data.yob,
                address: res.data.address,
                phone: res.data.phone,
                status: res.data.status,
                vac_status: res.data.vac_status,
                vac1: res.data.vac1,
                date1: res.data.date1,
                vac2: res.data.vac2,
                date2: res.data.date2,
            })
        })
        axios.get("http://localhost:8080/covid/pcrs/getbyuserid/" + id).then(res => {
            console.log(res.data)
            this.setState({
                listPcrs: res.data
            })
        })
        axios.get("http://localhost:8080/covid/travel_histories/getbyuserid/" + id).then(res => {
            this.setState({
                listTravels: res.data
            })
        })
        axios.get("http://localhost:8080/covid/health_dcls/getbyuserid/" + id).then(res => {
            this.setState({
                listHealthDcls: res.data
            })
        })
        axios.get("http://localhost:8080/covid/health_daily/getbyuserid/" + id).then(res => {
            this.setState({
                listHealthDailys: res.data
            })
        })
    }
    render() {
        console.log(this.state.listPcrs)
        let result1 = "";
        let label;
        let statusQr;
        let buttonF;
        if (this.state.status === 0) {
            result1 = "rgba(63,219,240, 0.3)";
            label = <Label as='a' color="teal">Normal</Label>
            statusQr = "Normal"
            buttonF = <>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/createuserf0/${this.state.id}`}>
                        F0
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/createuserf1/${this.state.id}`}>
                        F1
                    </NavLink>
                </Button>
            </>

        } else if (this.state.status === 1) {
            result1 = "rgba(225,133,27, 0.3)";
            label = <Label as='a' color='orange' >F 1</Label>
            statusQr = "F1"
            buttonF = <>
            <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                <NavLink to={`/createuserf0/${this.state.id}`}>
                    F0
                </NavLink>
            </Button>
        </>
        } else {
            result1 = "rgba(219,40,40, 0.4)"
            label = <Label as='a' color='red' >F 0</Label>
            statusQr = "F0"
            buttonF = <></>
        }

        let vaccine;
        let StatusVaccineQr;
        if (this.state.vac_status == 0) {
            vaccine = <Label color="grey">Not injected</Label>
            StatusVaccineQr = "Not injected"
        } else if (this.state.vac_status == 1) {
            vaccine = <Label color="grey">Injected 1</Label>
            StatusVaccineQr = "Injected 1"
        } else {
            vaccine = <Label color="grey">Injected 2</Label>
            StatusVaccineQr = "Injected 2"
        }

        const data = {
            Name: this.state.name,
            CitizenID: this.state.citizen_id,
            Gender: this.state.gender,
            Yob: this.state.yob,
            Address: this.state.address,
            Phone: this.state.phone,
            Status: statusQr,
            StatusVaccine: StatusVaccineQr,
            VaccineI: this.state.vac1,
            DateI: this.state.date1,
            VaccineII: this.state.vac2,
            DateII: this.state.date2,
            
        }

        let isVaccine1;
        if (this.state.vac1 == "") {
            isVaccine1 = "Not Injected"
        } else {
            isVaccine1 = `${this.state.vac1} / ${this.state.date1}`
        }

        let isVaccine2;
        if (this.state.vac2 == "") {
            isVaccine2 = "Not Injected"
        } else {
            isVaccine2 = `${this.state.vac2} / ${this.state.date2}`
        }
        return (

            <>
                <Header
                    as='h1'
                    content='USER DETAIL'
                    subheader=''
                />
                <Button type="primary" style={{ margin: "10px 0" }}>
                    <NavLink to="/showuser">
                        Back to list
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/reportuser/${this.state.id}`}>
                        Report
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/createpcr/${this.state.id}`}>
                        +Pcr
                    </NavLink>
                </Button>          
                {buttonF}
                <Descriptions title="User Info" style={{ paddingTop: "10px" }}>
                    <Descriptions.Item label="UserName">{this.state.name}</Descriptions.Item>
                    <Descriptions.Item label="Citizen ID">{this.state.citizen_id}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{this.state.gender ? "Male" : "Female"}</Descriptions.Item>
                    <Descriptions.Item label="Year of Birth">{this.state.yob}</Descriptions.Item>
                    <Descriptions.Item label="Phone">
                        {this.state.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {this.state.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {label}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vaccine">
                        {vaccine}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="" style={{ paddingTop: "10px" }} layout="horizontal" labelStyle={{ fontWeight: "bold" }}>
                    <Descriptions.Item label="Vaccine I" span={3}>{isVaccine1}</Descriptions.Item>
                    <Descriptions.Item label="Vaccine II" span={3}>{isVaccine2}</Descriptions.Item>
                </Descriptions>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ flex: 1 }}>
                        <h3>List Pcr test</h3>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Result</Table.HeaderCell>
                                    <Table.HeaderCell>Time</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {this.state.listPcrs.length != 0 &&
                                <Table.Body>
                                    {
                                        this.state.listPcrs.map((listPcr, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{listPcr.result}</Table.Cell>
                                                    <Table.Cell>{listPcr.time}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            }
                            {this.state.listPcrs.length == 0 && <Empty />}
                        </Table>

                        <h3>Travel History</h3>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Adress</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {this.state.listTravels.length != 0 &&
                                <Table.Body>
                                    {
                                        this.state.listTravels.map((listTravel, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{listTravel.address}</Table.Cell>
                                                    <Table.Cell>{listTravel.date}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            }
                            {this.state.listTravels.length == 0 && <Empty />}
                        </Table>
                    </div>
                    <div className="qr-code" style={{ marginTop: "35px", marginLeft: "20px" }}>
                        <QRCode size="190" value={JSON.stringify(data)} />
                    </div>
                </div>

                <h3>Health Daily</h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Cough</Table.HeaderCell>
                            <Table.HeaderCell>Fever</Table.HeaderCell>
                            <Table.HeaderCell>Short Breath</Table.HeaderCell>
                            <Table.HeaderCell>Tired</Table.HeaderCell>
                            <Table.HeaderCell>Strong</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {
                        this.state.listHealthDailys.length != 0 &&
                        <Table.Body>
                            {
                                this.state.listHealthDailys.map((listHealthDaily, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{listHealthDaily.timestamp}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDaily.is_cough ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDaily.is_fever ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDaily.is_breath ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDaily.is_tired ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDaily.is_strong ? <div style={{ color: "green" }}>Yes</div> : <div style={{ color: "red" }}>No</div>}</Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    }
                    {this.state.listHealthDailys.length == 0 && <Empty />}

                </Table>
                <div  style={{paddingBottom: "60px"}}>
                <h3>Health Declaration</h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>Travel</Table.HeaderCell>
                            <Table.HeaderCell>Fever</Table.HeaderCell>
                            <Table.HeaderCell>Cough</Table.HeaderCell>
                            <Table.HeaderCell>Short Breath</Table.HeaderCell>
                            <Table.HeaderCell>Pneumonia</Table.HeaderCell>
                            <Table.HeaderCell>Throat</Table.HeaderCell>
                            <Table.HeaderCell>Tired</Table.HeaderCell>
                            <Table.HeaderCell>Contact</Table.HeaderCell>
                            <Table.HeaderCell>Suspect</Table.HeaderCell>
                            <Table.HeaderCell>Chronic</Table.HeaderCell>
                            <Table.HeaderCell>Heart/Pressure</Table.HeaderCell>
                            <Table.HeaderCell>Hiv/Immu</Table.HeaderCell>
                            <Table.HeaderCell>Transplant</Table.HeaderCell>
                            <Table.HeaderCell>Diabetes</Table.HeaderCell>
                            <Table.HeaderCell>Cancer</Table.HeaderCell>
                            <Table.HeaderCell>Pregnant</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {this.state.listHealthDcls.length != 0 &&
                        <Table.Body>
                            {
                                this.state.listHealthDcls.map((listHealthDcl, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{listHealthDcl.time}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_travel ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_fever ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_cough ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_nobreath ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_pnue ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_throat ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_tire ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_contact_f0 ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.is_contact_suspect ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.have_chronic ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.have_heart_pressure ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.have_hiv_immu ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.have_transplant ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.have_diabetes ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.have_cancer ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listHealthDcl.have_prenant ? <div style={{ color: "red" }}>Yes</div> : <div style={{ color: "green" }}>No</div>}</Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    }
                    {this.state.listHealthDcls.length == 0 && <Empty />}
                </Table>
                {/* <MapTravel listTravels={this.state.listTravels}/> */}
                </div>
            </>
        )
    }
}

export default DetailUser;