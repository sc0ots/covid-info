import React, { Component } from 'react';
import "../../../css/form.css"
import ValidationErr from '../../main/ValidationErr';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import { Select } from 'semantic-ui-react'


class UpdateQuarantine extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            address: "",
            nameType: "",
            isRedirect: false,
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/quarantinearea/" + id).then(res => {
            console.log(res)
            this.setState({
                name: res.data.name,
                address: res.data.address
            })
        })
    }

    handleOnChange = (e, typeName) => {
        if(typeName == "name"){
            this.setState({
                name: e.target.value
            })
        }
        if(typeName == "address"){
            this.setState({
                address: e.target.value
            })
        }
        this.setState({
            nameType: typeName
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        axios.put(`http://localhost:8080/covid/quarantinearea/${id}`, this.state).then(res => {
            if (res.status == 200) {
                this.setState({ isRedirect: true })
            }
            console.log(res);
        })

    }

    render() {
        if (this.state.isRedirect) {
            return <Redirect to="/showquarantine" />
        }
        return (
            <div className="form" onSubmit={this.handleSubmit}>
                <form style={{ width: "50%" }}>
                    <div className="input-group">
                        <div className="input-label">Name</div>
                        <input type="name" onChange={(e) => this.handleOnChange(e, "name")} value={this.state.name} className="input-text"></input>
                        <ValidationErr value={this.state.name} nameType={this.state.nameType} id={"name"} />
                    </div>
                    <div className="input-group">
                        <div className="input-label">Address</div>
                        <input type="name" onChange={(e) => this.handleOnChange(e, "address")} value={this.state.address} className="input-text"></input>
                        <ValidationErr value={this.state.address} nameType={this.state.nameType} id={"address"} />
                    </div>
                    <button type='submit' disabled={false} className="btn-submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default UpdateQuarantine;