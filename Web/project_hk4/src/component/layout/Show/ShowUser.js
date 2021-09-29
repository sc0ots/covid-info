import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Table, Label, Button, Header } from 'semantic-ui-react'
import { Empty } from 'antd';
import "../../../css/search.css"
import "../../../css/important.css"
import "../../../css/panigation.css"
import { Select } from 'semantic-ui-react'
import NotFoundPage from "../../main/NotFoundPage";
import classNames from "classnames";
import { Modal } from 'antd';
import CreatePcrTest from "../Create/CreatePcrTest";
import CreateUserF0 from "../Create/CreateUserF0";
import CreateUserF1 from "../Create/CreateUserF1";
import Vaccine1 from "../Vaccine/Vaccine1";
import Vaccine2 from "../Vaccine/Vaccine2";



import ShowPcrTest from "./ShowPcrTest";
import { reduceRight } from "lodash";


class ShowUser extends Component {
    constructor() {
        super();
        this.state = {
            listusers: [],
            searchTerm: "",
            valueSelect: "",


            loading: false,
            currentPage: 1,
            postsPerPage: 8,

            namePcrShow: "",

            listuserf0s: [],
            listuserf1s: [],
            listPcrTests: [],

            isModalDelete: false,
            isModalCreatePcr: false,
            isModalShowPcr: false,
            isModalCreateUserF0: false,
            isModalCreateUserF1: false,
            isModalCreateVaccine1: false,
            isModalCreateVaccine2: false,
            idUser: "",
        }


    }
    paginate = (e, pageNumber) => {
        e.preventDefault()
        this.setState({
            currentPage: pageNumber
        })
    }
    componentDidMount() {
        axios.get("http://localhost:8080/covid/users/showUsers").then(res => {
            const listusers = res.data
            this.setState({ listusers })
        })
        axios.get("http://localhost:8080/covid/user_f1s/show").then(res => {
            const listuserf0s = res.data
            this.setState({ listuserf0s })
        })
        axios.get("http://localhost:8080/covid/user_f1s/show").then(res => {
            const listuserf1s = res.data
            this.setState({ listuserf1s })
        })

    }
    handleDeleteUser = () => {
        if (this.state.idUser) {
            this.setState({ listusers: this.state.listusers.filter(listuser => listuser.id !== this.state.idUser) });
            axios.delete(`http://localhost:8080/covid/users/` + this.state.idUser)
                .then((response) => {
                })
                .catch((error) => {
                    console.log(error)
                })
            this.setState({
                isModalDelete: false
            });
        }
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

    //Modal Create pcr
    showModalCreatePcr = (id) => {
        this.setState({
            isModalCreatePcr: true,
            idUser: id
        });
    };
    handleCancelCreatePcr = () => {
        this.setState({
            isModalCreatePcr: false,
        });
    };
    callbackFunction = (data) => {
        this.setState({
            isModalCreatePcr: data,
        })
    }
    // Modal Show PCR
    showModalShowPcr = (id) => {
        this.setState({
            isModalShowPcr: true,
        });
        axios.get("http://localhost:8080/covid/pcrs/getbyuserid/" + id).then(res => {
            const listPcrTests = res.data
            this.setState({ listPcrTests })
            res.data.forEach(data => {
                this.setState({
                    namePcrShow: data.user.name
                })
            })
        })
    };
    handleCancelShowPcr = () => {
        this.setState({
            isModalShowPcr: false,
            idShowPcr: null,
        });
    };
    //Modal Create F0
    showModalCreateUserF0 = (id) => {
        this.setState({
            isModalCreateUserF0: true,
            idUser: id
        });
    };
    handleCancelCreateUserF0 = () => {
        this.setState({
            isModalCreateUserF0: false,
        });
    };
    callbackFunctionUserF0 = (data) => {
        this.setState({
            isModalCreateUserF0: data,
        })
        window.location.reload();
    }

    //Modal Create F1
    showModalCreateUserF1 = (id) => {
        this.setState({
            isModalCreateUserF1: true,
            idUser: id
        });
    };
    handleCancelCreateUserF1 = () => {
        this.setState({
            isModalCreateUserF1: false,
        });
    };
    callbackFunctionUserF1 = (data) => {
        this.setState({
            isModalCreateUserF1: data,
        })
        window.location.reload();
    }

    //Modal Create vaccine 1
    showModalCreateVaccine1 = (id) => {
        this.setState({
            isModalCreateVaccine1: true,
            idUser: id
        });
    };
    handleCancelCreateVaccine1 = () => {
        this.setState({
            isModalCreateVaccine1: false,
        });
    };
    callbackFunctionVaccine1 = (data) => {
        this.setState({
            isModalCreateVaccine1: data,
        })
        window.location.reload();
    }

    //Modal Create vaccine 2
    showModalCreateVaccine2 = (id) => {
        this.setState({
            isModalCreateVaccine2: true,
            idUser: id
        });
    };
    handleCancelCreateVaccine2 = () => {
        this.setState({
            isModalCreateVaccine2: false,
        });
    };
    callbackFunctionVaccine2 = (data) => {
        this.setState({
            isModalCreateVaccine2: data,
        })
        window.location.reload();
    }

    render() {
        console.log("Run.....")
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentArr = this.state.listusers.slice(indexOfFirstPost, indexOfLastPost)

        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listusers.length / this.state.postsPerPage); i++) {
            pageNumbers.push(i)
        }

