import React, { Component } from "react";
import { Table, Button, Segment, Header } from 'semantic-ui-react'
import axios from 'axios';
import { NavLink, Route } from "react-router-dom"
import { Modal } from "antd";
import DetailMedicalStaff from "../Details/DetailMedicalStaff";
import CreateMedicalStaff from "../Create/CreateMedicalStaff"


class ShowMedicalStaff extends Component {
    constructor() {
        super();
        this.state = {
            medicalstaffs: [],
            searchTerm: "",
            usernameCheck: "",

            idUser: null,
            isShowModalCreate: false,
            isModalDelete: false,
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/covid/medstf/show`)
            .then(res => {
                const medicalstaffs = res.data;
                this.setState({ medicalstaffs });

            })
            .catch(error => console.log(error));


    }
    handleDelete = (id) => {
        this.setState({ medicalstaffs: this.state.medicalstaffs.filter(medicalstaff => medicalstaff.id !== this.state.idUser) });
        axios.delete(`http://localhost:8080/covid/medstf/` + this.state.idUser)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error)
            })
            this.setState({
                isModalDelete: false
            })
    }
    handleChangeSearch = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    // Show modal Create
    showModalCreate = () => {
        this.setState({
            isShowModalCreate: true
        })
    }
    handleCancelCreate = () => {
        this.setState({
            isShowModalCreate: false
        })
    }
    callBackFunction = (data) => {
        this.setState({
            data: false
        })
        window.location.reload();
    }
    //Delete handle
    handleShowModalDelete = (id) => {
        this.setState({
            isModalDelete: true,
            idUser: id
        })

    }
    handleCancelDelete = () => {
        this.setState({
            isModalDelete: false,
        })
    }
    render() {
        const { match } = this.props;
        const isLogged = JSON.parse(localStorage.getItem("user"))
        let isDelete;
        if (isLogged.role == "admin") {
            isDelete = true
        } else {
            isDelete = false
        }
        return (
            <>
                <Modal title="" visible={this.state.isShowModalCreate} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelCreate}>
                    <CreateMedicalStaff parentCallback={this.callBackFunction} />
                </Modal>
                <Modal title="DELETE" visible={this.state.isModalDelete} onOk={this.handleDelete} onCancel={this.handleCancelDelete}>
                    <p>Are you sure ?</p>
                </Modal>
                <Header
                    as='h2'
                    content='MEDICAL STAFF'
                    subheader='Account'
                />
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    {
                        isDelete &&
                        <Button content='+ADD' onClick={this.showModalCreate} primary />
                    }
                    <div className="my-search">
                        <input className="my-search-input" onChange={this.handleChangeSearch} placeholder="Search name ..."></input>
                        <i class='bx bx-search'></i>
                    </div>
                </div>
                <Table celled singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Birthday</Table.HeaderCell>
                            <Table.HeaderCell>Medical Lisence</Table.HeaderCell>
                            <Table.HeaderCell>UserName</Table.HeaderCell>
                            <Table.HeaderCell>Password</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.medicalstaffs.filter(medicalstaff => {
                                if (this.state.searchTerm == "") {
                                    return medicalstaff
                                } else if (medicalstaff.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                    return medicalstaff
                                }
                            }).map((medicalstaff, index) => {
                                return (
                                    <Table.Row key={index}>
                                        {
                                            (isLogged.username == medicalstaff.username || isLogged.username == "admin") &&
                                            <>
                                                <Table.Cell singleLine>{medicalstaff.id}</Table.Cell>
                                                <Table.Cell>
                                                    {medicalstaff.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {medicalstaff.dob}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {medicalstaff.medical_lícense}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {medicalstaff.username}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {medicalstaff.password}
                                                </Table.Cell>
                                                <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                    {
                                                        (isLogged.username == medicalstaff.username || isLogged.username == "admin") &&
                                                        <>
                                                            <NavLink to={`${match.url}/${medicalstaff.id}`}>
                                                                <Button color='blue'>
                                                                    <i class='bx bxs-detail'></i>
                                                                </Button>
                                                            </NavLink>
                                                            <NavLink to={`/updatemedicalstaff/${medicalstaff.id}`}>
                                                                <Button color='orange'>
                                                                    <i class='bx bxs-pencil'></i>
                                                                </Button>
                                                            </NavLink>
                                                        </>
                                                    }
                                                    {isDelete &&
                                                        <Button onClick={() => this.handleShowModalDelete(medicalstaff.id)} color='red'>
                                                            <i class='bx bx-x'></i>
                                                        </Button>
                                                    }
                                                </Table.Cell>
                                            </>
                                        }
                                    </Table.Row>
                                )
                            })}

                    </Table.Body>
                    <Route path="/showmedicalstaff/:name" component={DetailMedicalStaff} />
                </Table>
            </>
        )
    }
}
export default ShowMedicalStaff;