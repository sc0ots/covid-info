import React, { Component } from "react";
import { Table, Button, Header } from 'semantic-ui-react'
import axios from 'axios';
import { NavLink } from "react-router-dom";
import NotFoundPage from "../../main/NotFoundPage";
import "../../../css/search.css"
import { message, Modal } from 'antd';
import CreateTreatment from "../Create/CreateTreatment"

class ShowTreatment extends Component {
    constructor() {
        super();
        this.state = {
            listtreatments: [],
            searchTerm: "",

            idUser: null,
            isShowModalCreate: false,
            isModalDelete: false,

        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/covid/treatmentarea/show`)
            .then(res => {
                const listtreatments = res.data;
                this.setState({ listtreatments });
            })
            .catch(error => console.log(error));
    }
    handleDeleteTreatment = (id) => {
        this.setState({ listtreatments: this.state.listtreatments.filter((listtreatment) => listtreatment.id !== this.state.idUser) })
        axios.delete("http://localhost:8080/covid/treatmentarea/" + this.state.idUser).then(response => {
            if (response.status == 200) {
                message.success("Success")
            } else {
                message.error("Error")
            }
        })
        this.setState({
            isModalDelete: false,
        })
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
    handleChangeSearch = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    // Show Modal Create
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


    render() {
        const { listtreatments } = this.state;
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
                    <Modal title="" visible={this.state.isShowModalCreate} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelCreate}>
                        <CreateTreatment parentCallback={this.callBackFunction} />
                    </Modal>

                    <Modal title="DELETE" visible={this.state.isModalDelete} onOk={this.handleDeleteTreatment} onCancel={this.handleCancelDelete}>
                        <p>Are you sure</p>
                    </Modal>
                    <Header
                        as='h2'
                        content='LIST TREATMENT AREA'
                        subheader='Manage treatment'
                    />
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <Button content='+ADD' onClick={this.showModalCreate} primary />
                        <div className="my-search">
                            <input className="my-search-input" onChange={this.handleChangeSearch} placeholder="Search name ..."></input>
                            <i class='bx bx-search'></i>
                        </div>
                    </div>
                    <Table celled singleLine selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell >Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                listtreatments.filter(listtreatment => {
                                    if (this.state.searchTerm == "") {
                                        return listtreatment
                                    } else if (listtreatment.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                        return listtreatment
                                    }
                                }).map((listtreatment, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px", fontWeight: "bold" }}>{listtreatment.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listtreatment.name}</Table.Cell>
                                            <Table.Cell>{listtreatment.address}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`/detailtreatment/${listtreatment.id}`}>
                                                    <Button color='teal' compact={true}>
                                                        <i class='bx bxs-detail'></i>
                                                    </Button>
                                                </NavLink>
                                                <NavLink to={`/updatetreatment/${listtreatment.id}`}>
                                                    <Button color='orange' compact={true}>
                                                        <i class='bx bxs-pencil'></i>
                                                    </Button>
                                                </NavLink>
                                                <Button color='red' onClick={() => this.handleShowModalDelete(listtreatment.id)} compact={true}>
                                                    <i class='bx bx-x'></i>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </>
            )
        }
    }
}
export default ShowTreatment;