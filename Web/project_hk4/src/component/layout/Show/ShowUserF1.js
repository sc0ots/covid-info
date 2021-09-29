import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Header } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import NotFoundPage from "../../main/NotFoundPage";
import "../../../css/search.css"
import { message } from "antd";
import classNames from "classnames";
import { Modal } from 'antd';


class ShowUserF1 extends Component {
    constructor() {
        super();
        this.state = {
            listuserf1s: [],
            searchTerm: "",
            errorMessage: false,

            loading: false,
            currentPage: 1,
            postsPerPage: 8,

            idUser: null,
            isModalDelete: false,
            isModalDeleteOverDou: false,
        }
    }


    // Modal Delete User
    showModalDelete = (id) => {
        this.setState({
            isModalDelete: true,
            idUser: id
        })
    }
    handleCancelDelete = () => {
        this.setState({
            isModalDelete: false,
        });
    }
    //Model Delete Overdou
    showModalDeleteOverDou = ()=>{
        this.setState({
            isModalDeleteOverDou: true,
        })
    }
    handleCancelDeleteOverDou = () => {
        this.setState({
            isModalDeleteOverDou: false,
        })
    }
    paginate = (e, pageNumber) => {
        e.preventDefault()
        this.setState({
            currentPage: pageNumber
        })
    }
    componentDidMount() {
        axios.get("http://localhost:8080/covid/user_f1s/show").then(res => {
            const listuserf1s = res.data
            this.setState({ listuserf1s })
        })
    }
    handleChangeSearch = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    handleDelete = () => {
            this.setState({ listuserf1s: this.state.listuserf1s.filter(listuserf1 => listuserf1.id !== this.state.idUser) });
            axios.delete(`http://localhost:8080/covid/user_f1s/` + this.state.idUser)
                .then((res) => {
                    if(res.status == 200){
                        message.success("Success")
                    }else{
                        message.error("Error")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            this.setState({
                isModalDelete: false,
            })
    }
    handleDeleteOverDou = () => {
            axios.get("http://localhost:8080/covid/user_f1s/deleteoverdue").then(res => {
                if (res.status !== 200) {
                    message.error("Không có user nào quá hạn")
                }
            })
            window.location.reload();
            this.setState({
                isModalDeleteOverDou: false,
            })
    }
    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentArr = this.state.listuserf1s.slice(indexOfFirstPost, indexOfLastPost)

        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listuserf1s.length / this.state.postsPerPage); i++) {
            pageNumbers.push(i)
        }

        let ArrMap;
        if (this.state.searchTerm == "") {
            ArrMap = [...currentArr]
        } else {
            ArrMap = [...this.state.listuserf1s]
        }

        const { listuserf1s } = this.state;
        const { match } = this.props;
        const isLogged = JSON.parse(localStorage.getItem("user"))
        let isShow;
        if (isLogged.role == "admin") {
            isShow = true;
        } else {
            isShow = false
        }

        if (isShow) {
            return (
                <NotFoundPage />
            )
        } else {
            return (
                <>
                    <Modal title="DELETE" visible={this.state.isModalDelete} onOk={this.handleDelete} onCancel={this.handleCancelDelete}>
                        <p>Are you sure</p>
                    </Modal>
                    <Modal title="DELETE" visible={this.state.isModalDeleteOverDou} onOk={this.handleDeleteOverDou} onCancel={this.handleCancelDeleteOverDou}>
                        <p>Are you sure</p>
                    </Modal>
                    <Header
                        as='h2'
                        content='LIST USER F1'
                        subheader='Manage user f1'
                    />
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <div className="my-search">
                            <input className="my-search-input" onChange={this.handleChangeSearch} placeholder="Search name ..."></input>
                            <i class='bx bx-search'></i>
                        </div>
                        <Button content='Delete overdue quarantine' onClick={this.showModalDeleteOverDou} style={{ marginLeft: "4px" }} />
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
                                <Table.HeaderCell>Day Start</Table.HeaderCell>
                                <Table.HeaderCell>Day End</Table.HeaderCell>
                                <Table.HeaderCell>Quarantine Area Name</Table.HeaderCell>
                                <Table.HeaderCell>Quarantine Area Address</Table.HeaderCell>
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
                                }).map((listuserf1, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listuserf1.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listuserf1.user.name}</Table.Cell>
                                            <Table.Cell>{listuserf1.user.citizen_id}</Table.Cell>
                                            <Table.Cell>{listuserf1.user.gender ? " Male" : "Female"}</Table.Cell>
                                            <Table.Cell>{listuserf1.user.yob}</Table.Cell>
                                            <Table.Cell>{listuserf1.user.address}</Table.Cell>
                                            <Table.Cell>0{listuserf1.user.phone}</Table.Cell>
                                            <Table.Cell positive style={{ fontWeight: "bold" }}>{listuserf1.day_start}</Table.Cell>
                                            <Table.Cell error style={{ fontWeight: "bold" }}>{listuserf1.day_end}</Table.Cell>
                                            <Table.Cell>{listuserf1.quarantine_area.name}</Table.Cell>
                                            <Table.Cell>{listuserf1.quarantine_area.address}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`${match.url}/${listuserf1.id}`}>
                                                    <Button color='teal' compact={true}>
                                                        <i class='bx bxs-detail'></i>
                                                    </Button>
                                                </NavLink>
                                                <NavLink to={`/updateuserf1/${listuserf1.id}`}>
                                                    <Button color='orange' compact={true}>
                                                        <i class='bx bxs-pencil'></i>
                                                    </Button>
                                                </NavLink>
                                                <Button color='red' onClick={() => this.showModalDelete(listuserf1.id)} compact={true}>
                                                    <i class='bx bx-x'></i>
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
export default ShowUserF1;