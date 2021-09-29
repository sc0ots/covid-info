import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Header } from 'semantic-ui-react'
import { NavLink } from "react-router-dom"
import "../../../css/search.css"
import NotFoundPage from "../../main/NotFoundPage";
import classNames from "classnames";
import { LogoutOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import FormDeleteUserF0 from "../Delete/FormDeleteUserF0"

class ShowUserF0 extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            listuserf0s: [],

            loading: false,
            currentPage: 1,
            postsPerPage: 7,

            idUser: null,
            isModalDelete: false,

        }
    }
    paginate = (e, pageNumber) => {
        e.preventDefault()
        this.setState({
            currentPage: pageNumber
        })
    }
    componentDidMount() {
        axios.get("http://localhost:8080/covid/user_f0s/show").then(res => {
            const listuserf0s = res.data;
            this.setState({ listuserf0s })
        })
    }
    handleChangeSearch = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    //Delete User f0 
    openModalDelete = (id) => {
        this.setState({
            isModalDelete: true,
            idUser: id
        })
    }
    handleCancelDelete = () => {
        this.setState({
            isModalDelete: false
        })
    }
    callbackFunctionDelete = (data) => {
        this.setState({
            isModalDelete: false
        })
        window.location.reload();
    }
    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentArr = this.state.listuserf0s.slice(indexOfFirstPost, indexOfLastPost)

        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listuserf0s.length / this.state.postsPerPage); i++) {
            pageNumbers.push(i)
        }

        const { match } = this.props;
        const isLogged = JSON.parse(localStorage.getItem("user"))

        let isShow;
        if (isLogged.role == "admin") {
            isShow = true;
        } else {
            isShow = false
        }

        let ArrMap;
        if (this.state.searchTerm == "") {
            ArrMap = [...currentArr]
        } else {
            ArrMap = [...this.state.listuserf0s]
        }


        if (isShow) {
            return (<NotFoundPage />)
        } else {
            return (
                <>
                    <Modal title="" visible={this.state.isModalDelete} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelDelete}>
                        <FormDeleteUserF0 parentCallback={this.callbackFunctionDelete} id={this.state.idUser} />
                    </Modal>
                    <Header
                        as='h2'
                        content='LIST PATIENT F0'
                        subheader='Manage patient'
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
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                <Table.HeaderCell>Yob</Table.HeaderCell>
                                <Table.HeaderCell>User Address</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                                <Table.HeaderCell>Temperature</Table.HeaderCell>
                                <Table.HeaderCell>Heart Rate</Table.HeaderCell>
                                <Table.HeaderCell>Tcl</Table.HeaderCell>
                                <Table.HeaderCell>Spo2</Table.HeaderCell>
                                <Table.HeaderCell>Treatment Area Name</Table.HeaderCell>
                                <Table.HeaderCell>Treatment Area Address</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                ArrMap.filter(listuser => {
                                    if (this.state.searchTerm == "") {
                                        return listuser
                                    } else if (listuser.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                        return listuser
                                    }
                                }).map((listuserf0, index) => {
                                    return (
                                        <Table.Row key={index} >
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listuserf0.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listuserf0.user.name}</Table.Cell>
                                            <Table.Cell>{listuserf0.user.citizen_id}</Table.Cell>
                                            <Table.Cell>{listuserf0.user.gender ? "Male" : "Female"}</Table.Cell>
                                            <Table.Cell>{listuserf0.user.yob}</Table.Cell>
                                            <Table.Cell>{listuserf0.user.address}</Table.Cell>
                                            <Table.Cell>0{listuserf0.user.phone}</Table.Cell>
                                            <Table.Cell error style={{ fontWeight: "bold" }}>{listuserf0.temp}C</Table.Cell>
                                            <Table.Cell error style={{ fontWeight: "bold" }}>{listuserf0.heart_rate}bpm</Table.Cell>
                                            <Table.Cell error style={{ fontWeight: "bold" }}>{listuserf0.tlc}ml</Table.Cell>
                                            <Table.Cell error style={{ fontWeight: "bold" }}>{listuserf0.spo2}%</Table.Cell>
                                            <Table.Cell>{listuserf0.treatment_area.name}</Table.Cell>
                                            <Table.Cell>{listuserf0.treatment_area.address}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`${match.url}/${listuserf0.id}`}>
                                                    <Button color='teal' compact={true}>
                                                        <i class='bx bxs-detail'></i>
                                                    </Button>
                                                </NavLink>
                                                <NavLink to={`/updateuserf0/${listuserf0.id}`}>
                                                    <Button color='orange' compact={true}>
                                                        <i class='bx bxs-pencil'></i>
                                                    </Button>
                                                </NavLink>
                                                <Button color='red' onClick={() => this.openModalDelete(listuserf0.id)} compact={true}>
                                                    <LogoutOutlined />
                                                </Button>
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
            )
        }

    }
}
export default ShowUserF0;