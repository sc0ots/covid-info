import React, { Component } from 'react'
import "../../../css/report.css"
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import axios from 'axios';

class ReportF0 extends Component {
    constructor() {
        super();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.pdfExportComponent = React.createRef();
        this.state = {
            date: date,
            id: "",
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
            is_fever: "",
            is_cough: "",
            is_nobreath: "",
            is_tire: "",
            is_strong: "",
            timestamp: ""
        }
    }

    handleExportWithComponent = (event) => {
        this.pdfExportComponent.current.save();
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/health_daily/" + id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.user.name,
                citizen_id: res.data.user.citizen_id,
                gender: res.data.user.gender,
                yob: res.data.user.yob,
                address: res.data.user.address,
                phone: res.data.user.phone,
                status: res.data.user.status,
                is_travel: res.data.is_travel,
                is_fever: res.data.is_fever,
                is_cough: res.data.is_cough,
                is_nobreath: res.data.is_nobreath,
                is_tire: res.data.is_tire,
                timestamp: res.data.timestamp
            })
        })
    }

    render() {
        let result;
        if (this.state.status === 0) {
            result = "Normal"
          
        } else if (this.state.status === 1) {
            result = "F1"
          
        } else {
            result = "F0"
        }
        return (
            <>
                <div className="report">
                    <PDFExport ref={this.pdfExportComponent} paperSize="A4">
                        <div className="report-content">
                            <div className="heading-wrapper">
                                <div className="report-heading">Covid Info</div>
                                <p>Time: {this.state.date}</p>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Patient info</h3>
                                </div>
                                <ul className="content-list">
                                    <li className="content-item">Patient Name: {this.state.name}</li>
                                    <li className="content-item">Citizen ID: {this.state.citizen_id}</li>
                                    <li className="content-item">Gender: {this.state.gender ? "Male" : "Female"}</li>
                                    <li className="content-item">Year of Birth: {this.state.yob}</li>
                                    <li className="content-item">Address: {this.state.address}</li>
                                    <li className="content-item">Phone: {this.state.phone}</li>
                                    <li className="content-item">Status: {result}</li>
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Health condition</h3>
                                </div>
                                <ul className="content-list">
                                    <li className="content-item">Is Fever: {this.state.is_fever ? "Yes" : "No"}</li>
                                    <li className="content-item">Is cough: {this.state.is_cough ? "Yes" : "No"}</li>
                                    <li className="content-item">Is nobreath: {this.state.is_nobreath ? "Yes" : "No"}</li>
                                    <li className="content-item">Is strong: {this.state.is_strong ? "Yes" : "No"}</li>
                                    <li className="content-item">Is tire: {this.state.is_tire ? "Yes" : "No"}</li>
                                    <li className="content-item">Timestamp: {this.state.timestamp ? "Yes" : "No"}</li>
                                </ul>
                            </div>
                        </div>
                    </PDFExport>
                    <div className="button-area">
                        <button onClick={this.handleExportWithComponent}>Export to PDF</button>
                    </div>
                </div>
            </>
        )
    }

}

export default ReportF0
