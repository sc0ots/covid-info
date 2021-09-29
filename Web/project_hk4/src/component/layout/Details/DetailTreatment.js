/* global google */
import React, { Component, useEffect } from 'react';
import { Descriptions } from 'antd';
import axios from 'axios';
import { Header, Input } from 'semantic-ui-react'

import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, DirectionsRenderer } from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBKaMgXoAdVYAUvDsbgSnUJCm8ufL6W0jk");
Geocode.setLanguage("vn");
Geocode.setRegion("vi");
Geocode.enableDebug();

class DetailTreatment extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            address: "",

            addresser: '',
            directions: '',

            currentLocation: { lat: "", lng: "" },
            mapCenter: { lat: '', lng: '', },
            mapMarker: { lat: '', lng: '' },
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
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/treatmentarea/" + id).then(res => {
            this.setState({
                name: res.data.name,
                address: res.data.address
            })

            Geocode.fromAddress(res.data.address).then(
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
                    console.log(destination)
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

    //search map
    handleChange = addresser => {
        this.setState({ addresser });
    };


    //lay dia chi trong danh sach hien len + lay kinh vi do
    handleSelect = addresser => {
        this.setState({ addresser });
        geocodeByAddress(addresser)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                console.log('Success', { lat, lng });
                // update center state
                this.setState({
                    mapMarker: { lat, lng },
                });


                //tim duong
                const directionsService = new google.maps.DirectionsService();
                const origin = this.state.mapCenter
                //search dia diem
                const destination = { lat: lat, lng: lng };
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
                )
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        const { mapCenter, addresser } = this.state

        const MapWithAMarker = withGoogleMap(props =>

            <GoogleMap
                defaultZoom={16}
                defaultCenter={this.state.directions}
                center={this.state.directions}
            >
                <DirectionsRenderer directions={this.state.directions} />
                <Marker position={this.state.directions}>
                </Marker>
            </GoogleMap>
        );

        return (
            <>
                <Header
                    as='h1'
                    content='Details treatment'
                    subheader=''
                />
                <Descriptions title="Treatment" labelStyle={{ fontWeight: "bold", fontSize: "16px" }} contentStyle={{ fontSize: "16px" }} layout="horizontal">
                    <Descriptions.Item label="Name">{this.state.name}</Descriptions.Item>
                    <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
                </Descriptions>
                <PlacesAutocomplete value={addresser} onChange={this.handleChange} onSelect={this.handleSelect}  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div style={{ position: "relative", width: "50%" }}>
                            <Input {...getInputProps({ placeholder: 'Search Places ...', className: 'location-search-input', })} style={{ padding: "10px 0", width: "100%" }} />
                            <div className="autocomplete-dropdown" style={{ position: "absolute", margin: "10px 0", top: "70%", left: "0", right: "0", zIndex: 10, borderRadius: "4px", boxShadow: "1px 1px 6px rgba(0,0,0,0.3)" }}>
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    return (
                                        <div style={{ padding: "10px 0 0 10px", cursor: "pointer", backgroundColor: "#fff", borderRadius: "4px" }} {...getSuggestionItemProps(suggestion, { className })}>
                                            <span >{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <div className="map-container">
                    <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKaMgXoAdVYAUvDsbgSnUJCm8ufL6W0jk&v=3.exp&libraries=geometry,drawing,places&callback=initMap"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: '600px' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>


            </>
        )
    }
}
export default DetailTreatment;