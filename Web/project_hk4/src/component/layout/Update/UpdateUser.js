import React, { Component } from 'react';
import "../../../css/form.css"
import ValidationErr from '../../main/ValidationErr';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import { Select } from 'semantic-ui-react'


class UpdateUser extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
            nameType: "",
            isRedirect: false,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
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
                nameType: res.data.nameType
            })
        })
    }

    handleChange = (e, typeName) => {
        if (typeName == "name") {
            this.setState({
                name: e.target.value
            })
        }
        if (typeName == "citizen_id") {
            this.setState({
                citizen_id: e.target.value
            })
        }
        if (typeName == "phone") {
            this.setState({
                phone: e.target.value
            })
        }
        if (typeName == "address") {
            this.setState({
                address: e.target.value
            })
        }
        if (typeName == "yob") {
            this.setState({
                yob: e.target.value
            })
        }
        this.setState({
            nameType: typeName
        })
    }
    handleChangeSelectGender = (e,data) => {
        this.setState({
            gender: data.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        axios.put(`http://localhost:8080/covid/users/${id}`, this.state).then(res => {
            if (res.status == 200) {
                this.setState({ isRedirect: true })
            }
            console.log(res);
        })
    }
    render() {
        console.log(this.state.status)
        if (this.state.isRedirect == true) {
            return <Redirect to="/showuser" />
        }
        let status;
        if (this.state.status == 0) {
            status = "Normal"
        } else if (this.state.status == 1) {
            status = "F1"
        } else {
            status = "F0"
        }
        let gender;
        if(this.state.gender == true){
            gender = "Male"
        }else{
            gender = "Female"

        }
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.handleSubmit} style={{width:"50%"}}>
                        <div className="input-group">
                            <div className="input-label">Name</div>
                            <input type="text" onChange={(e) => this.handleChange(e, "name")} name="name" className="input-text" value={this.state.name}></input>
                            <ValidationErr value={this.state.name} nameType={this.state.nameType} id={"name"} />
                        </div>
                        <div className="input-group">
                            <div className="input-label">Citizen ID</div>
                            <input type="text" onChange={(e) => this.handleChange(e, "citizen_id")} name="citizen_id" className="input-text" value={this.state.citizen_id}></input>
                            <ValidationErr value={this.state.citizen_id} nameType={this.state.nameType} id={"citizen_id"} />
                        </div>
                        <div className="input-group">
                            <div className="input-label">Gender</div>
                            <Select placeholder={gender} options={[
                                { value: "true", text: 'Male' },
                                { value: "false", text: 'Female' },
                            ]}
                            onChange={this.handleChangeSelectGender}
                            />
                        </div>
                        <div className="input-group">
                            <div className="input-label">Year Of Birth</div>
                            <input type="text" onChange={(e) => this.handleChange(e, "yob")} name="yob" value={this.state.yob} className="input-text"></input>
                            <ValidationErr value={this.state.yob} nameType={this.state.nameType} id={"yob"} />
                        </div>
                        <div className="input-group">
                            <div className="input-label">Address</div>
                            <input type="text" onChange={(e) => this.handleChange(e, "address")} name="address" value={this.state.address} className="input-text"></input>
                            <ValidationErr value={this.state.address} nameType={this.state.nameType} id={"address"} />
                        </div>
                        <div className="input-group" >
                            <div className="input-label">Phone</div>
                            <input style={{background: "#ccc"}} type="number" onChange={(e) => this.handleChange(e, "phone")} name="phone" className="input-text" value={this.state.phone} readOnly></input>
                            <ValidationErr value={this.state.phone} nameType={this.state.nameType} id={"phone"} />
                        </div>
                        <div className="input-group" >
                            <div className="input-label">Status</div>
                            <input style={{background: "#ccc", width: "10%"}} type="text" onChange={(e) => this.handleChange(e, "phone")} className="input-text" value={status} readOnly></input>
                        </div>
         
                        <button type='submit' disabled={false} className="btn-submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateUser;