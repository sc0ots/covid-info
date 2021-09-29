import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import WarNing from "../../../img/warning.svg"

const addressdata = [
    { id: 1, address: "Chợ Trung Hoà, Quốc lộ 27, Ea Tiêu, Cư Kuin, Đắk Lắk" },
    { id: 2, address: "Trường THCS Trung Hòa, Ea K'Tur, Cư Kuin, Đắk Lắk" },
    { id: 3, address: "Bún bò Bon Bon, Quốc lộ 27, Ea Tiêu, Cư Kuin, Đắk Lắk" }
];
export default class MapTravel extends Component {
    constructor() {
        super();
        this.state = {
            viewport: {

                latitude: 12.596439,
                longitude: 108.136505,
                zoom:13

            },
            addressMarker: []
        };
    }
    componentDidMount() {
        let newaddressdata = [];
        this.props.listTravels.map((listTravel) => {
            axios
                .get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${listTravel.address}.json?access_token=pk.eyJ1IjoiY2h1YW5ob2FuZzExIiwiYSI6ImNrdHNvaWp0MzB3MHgybmw1eXMzemtteXUifQ.JKz4w0g9FrLyDgiXGvCs8Q`
                )
                .then((res) => {
                    newaddressdata.push({
                        ...listTravel,
                        longitude: res.data.features[0].center[0],
                        latitude: res.data.features[0].center[1]
                    });
                })
                .catch((error) => console.log(error));
        });
        // console.log(newaddressdata)
        this.setState({
            addressMarker: newaddressdata
        })
    }

    render() {
        console.log("arr", this.state.addressMarker);
        return (
            <div >
                <ReactMapGL {...this.state.viewport} mapStyle="mapbox://styles/mapbox/streets-v11"
                    width="100%"
                    height="80vh"
                    onViewportChange={(viewport => this.setState({ viewport }))}
                    mapboxApiAccessToken="pk.eyJ1IjoiY2h1YW5ob2FuZzExIiwiYSI6ImNrdHNvaWp0MzB3MHgybmw1eXMzemtteXUifQ.JKz4w0g9FrLyDgiXGvCs8Q"

                >
                    {
                        this.state.addressMarker.map(addressm => {
                            return (
                                <Marker
                                    latitude={addressm.latitude}
                                    longitude={addressm.longitude}
                                >
                                    <img src={WarNing} width={30}></img>
                                </Marker>
                            )
                        })
                    }

                </ReactMapGL>
            </div>
        );
    }
}