import React, { Component } from "react";
import axios from "axios";
import "../../../css/form.css"
import { Select } from 'semantic-ui-react'

const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', text: 'Australia' },
    { key: 'at', value: 'at', text: 'Austria' },
    { key: 'az', value: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', text: 'Benin' },
  ]
class CreateAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    render() {
        return (
            <div className="form">
                <form>
                    <div className="input-group">
                        <div className="input-label">Name</div>
                        <input type="text" className="input-text" placeholder="Input name"></input>
                    </div>
                    <div className="input-group">
                        <div className="input-label">Date Time</div>
                        <input type="date" className="input-text" placeholder="Input name"></input>
                    </div>
                    <div className="input-group">
                        <div className="input-label">Gender</div>
                        <Select placeholder='Select your country' options={countryOptions} />
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateAdmin;