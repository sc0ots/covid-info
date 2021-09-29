import React, { Component } from 'react'
import "../../../css/report.css"
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import axios from 'axios';

class ReportF0 extends Component {
    constructor() {
        super();
        this.pdfExportComponent = React.createRef();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            date: date,

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
            treatment_area_name: "",
            treatment_area_address: "",
        }
    }

       componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
        axios.get("http://localhost:8080/covid/user_f0s/" + id).then(res => {
            this.setState({
                id: res.data.id,
                user_id:res.data.user_id,
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
                treatment_area_name: res.data.treatment_area.name,
                treatment_area_address: res.data.treatment_area.address,
            })
        })
        axios.get("http://localhost:8080/covid/pcrs/getbyuserid/" + id).then(res => {
            console.log(res.data)
            this.setState({
                listPcrs: res.data
            })
        })
        axios.get("http://localhost:8080/covid/travel_histories/getbyuserid/" + id).then(res => {
            this.setState({
                listTravels: res.data
            })
        })
        axios.get("http://localhost:8080/covid/health_dcls/getbyuserid/" + id).then(res => {
            this.setState({
                is_travel: res.data.is_travel,
                is_fever: res.data.is_fever,
                is_cough: res.data.is_cough,
                is_nobreath: res.data.is_nobreath,
                is_pnue: res.data.is_pnue,
                is_throat: res.data.is_throat,
                is_tire: res.data.is_tire,
                is_contact_f0: res.data.is_contact_f0,
                is_contact_suspect: res.data.is_contact_suspect,
                have_chronic: res.data.have_chronic,
                have_heart_pressure: res.data.have_heart_pressure,
                have_hiv_immu: res.data.have_hiv_immu,
                have_transplant: res.data.have_transplant,
                have_diabetes: res.data.have_diabetes,
                have_cancer: res.data.have_cancer,
                have_prenant: res.data.have_prenant,
                time: res.data.time
            })
        })
        axios.get("http://localhost:8080/covid/health_daily/getbyuserid/" + id).then(res => {
            this.setState({
                is_fever: res.data.is_fever,
                is_cough: res.data.is_cough,
                is_nobreath: res.data.is_nobreath,
                is_tire: res.data.is_tire,
                timestamp: res.data.timestamp
            })
        })
    }

    handleExportWithComponent = (event) => {
        this.pdfExportComponent.current.save();
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
                                    <li className="content-item">Temp: {this.state.temp}C</li>
                                    <li className="content-item">Heart rate: {this.state.heart_rate}bpm</li>
                                    <li className="content-item">Tlc: {this.state.tlc}ml</li>
                                    <li className="content-item">Spo2: {this.state.spo2}%</li>
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Treatment Area</h3>
                                </div>
                                <ul className="content-list">
                                    <li className="content-item">Name treatment: {this.state.treatment_area_name}</li>
                                    <li className="content-item">Address: {this.state.treatment_area_address}</li>
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
