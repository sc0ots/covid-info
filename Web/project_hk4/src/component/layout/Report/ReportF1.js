import React, { Component } from 'react'
import "../../../css/report.css"
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import axios from 'axios';
import { date } from 'yup/lib/locale';

class ReportF1 extends Component {
    constructor(){
        super();
        this.pdfExportComponent = React.createRef();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            date: date,
            id: "",
            user_id:"",
            name: "",
            citizen_id: "",
            gender: "",
            yob: "",
            address: "",
            phone: "",
            status: "",
            day_start: "",
            day_end: "",
            area_id: "",
            quarantine_area_name: "",
            quarantine_area_address: ""
        }
    }
    componentDidMount(){
        const {match} = this.props;
        console.log(match)
        const id = match.params.id;
        axios.get("http://localhost:8080/covid/user_f1s/" + id).then(res =>{
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
                day_start: res.data.day_start,
                day_end: res.data.day_end,
                area_id: res.data.area_id,
                quarantine_area_name: res.data.quarantine_area.name,
                quarantine_area_address: res.data.quarantine_area.address
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
                                    <li className="content-item">Gender: {this.state.gender  ? "Male" : "Female"}</li>
                                    <li className="content-item">Year of Birth: {this.state.yob}</li>
                                    <li className="content-item">Address: {this.state.address}</li>
                                    <li className="content-item">Phone: {this.state.phone}</li>
                                    <li className="content-item">Status: {result}</li>
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Quarantine period</h3>
                                </div>
                                <ul className="content-list">
                                    <li className="content-item">Day start: {this.state.day_start}</li>
                                    <li className="content-item">Day End: {this.state.day_end}</li>
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Quarantine Area</h3>
                                </div>
                                <ul className="content-list">
                                    <li className="content-item">Name quarantine: {this.state.quarantine_area_name}</li>
                                    <li className="content-item">Address: {this.state.quarantine_area_address}</li>
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

export default ReportF1
