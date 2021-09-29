import React, { Component } from 'react';
import { Select, Header } from 'semantic-ui-react'
import "../../../css/form.css"
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

class Vaccine1 extends Component {
    constructor(){
        super();
        this.state = {
            vac1: "",
            date1: "",
        }
    }
    handleChangeSelect = (e,data) => {
        this.setState({
            vac1: data.value
        })
    }

    handleChange = (e) => {
        this.setState({
            date1: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.id
        axios.put(`http://localhost:8080/covid/users/vac1/${id}`, this.state).then(res => {
            if (res.status == 200) {
               message.success("Success")
               this.props.parentCallback(false)
            }else{
                message.error("Error")
            }
            console.log(res);
        })
    }

    render() {
        return (
            <>
                <Header
                    as='h2'
                    content='VACCINE I'
                    subheader=''
                />
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <div className="input-label">Type Vaccine</div>
                        <Select placeholder='Vaccine'
                            onChange={this.handleChangeSelectStatus}
                            options={[{ value: "Astrazeneca", text: 'Astrazeneca' },
                            { value: "Mordena", text: 'Mordena' },
                            { value: "Pfizer", text: 'Pfizer' }]} 
                            onChange={this.handleChangeSelect} />
                    </div>
                    <div className="input-group">
                        <div className="input-label">Date</div>
                        <input type="date" className="input-text" placeholder="Input name" onChange={this.handleChange}></input>
                    </div>
                    <button type='submit' disabled={false} className="btn-submit">Submit</button>
                </form>
            </>

        );
    }
}

export default Vaccine1;