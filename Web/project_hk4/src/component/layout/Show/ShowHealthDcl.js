import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import NotFoundPage from '../../main/NotFoundPage';
import classNames from 'classnames';
class ShowTravelHistory extends Component {
    constructor() {
        super();
        this.state = {
            healthDcls: [],
            searchTerm: "",

            loading: false,
            currentPage: 1,
            postsPerPage: 8,

        }
    }
    paginate = (e, pageNumber) => {
        e.preventDefault()
        this.setState({
            currentPage: pageNumber
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8080/covid/health_dcls/show").then(res => {
            const healthDcls = res.data
            this.setState({
                healthDcls
            })
        })
    }
    handleChangeSearch = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentArr = this.state.healthDcls.slice(indexOfFirstPost, indexOfLastPost)

        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.healthDcls.length / this.state.postsPerPage); i++) {
            pageNumbers.push(i)
        }

        let ArrMap;
        if (this.state.searchTerm == "") {
            ArrMap = [...currentArr]
        } else {
            ArrMap = [...this.state.healthDcls]
        }


        const isLogged = JSON.parse(localStorage.getItem("user"))
        let isShow;
        if (isLogged.role == "admin") {
            isShow = true;
        } else {
            isShow = false
        }
        if (isShow) {
            return (<NotFoundPage />)
        } else {
            return (
                <>
                    <Header
                        as='h1'
                        content='LIST HEALTH DECLARATION'
                        subheader='Manage health'
                    />
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <div className="my-search">
                            <input className="my-search-input" onChange={this.handleChangeSearch} placeholder="Search name ..."></input>
                            <i class='bx bx-search'></i>
                        </div>
                    </div>
                    <Table celled selectable collapsing  columns={20} compact={true}>
                        <Table.Header style={{ width: "10px", whiteSpace: "wrap" }}>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Travel</Table.HeaderCell>
                                <Table.HeaderCell>Fever</Table.HeaderCell>
                                <Table.HeaderCell>Cough</Table.HeaderCell>
                                <Table.HeaderCell>Short Breath</Table.HeaderCell>
                                <Table.HeaderCell>Pneumonia</Table.HeaderCell>
                                <Table.HeaderCell>Throat</Table.HeaderCell>
                                <Table.HeaderCell>Tired</Table.HeaderCell>
                                <Table.HeaderCell>Contact</Table.HeaderCell>
                                <Table.HeaderCell>Suspect</Table.HeaderCell>
                                <Table.HeaderCell>Chronic</Table.HeaderCell>
                                <Table.HeaderCell>Heart/Pressure</Table.HeaderCell>
                                <Table.HeaderCell>Hiv/Immu</Table.HeaderCell>
                                <Table.HeaderCell>Transplant</Table.HeaderCell>
                                <Table.HeaderCell>Diabetes</Table.HeaderCell>
                                <Table.HeaderCell>Cancer</Table.HeaderCell>
                                <Table.HeaderCell>Pregnant</Table.HeaderCell>
                                <Table.HeaderCell>Time</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                ArrMap.filter(healthDcl => {
                                    if (this.state.searchTerm == "") {
                                        return healthDcl
                                    } else if (healthDcl.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                        return healthDcl
                                    }
                                }).map((healthDcl, index) => {
                                    let is_travel;
                                    if (healthDcl.is_travel == true) {
                                        is_travel = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_travel = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_fever;
                                    if (healthDcl.is_fever) {
                                        is_fever = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_fever = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_cough;
                                    if (healthDcl.is_cough) {
                                        is_cough = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_cough = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_nobreath;
                                    if (healthDcl.is_nobreath) {
                                        is_nobreath = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_nobreath = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_pnue;
                                    if (healthDcl.is_pnue) {
                                        is_pnue = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_pnue = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_throat;
                                    if (healthDcl.is_throat) {
                                        is_throat = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_throat = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_tire;
                                    if (healthDcl.is_tire) {
                                        is_tire = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_tire = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_contact_f0;
                                    if (healthDcl.is_contact_f0) {
                                        is_contact_f0 = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_contact_f0 = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let is_contact_suspect;
                                    if (healthDcl.is_contact_suspect) {
                                        is_contact_suspect = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        is_contact_suspect = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let have_chronic;
                                    if (healthDcl.have_chronic) {
                                        have_chronic = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        have_chronic = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let have_heart_pressure;
                                    if (healthDcl.have_heart_pressure) {
                                        have_heart_pressure = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        have_heart_pressure = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let have_hiv_immu;
                                    if (healthDcl.have_hiv_immu) {
                                        have_hiv_immu = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        have_hiv_immu = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let have_transplant;
                                    if (healthDcl.have_transplant) {
                                        have_transplant = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        have_transplant = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let have_diabetes;
                                    if (healthDcl.have_diabetes) {
                                        have_diabetes = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        have_diabetes = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let have_cancer;
                                    if (healthDcl.have_cancer) {
                                        have_cancer = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        have_cancer = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    let have_prenant;
                                    if (healthDcl.have_prenant) {
                                        have_prenant = <div style={{color: "red", fontWeight: "bold"}}>Yes</div>
                                    } else {
                                        have_prenant = <div style={{color: "green", fontWeight: "bold"}}>No</div>
                                    }
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell style={{ fontWeight: "bold"}}>{healthDcl.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold"}}>{healthDcl.user.name}</Table.Cell>
                                            <Table.Cell>{is_travel}</Table.Cell>
                                            <Table.Cell>{is_fever}</Table.Cell>
                                            <Table.Cell>{is_cough}</Table.Cell>
                                            <Table.Cell>{is_nobreath}</Table.Cell>
                                            <Table.Cell>{is_pnue}</Table.Cell>
                                            <Table.Cell>{is_throat}</Table.Cell>
                                            <Table.Cell>{is_tire}</Table.Cell>
                                            <Table.Cell>{is_contact_f0}</Table.Cell>
                                            <Table.Cell>{is_contact_suspect}</Table.Cell>
                                            <Table.Cell>{have_chronic}</Table.Cell>
                                            <Table.Cell>{have_heart_pressure}</Table.Cell>
                                            <Table.Cell>{have_hiv_immu}</Table.Cell>
                                            <Table.Cell>{have_transplant}</Table.Cell>
                                            <Table.Cell>{have_diabetes}</Table.Cell>
                                            <Table.Cell>{have_cancer}</Table.Cell>
                                            <Table.Cell>{have_prenant}</Table.Cell>
                                            <Table.Cell >{healthDcl.time}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`/detailhealthdcl/${healthDcl.id}`}>
                                                    <Button color="teal">
                                                        <i class='bx bxs-detail'></i>
                                                    </Button>
                                                </NavLink>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }

                        </Table.Body>
                    </Table>
                    <ul className="panigation-list">
                        {
                            pageNumbers.map((pageNumber, index) => {
                                return (
                                    <li key={index} className={classNames("panigation-item", { "panigation-active": this.state.currentPage == pageNumber })} onClick={(e) => this.paginate(e, pageNumber)}>
                                        <p className="panigation-item-p">
                                            {pageNumber}
                                        </p>
                                    </li>

                                )
                            })
                        }
                    </ul>
                </>
            );
        }

    }
}

export default ShowTravelHistory;