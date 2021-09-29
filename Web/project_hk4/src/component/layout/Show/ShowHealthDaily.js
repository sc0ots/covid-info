import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import NotFoundPage from '../../main/NotFoundPage';
import classNames from 'classnames';
class ShowHealthDaily extends Component {
    constructor() {
        super();
        this.state = {
            healthDailys: [],
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
        axios.get("http://localhost:8080/covid/health_daily/show").then(res => {
            const healthDailys = res.data
            this.setState({
                healthDailys
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
        const currentArr = this.state.healthDailys.slice(indexOfFirstPost, indexOfLastPost)

        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.healthDailys.length / this.state.postsPerPage); i++) {
            pageNumbers.push(i)
        }

        let ArrMap;
        if (this.state.searchTerm == "") {
            ArrMap = [...currentArr]
        } else {
            ArrMap = [...this.state.healthDailys]
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
                        content='LIST HEALTH DAILY'
                        subheader='Manage health'
                    />
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <div className="my-search">
                            <input className="my-search-input" onChange={this.handleChangeSearch} placeholder="Search name ..."></input>
                            <i class='bx bx-search'></i>
                        </div>
                    </div>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Citizen ID</Table.HeaderCell>
                                <Table.HeaderCell>Phone</Table.HeaderCell>
                                <Table.HeaderCell>Is cough</Table.HeaderCell>
                                <Table.HeaderCell>Fever</Table.HeaderCell>
                                <Table.HeaderCell>Breath</Table.HeaderCell>
                                <Table.HeaderCell>Tired</Table.HeaderCell>
                                <Table.HeaderCell>Strong</Table.HeaderCell>
                                <Table.HeaderCell>Time Stamp</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                ArrMap.filter(healthDaily => {
                                    if (this.state.searchTerm == "") {
                                        return healthDaily
                                    } else if (healthDaily.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                        return healthDaily
                                    }
                                }).map((healthDaily, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell style={{ fontWeight: "bold"}}>{healthDaily.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold"}}>{healthDaily.user.name}</Table.Cell>
                                            <Table.Cell>{healthDaily.user.citizen_id}</Table.Cell>
                                            <Table.Cell>0{healthDaily.user.phone}</Table.Cell>
                                            <Table.Cell>{healthDaily.is_cough ? <div style={{color: "red", fontWeight: "bold"}}>Yes</div> : <div style={{color: "green", fontWeight: "bold"}}>No</div>}</Table.Cell>
                                            <Table.Cell>{healthDaily.is_fever ? <div style={{color: "red", fontWeight: "bold"}}>Yes</div> : <div style={{color: "green", fontWeight: "bold"}}>No</div>}</Table.Cell>
                                            <Table.Cell>{healthDaily.is_breath ? <div style={{color: "red", fontWeight: "bold"}}>Yes</div> : <div style={{color: "green", fontWeight: "bold"}}>No</div>}</Table.Cell>
                                            <Table.Cell>{healthDaily.is_tired ? <div style={{color: "red", fontWeight: "bold"}}>Yes</div> : <div style={{color: "green", fontWeight: "bold"}}>No</div>}</Table.Cell>
                                            <Table.Cell style={{background: ""}}>{healthDaily.is_strong ? <div style={{color: "green", fontWeight: "bold"}}>YES</div> : <div style={{color: "red", fontWeight: "bold"}}>NO</div>}</Table.Cell>
                                            <Table.Cell>{healthDaily.timestamp}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`/detailhealthdaily/${healthDaily.id}`}>
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

export default ShowHealthDaily;