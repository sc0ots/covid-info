import React, { Component } from 'react';
import "../../../css/form.css"
import ValidationErr from '../../main/ValidationErr';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import { Select } from 'semantic-ui-react'


class UpdateUserF1 extends Component {
    constructor() {
        super()
        this.state = {
            user_id: "",
            area_id: "",
            day_start: "",
            day_end: "",
            quarantineName: "",
            quarantineAreas: [],
            nameType: "",
            isRedirect: false,
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/user_f1s/" + id).then(res => {
            console.log(res)
            this.setState({
                user_id: res.data.user_id,
                area_id: res.data.area_id,
                day_start: res.data.day_start,
                day_end: res.data.day_end,
                quarantineName: res.data.quarantine_area.name
            })
        })
        axios.get("http://localhost:8080/covid/quarantinearea/show").then(res => {
            const quarantineAreas = res.data
            this.setState({
                quarantineAreas
            })
        })
    }
    handleChangeSelect = (e, data) => {
        this.setState({
            area_id: data.value
        })
    }
    handleOnChange = (e, typeName) => {
        if(typeName == "day_start"){
            this.setState({
                day_start: e.target.value
            })
        }
        if(typeName == "day_end"){
            this.setState({
                typeName: e.target.value
            })
        }
        this.setState({
            
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        axios.put(`http://localhost:8080/covid/user_f1s/${id}`, this.state).then(res => {
            if (res.status == 200) {
                this.setState({ isRedirect: true })
            }
            console.log(res);
        })

    }

    render() {
        console.log(this.state.area_id)
        console.log(this.state)
        if (this.state.isRedirect) {
            return <Redirect to="/showuserf1" />
        }
        return (
            <div className="form" onSubmit={this.handleSubmit}>
                <form style={{ width: "50%" }}>
                    <div className="input-group">
                        <div className="input-label">Day Start</div>
                        <input type="date" onChange={(e) => this.handleOnChange(e, "day_start")} value={this.state.day_start} className="input-text"></input>
                        <ValidationErr value={this.state.day_start} nameType={this.state.nameType} id={"day_start"} />
                    </div>
                    <div className="input-group">
                        <div className="input-label">Day End</div>
                        <input type="date" onChange={(e) => this.handleOnChange(e, "day_end")} value={this.state.day_end} className="input-text"></input>
                        <ValidationErr value={this.state.day_end} nameType={this.state.nameType} id={"day_end"} />
                    </div>
                    <div className="input-group">
                        <div className="input-label">Treatment Area</div>
                        <Select placeholder={this.state.quarantineName} options={[
                            ...this.state.quarantineAreas.map(quarantine => {
                                return (
                                    { value: quarantine.id, text: quarantine.name }
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

export default UpdateUserF1;