        let ArrMap;
        if (this.state.searchTerm == "") {
            ArrMap = [...currentArr]
        } else {
            ArrMap = [...this.state.listusers]
        }

        const { match } = this.props;
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
                        as='h2'
                        content='LIST USER'
                        subheader='Manage user'
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
                    <Table celled padded >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Citizen ID</Table.HeaderCell>
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                <Table.HeaderCell>Yob</Table.HeaderCell>
                                <Table.HeaderCell>Adress</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Vaccine Status</Table.HeaderCell>
                                <Table.HeaderCell>+Pcr</Table.HeaderCell>
                                <Table.HeaderCell>+F0/F1</Table.HeaderCell>
                                <Table.HeaderCell>Vaccine</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Modal title="" visible={this.state.isModalCreatePcr} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelCreatePcr}>
                            <CreatePcrTest parentCallback={this.callbackFunction} id={this.state.idUser} />
                        </Modal>
                        <Modal title="" visible={this.state.isModalCreateUserF0} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelCreateUserF0}>
                            <CreateUserF0 parentCallback={this.callbackFunctionUserF0} id={this.state.idUser} />
                        </Modal>
                        <Modal title="" visible={this.state.isModalCreateUserF1} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelCreateUserF1}>
                            <CreateUserF1 parentCallback={this.callbackFunctionUserF1} id={this.state.idUser} />
                        </Modal>
                        <Modal title="" visible={this.state.isModalCreateVaccine1} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelCreateVaccine1}>
                            <Vaccine1 parentCallback={this.callbackFunctionVaccine1} id={this.state.idUser} />
                        </Modal>
                        <Modal title="" visible={this.state.isModalCreateVaccine2} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelCreateVaccine2}>
                            <Vaccine2 parentCallback={this.callbackFunctionVaccine2} id={this.state.idUser} />
                        </Modal>


                        <Modal title="" visible={this.state.isModalShowPcr} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelShowPcr}>
                            <ShowPcrTest listPcrTests={this.state.listPcrTests} name={this.state.namePcrShow} />
                        </Modal>

                        <Modal title="" visible={this.state.isModalShowPcr} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancelShowPcr}>
                            <ShowPcrTest listPcrTests={this.state.listPcrTests} name={this.state.namePcrShow} />
                        </Modal>

                        <Modal title="DELETE" visible={this.state.isModalDelete} onOk={this.handleDeleteUser} onCancel={this.handleCancelDelete}>
                            <p>Are you sure</p>
                        </Modal>



                        {
                            this.state.listusers.length > 0 &&
                            ArrMap.filter(listuser => {
                                var isIncludes = listuser.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
                                var isSelect = listuser.status == this.state.valueSelect

                                if (this.state.searchTerm == "" && this.state.valueSelect == "") {
                                    return listuser
                                } else if ((this.state.searchTerm == "" && this.state.valueSelect != "" && isSelect) || (this.state.searchTerm != "" && this.state.valueSelect == "" && isIncludes) || (this.state.searchTerm != "" && this.state.valueSelect != "" && isIncludes && isSelect)) {
                                    return listuser
                                }
                            }).map((listuser, index) => {

                                let result;
                                let result1 = "";
                                if (listuser.status === 0) {
                                    result = <Label as='a' color="teal">Normal</Label>
                                    result1 = "rgba(63,219,240, 0.1)";
                                } else if (listuser.status === 1) {
                                    result = <Label as='a' color='orange' >F 1</Label>
                                    result1 = "rgba(225,133,27, 0.2)";
                                } else {
                                    result = <Label as='a' color='red' >F 0</Label>
                                    result1 = "rgba(219,40,40, 0.4)"
                                }

                                let vaccine;
                                if (listuser.vac_status == 0) {
                                    vaccine = <Label color="grey">Not injected</Label>
                                } else if (listuser.vac_status == 1) {
                                    vaccine = <Label color="grey">Injected 1</Label>
                                } else {
                                    vaccine = <Label color="grey">Injected 2</Label>
                                }


                                return (
                                    <Table.Body >
                                        <Table.Row key={index} style={{ background: result1 }}>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listuser.id}</Table.Cell>
                                            <Table.Cell style={{ fontWeight: "bold" }}>{listuser.name}</Table.Cell>
                                            <Table.Cell>{listuser.citizen_id}</Table.Cell>
                                            <Table.Cell>{listuser.gender ? "Male" : "Female"}</Table.Cell>
                                            <Table.Cell>{listuser.yob}</Table.Cell>
                                            <Table.Cell className="singleline">{listuser.address}</Table.Cell>
                                            <Table.Cell>0{listuser.phone}</Table.Cell>
                                            <Table.Cell >{result}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap" }}>{vaccine}</Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <Button color='blue' onClick={() => this.showModalShowPcr(listuser.id)} color="google plus" compact={true}>
                                                    Pcr
                                                </Button>
                                                <Button color='blue' onClick={() => this.showModalCreatePcr(listuser.id)} color="google plus" compact={true}>
                                                    + Pcr
                                                </Button>
                                            </Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <Button color='blue' disabled={listuser.status == 2} onClick={() => this.showModalCreateUserF0(listuser.id)} compact={true}>
                                                    F0
                                                </Button>
                                                <Button color='blue' disabled={listuser.status == 2 || listuser.status == 1} onClick={() => this.showModalCreateUserF1(listuser.id)} compact={true}>
                                                    F1
                                                </Button>
                                            </Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <Button disabled={listuser.vac_status != 0} onClick={() => this.showModalCreateVaccine1(listuser.id)} color='facebook' compact={true}>
                                                    V1
                                                </Button>
                                                <Button disabled={listuser.vac_status != 1} onClick={() => this.showModalCreateVaccine2(listuser.id)} color='facebook' compact={true}>
                                                    V2
                                                </Button>
                                            </Table.Cell>
                                            <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                                                <NavLink to={`${match.url}/${listuser.id}`}>
                                                    <Button color="teal" compact={true}>
                                                        <i class='bx bxs-detail'></i>
                                                    </Button>
                                                </NavLink>
                                                <NavLink to={`/updateuser/${listuser.id}`}>
                                                    <Button color="orange" compact={true}>
                                                        <i class='bx bxs-pencil'></i>
                                                    </Button>
                                                </NavLink>
                                                <Button onClick={() => this.showModalDelete(listuser.id)} color="google plus" compact={true}>
                                                    <i class='bx bx-x'></i>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                )
                            })
                        }

                    </Table>
                    {(this.state.listusers.length === 0) && <Empty />}
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
export default ShowUser;