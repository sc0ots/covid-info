import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, Header, Label } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import NotFoundPage from '../../main/NotFoundPage';
import classNames from 'classnames';
class ShowAllPcrTest extends Component {
    constructor() {
        super();
        this.state = {
            listPcrTests: [],
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
        axios.get("http://localhost:8080/covid/pcrs/show").then(res => {
            const listPcrTests = res.data
            this.setState({
                listPcrTests
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
        const currentArr = this.state.listPcrTests.slice(indexOfFirstPost, indexOfLastPost)

        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listPcrTests.length / this.state.postsPerPage); i++) {
            pageNumbers.push(i)
        }

        let ArrMap;
        if (this.state.searchTerm == "") {
            ArrMap = [...currentArr]
        } else {
            ArrMap = [...this.state.listPcrTests]
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
                        content='LIST ALL PCR TEST USER'
                        subheader='Manage pcr'
                    />
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <div className="my-search">
                            <input className="my-search-input" onChange={this.handleChangeSearch} placeholder="Search name ..."></input>
                            <i class='bx bx-search'></i>
                        </div>
                    </div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Citizen ID</Table.HeaderCell>
                                <Table.HeaderCell>Phone</Table.HeaderCell>
                                <Table.HeaderCell>Result Test</Table.HeaderCell>
                                <Table.HeaderCell>Time</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                 ArrMap.filter(listPcrTest => {
                                    if (this.state.searchTerm == "") {
                                        return listPcrTest
                                    } else if (listPcrTest.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                        return listPcrTest
                                    }
                                }).map((listPcrTest, index) => {
                                    let result1 = "";
                                    if (listPcrTest.result == "NEGATIVE") {
                                        result1 = "rgba(63,219,240, 0.1)";
                                    } 
                                    else {
                                        result1 = "rgba(219,40,40, 0.4)"
                                    }
                                    let resultPcr;
                                    if (listPcrTest.result == "NEGATIVE") {
                                        resultPcr = <Label color="green">NEGATIVE</Label>;
                                    } 
                                    else {
                                        resultPcr = <Label color="red">POSITIVE</Label>;
                                    }
                                    return (
                                        <Table.Row key={index} style={{background:result1  }}>
                                            <Table.Cell style={{ fontWeight: "bold"}}>{listPcrTest.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold"}}>{listPcrTest.user.name}</Table.Cell>
                                            <Table.Cell>{listPcrTest.user.citizen_id}</Table.Cell>
                                            <Table.Cell>0{listPcrTest.user.phone}</Table.Cell>
                                            <Table.Cell>{resultPcr}</Table.Cell>
                                            <Table.Cell>{listPcrTest.time}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`/detailpcrtest/${listPcrTest.id}`}>
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

export default ShowAllPcrTest;