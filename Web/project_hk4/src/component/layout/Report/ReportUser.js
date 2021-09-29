import React, { Component } from 'react'
import "../../../css/report.css"
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import axios from 'axios';




class ReportUser extends Component {
    constructor() {
        super();
        this.pdfExportComponent = React.createRef();
        var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

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
            vac_status: "",
            vac1: "",
            date1: "",
            vac2: "",
            date2: "",

            listPcrs: [],
            listTravels: [],

            listHealthDcls: [],
            listHealthDailys: []


        }
    }
    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
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
                vac_status: res.data.vac_status,
                vac1: res.data.vac1,
                date1: res.data.date1,
                vac2: res.data.vac2,
                date2: res.data.date2,
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
                listHealthDcls: res.data

            })
        })
        axios.get("http://localhost:8080/covid/health_daily/getbyuserid/" + id).then(res => {
            this.setState({
                listHealthDailys: res.data

            })
        })
    }


    handleExportWithComponent = (event) => {
        this.pdfExportComponent.current.save();
    }


    render() {
        console.log(this.state.listPcrs)
        let status;
        if(this.state.status == 0){
            status = "Normal"
        }else if(this.state.status == 1){
            status = "F1"
        }else{
            status = "F2"
        }
        let statusVaccine;
        if(this.state.vac_status == 0){
            statusVaccine = "Not Injected"
        }else if(this.state.vac_status == 1){
            statusVaccine = "Injected 1"
        }else{
            statusVaccine = "Injected 2"
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
                                    <li className="content-item">Status: {status}</li>
                                    <li className="content-item">Status Vaccine: {statusVaccine}</li>
                                    <li className="content-item">Vaccine I: {this.state.vac1} / Date: {this.state.date1}</li>
                                    <li className="content-item">Vaccine II: {this.state.vac2} / Date: {this.state.date2}</li>

                                   
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">List Pcrs</h3>
                                </div>
                                <ul className="content-list">
                                    {
                                        this.state.listPcrs.map((listPcr, index) => {
                                            return (
                                                <li className="content-item">Result: {listPcr.result} / Time: {listPcr.time} </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Travel History</h3>
                                </div>
                                <ul className="content-list">
                                    {
                                        this.state.listTravels.map((listTravel, index) => {
                                            return (
                                                <li className="content-item">Address: {listTravel.address} / Date: {listTravel.date} </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Health Daily</h3>
                                </div>
                                <ul className="content-list">
                                    {
                                        this.state.listHealthDailys.map((listHealthDaily, index) => {
                                            return (
                                                <li className="content-item">Time: {listHealthDaily.timestamp} / Cough:{listHealthDaily.is_cough ? "Yes" : "No"} / Fever: {listHealthDaily.is_fever ? "Yes" : "No"} / Short Breath: {listHealthDaily.is_breath ? "Yes" : "No"} / Tired: {listHealthDaily.is_tired ? "Yes" : "No"} / Strong:{listHealthDaily.is_strong ? "Yes" : "No"} </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="content-block">
                                <div className="content-row">
                                    <h3 className="heading-h3">Health Declaration</h3>
                                </div>
                                <ul className="content-list">
                                    {
                                        this.state.listHealthDcls.map((listHealthDcl, index) => {
                                            return (
                                                <li className="content-item">Time: {listHealthDcl.time} / Cough:{listHealthDcl.is_cough ? "Yes" : "No"} / Fever: {listHealthDcl.is_fever ? "Yes" : "No"}/ Travel: {listHealthDcl.is_travel ? "Yes" : "No"} / Short Breath: {listHealthDcl.is_breath ? "Yes" : "No"} / Tired: {listHealthDcl.is_tired ? "Yes" : "No"}/ Pneumonia: {listHealthDcl.is_pnue ? "Yes" : "No"} / Throat:{listHealthDcl.is_throat ? "Yes" : "No"} / Contact: {listHealthDcl.is_contact_f0 ? "Yes" : "No"} / Suspect: {listHealthDcl.is_contact_suspect ? "Yes" : "No"} / Chronic: {listHealthDcl.have_chronic ? "Yes" : "No"} / Heart/Pressure: {listHealthDcl.have_heart_pressure ? "Yes" : "No"} / Hiv/Immu: {listHealthDcl.have_hiv_immu ? "Yes" : "No"} / Transplant: {listHealthDcl.have_transplant ? "Yes" : "No"} / Diabetes: {listHealthDcl.have_diabetes ? "Yes" : "No"} / Cancer: {listHealthDcl.have_cancer ? "Yes" : "No"} / Pregnant: {listHealthDcl.have_prenant ? "Yes" : "No"}</li>
                                            )
                                        })
                                    }
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

export default ReportUser
