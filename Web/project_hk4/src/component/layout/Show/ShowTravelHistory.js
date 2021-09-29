import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, Header, Label, Select } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import NotFoundPage from '../../main/NotFoundPage';
import classNames from 'classnames';

class ShowTravelHistory extends Component {
    constructor() {
        super();
        this.state = {
            listTravels: [],
            searchTerm: "",
            valueSelect: "",


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
        axios.get("http://localhost:8080/covid/travel_histories/show").then(res => {
            const listTravels = res.data
            this.setState({
                listTravels
            })
        })
    }
    handleChangeSearch = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    handleChangeSelect = (e, data) => {
        this.setState({
            valueSelect: data.value
        })
    }
    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentArr = this.state.listTravels.slice(indexOfFirstPost, indexOfLastPost)

        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listTravels.length / this.state.postsPerPage); i++) {
            pageNumbers.push(i)
        }

        let ArrMap;
        if (this.state.searchTerm == "") {
            ArrMap = [...currentArr]
        } else {
            ArrMap = [...this.state.listTravels]
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
                        content='LIST TRAVEL HISTORY'
                        subheader='Manage Travel History'
                    />
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        {/* <NavLink to="/createuser">
                            <Button content='Create new user' primary />
                        </NavLink> */}
                        <div className="my-search">
                            <input className="my-search-input" onChange={this.handleChangeSearch} placeholder="Search name ..."></input>
                            <i class='bx bx-search'></i>
                        </div>
                        <Select placeholder='Filter status' onChange={this.handleChangeSelect} options={[
                            { value: "", text: 'Show all' },
                            { value: "0", text: 'Normal' },
                            { value: 1, text: 'F1' },
                            { value: 2, text: 'F0' }]} style={{ marginLeft: "4px" }} />
                    </div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Citizen ID</Table.HeaderCell>
                                <Table.HeaderCell>Phone</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Travel History</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                ArrMap.filter(listTravel => {
                                    var isIncludes = listTravel.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
                                    var isSelect = listTravel.user.status == this.state.valueSelect

                                    if (this.state.searchTerm == "" && this.state.valueSelect == "") {
                                        return listTravel
                                    } else if ((this.state.searchTerm == "" && this.state.valueSelect != "" && isSelect) || (this.state.searchTerm != "" && this.state.valueSelect == "" && isIncludes) || (this.state.searchTerm != "" && this.state.valueSelect != "" && isIncludes && isSelect)) {
                                        return listTravel
                                    }
                                  
                                }).map((listTravel, index) => {
                                    let status;
                                    let result1 = "";
                                    if (listTravel.user.status === 0) {
                                        status = <Label as='a' color="teal">Normal</Label>
                                        result1 = "rgba(63,219,240, 0.1)";
                                    } else if (listTravel.user.status === 1) {
                                        status = <Label as='a' color='orange' >F 1</Label>
                                        result1 = "rgba(225,133,27, 0.2)";
                                    } else {
                                        status = <Label as='a' color='red' >F 0</Label>
                                        result1 = "rgba(219,40,40, 0.4)"
                                    }
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listTravel.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listTravel.user.name}</Table.Cell>
                                            <Table.Cell>{listTravel.user.citizen_id}</Table.Cell>
                                            <Table.Cell>{listTravel.user.phone}</Table.Cell>
                                            <Table.Cell>{status}</Table.Cell>
                                            <Table.Cell>{listTravel.address}</Table.Cell>
                                            <Table.Cell style={{ color: "green", fontWeight: "bold" }}>{listTravel.date}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`/detailtravelhistory/${listTravel.id}`}>
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