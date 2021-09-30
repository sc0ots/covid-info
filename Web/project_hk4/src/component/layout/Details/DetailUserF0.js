/* global google */
import React, { Component } from 'react';
import { Descriptions } from 'antd';
import axios from 'axios';
import { Button } from "antd";
import { NavLink, } from 'react-router-dom';
import { Header, Modal } from 'semantic-ui-react'
import "../../../css/qrcode.css"
import { withGoogleMap, GoogleMap, withScriptjs, Marker, DirectionsRenderer } from "react-google-maps";
import Geocode from "react-geocode";
var QRCode = require('qrcode.react');

Geocode.setApiKey("GOOGLE-API-KEY-HERE");
Geocode.setLanguage("vn");
Geocode.setRegion("vi");
Geocode.enableDebug();

class DetailUserF0 extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            user_id: "",
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
            temp: "",
            heart_rate: "",
            tlc: "",
            spo2: "",
            area_id: "",
            treatment_area_name: "",
            treatment_area_address: "",


            directions: '',
            mapCenter: {
                lat: '',
                lng: '',
            },

            currentLocation: { lat: "", lng: "" },

            open: false
        }
        navigator.geolocation.getCurrentPosition(res => {
            this.setState({
                currentLocation: {
                    lat: res.coords.latitude,
                    lng: res.coords.longitude
                },
            })
        })
    }

    componentDidMount() {
        const { match } = this.props;
        console.log(match)
        const id = match.params.id;
        axios.get("http://localhost:8080/covid/user_f0s/" + id).then(res => {
            this.setState({
                id: res.data.id,
                user_id: res.data.user_id,
                name: res.data.user.name,
                citizen_id: res.data.user.citizen_id,
                gender: res.data.user.gender,
                yob: res.data.user.yob,
                address: res.data.user.address,
                phone: res.data.user.phone,
                status: res.data.user.status,
                temp: res.data.temp,
                heart_rate: res.data.heart_rate,
                tlc: res.data.tlc,
                spo2: res.data.spo2,
                area_id: res.data.area_id,
                treatment_area_name: res.data.treatment_area.name,
                treatment_area_address: res.data.treatment_area.address
            })

            Geocode.fromAddress(res.data.user.address).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({
                        mapCenter: {
                            lat: lat,
                            lng: lng,
                        }
                    })
                    const directionsService = new google.maps.DirectionsService();
                    const origin = { lat: lat, lng: lng };
                    const destination = {
                        lat: this.state.currentLocation.lat,
                        lng: this.state.currentLocation.lng
                    };
                    directionsService.route(
                        {
                            origin: origin,
                            destination: destination,
                            travelMode: google.maps.TravelMode.DRIVING,
                        },
                        (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: result
                                });
                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        }
                    );
                },
                (error) => {
                    console.error(error);
                }
            )


        })
    }
    render() {

        const { mapCenter } = this.state

        const MapWithAMarker = withGoogleMap(props =>
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}>
                <Marker position={{ lat: mapCenter.lat, lng: mapCenter.lng }}>

                    <DirectionsRenderer directions={this.state.directions} />
                </Marker>
            </GoogleMap>
        );


        const data = {
            Name: this.state.name,
            CitizenID: this.state.citizen_id,
            Gender: this.state.gender,
            Yob: this.state.yob,
            Address: this.state.address,
            Phone: this.state.phone,
            Status: this.state.status,
            Temp: this.state.temp,
            HeartRate: this.state.heart_rate,
            Tlc: this.state.tlc,
            Spo2: this.state.spo2,
            TreatmentName: this.state.treatment_area_name,
            TreatmentAddress: this.state.treatment_area_address
        }

        let result;
        if (this.state.status === 0) {
            result = "Normal"

        } else if (this.state.status === 1) {
            result = "F1"

        } else {
            result = "F0"
        }
        return (
            <div>
                <Header
                    as='h1'
                    content='USER F0 DETAIL'
                    subheader=''
                />
                <Button type="primary" style={{ margin: "10px 0" }}>
                    <NavLink to="/showuserf0">
                        Back to list
                    </NavLink>
                </Button>
                <Button type="primary" style={{ margin: "10px 0 0 6px" }}>
                    <NavLink to={`/reportf0/${this.state.id}`}>
                        Report
                    </NavLink>
                </Button>
                <Modal
                    style={{width:"fit-content"}}
                    onClose={() => this.setState({ open: false })}
                    onOpen={() => this.setState({ open: true })}
                    open={this.state.open}
                    trigger={<Button type="primary" style={{marginLeft: "6px"}}>QRCode</Button>}
                >   
                    <Modal.Content image  size="small" >
                        <Modal.Description >
                            <div className="qr-code" style={{width: "fit-content"}}>
                                <QRCode size="300" value={JSON.stringify(data)} />
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                <div >
                    <div style={{ width: "" }}>
                        <Descriptions title="" labelStyle={{ fontWeight: "bold", width: "10%", fontSize: "20" }} layout="horizontal" bordered size="small">
                            <Descriptions.Item extra label="ID" span={3} >
                                {this.state.id}
                            </Descriptions.Item>
                            <Descriptions.Item extra label="User ID" span={3} >
                                {this.state.user_id}
                            </Descriptions.Item>
                            <Descriptions.Item label="Name" labelStyle={{ fontWeight: "bold" }} span={3}>
                                {this.state.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Citizen_ID" span={3}>
                                {this.state.citizen_id}
                            </Descriptions.Item>
                            <Descriptions.Item label="Gender" span={3}>
                                {this.state.gender ? "Nam" : "Nữ"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Yob" span={3}>
                                {this.state.yob}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status" span={3}>
                                {result}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone" span={3}>
                                {this.state.phone}
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Address" span={3}>
                                {this.state.address}
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Temp" span={3}>
                                {this.state.temp}C
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Heart Rate" span={3}>
                                {this.state.heart_rate}bpm
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Tcl" span={3}>
                                {this.state.tlc}ml
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Spo2" span={3}>
                                {this.state.spo2}%
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Area ID" span={3}>
                                {this.state.area_id}
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Traetment Name" span={3}>
                                {this.state.treatment_area_name}
                            </Descriptions.Item>
                            <Descriptions.Item column="md-6" label="Treatment Address" span={3}>
                                {this.state.treatment_area_address}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className="map-container" style={{margin: "20px 0", paddingBottom: "60px"}}>
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKaMgXoAdVYAUvDsbgSnUJCm8ufL6W0jk&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: '600px' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>

            </div>
        )
    }
}

export default DetailUserF0;
