import React, { Component } from 'react'
import "../../../css/report.css"
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import axios from 'axios';

class ReportF0 extends Component {
    constructor(){
        super();
        this.pdfExportComponent = React.createRef();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
            is_travel: "",
            is_fever: "",
            is_cough: "",
            is_nobreath: "",
            is_pnue: "",
            is_throat: "",
            is_tire: "",
            is_contact_f0: "",
            is_contact_suspect: "",
            have_chronic: "",
            have_heart_pressure: "",
            have_hiv_immu: "",
            have_transplant: "",
            have_diabetes: "",
            have_cancer: "",
            have_prenant: "",
            time: ""
        }
    }

    handleExportWithComponent = (event) => {
        this.pdfExportComponent.current.save();
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get("http://localhost:8080/covid/health_dcls/" + id).then(res => {
            console.log(res.data.time)
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
    }

    render() {
        // console.log(this.state.time)
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
                                    <li className="content-item">Is Travel: {this.state.is_travel ? "Yes" : "No"}</li>
                                    <li className="content-item">Is Fever: {this.state.is_fever ? "Yes" : "No"}</li>
                                    <li className="content-item">Is Cough: {this.state.is_cough ? "Yes" : "No"}</li>
                                    <li className="content-item">Is Nobreath: {this.state.is_nobreath? "Yes" : "No"}</li>
                                    <li className="content-item">Is Pnue: {this.state.is_pnue ? "Yes" : "No"}</li>
                                    <li className="content-item">Is Throat: {this.state.is_throat? "Yes" : "No"}</li>
                                    <li className="content-item">Is Tire: {this.state.is_tire ? "Yes" : "No"}</li>
                                    <li className="content-item">Is contact f0: {this.state.is_contact_f0 ? "Yes" : "No"}</li>
                                    <li className="content-item">Is contact suspect: {this.state.is_contact_suspect? "Yes" : "No"}</li>
                                    <li className="content-item">Have chronic: {this.state.have_chronic ? "Yes" : "No"}</li>
                                    <li className="content-item">Have heart pressure: {this.state.have_heart_pressure ? "Yes" : "No"}</li>
                                    <li className="content-item">Have hiv immu: {this.state.have_hiv_immu ? "Yes" : "No"}</li>
                                    <li className="content-item">Have transplant: {this.state.have_transplant ? "Yes" : "No"}</li>
                                    <li className="content-item">Have diabetes: {this.state.have_diabetes ? "Yes" : "No"}</li>
                                    <li className="content-item">Have cancer: {this.state.have_cancer ? "Yes" : "No"}</li>
                                    <li className="content-item">Have prenant: {this.state.have_prenant ? "Yes" : "No"}</li>
                                    <li className="content-item">Time: {this.state.time}</li>
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
