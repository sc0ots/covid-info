import React, { Component } from 'react';
import "../../../css/form.css"
import ValidationErr from '../../main/ValidationErr';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import { Select } from 'semantic-ui-react'


class UpdateUserF0 extends Component {
    constructor() {
        super()
        this.state = {
            temp: "",
            heart_rate: "",
            spo2: "",
            tlc: "",
            area_id: "",
            user_id: "",
            treatmentName: "",
            treatmentAreas: [],
            nameType: "",
            isRedirect: false,
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/user_f0s/" + id).then(res => {
            console.log(res)
            this.setState({
                temp: res.data.temp,
                heart_rate: res.data.heart_rate,
                spo2: res.data.spo2,
                tlc: res.data.tlc,
                user_id: res.data.user_id,
                area_id: res.data.area_id,
                treatmentName: res.data.treatment_area.name
            })
        })
        axios.get("http://localhost:8080/covid/treatmentarea/show").then(res => {
            const treatmentAreas = res.data
            this.setState({
                treatmentAreas
            })
        })
    }
    handleOnChange = (e, typeName) => {
        if(typeName == "temp"){
            this.setState({
                temp: e.target.value
            })
        }
        if(typeName == "heart_rate"){
            this.setState({
                heart_rate: e.target.value
            })
        }
        if(typeName == "tlc"){
            this.setState({
                tlc: e.target.value
            })
        }     
        if(typeName == "spo2"){
            this.setState({
                spo2: e.target.value
            })
        }
        this.setState({
            nameType: typeName
        })
    }
    handleChangeSelect = (e,data) => {
        this.setState({
            area_id: data.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        axios.put(`http://localhost:8080/covid/user_f0s/${id}`, this.state).then(res => {
            if (res.status == 200) {
                this.setState({ isRedirect: true })
            }
            console.log(res);
        })

    }

    render() {
        if(this.state.isRedirect){
            return <Redirect to="/showuserf0"/>
        }
        return (
            <div className="form" onSubmit={this.handleSubmit}>
                <form style={{width: "50%"}}>
                    <div className="input-group">
                        <div className="input-label">Temp</div>
                        <input type="number" onChange={(e) => this.handleOnChange(e, "temp")} value={this.state.temp} className="input-text"></input>
                        <ValidationErr value={this.state.temp} nameType={this.state.nameType} id={"temp"} />

                    </div>
                    <div className="input-group">
                        <div className="input-label">Heart rate</div>
                        <input type="number" onChange={(e) => this.handleOnChange(e, "heart_rate")} value={this.state.heart_rate} className="input-text"></input>
                        <ValidationErr value={this.state.heart_rate} nameType={this.state.nameType} id={"heart_rate"} />
                    </div>
                    <div className="input-group">
                        <div className="input-label">Spo2</div>
                        <input type="number" onChange={(e) => this.handleOnChange(e, "spo2")} value={this.state.spo2} className="input-text"></input>
                        <ValidationErr value={this.state.spo2} nameType={this.state.nameType} id={"spo2"} />
                    </div>
                    <div className="input-group">
                        <div className="input-label">Tlc</div>
                        <input type="number" onChange={(e) => this.handleOnChange(e, "tlc")} value={this.state.tlc} className="input-text"></input>
                        <ValidationErr value={this.state.tlc} nameType={this.state.nameType} id={"tlc"} />
                    </div>
                    <div className="input-group">
                        <div className="input-label">Treatment Area</div>
                        <Select placeholder={this.state.treatmentName} options={[
                            ...this.state.treatmentAreas.map(treatment => {
                                return(
                                    { value: treatment.id, text: treatment.name }
                                )
                            })
                        ]}
                            onChange={this.handleChangeSelect}
                        />
                    </div>
                    <button type='submit' disabled={false} className="btn-submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default UpdateUserF0;