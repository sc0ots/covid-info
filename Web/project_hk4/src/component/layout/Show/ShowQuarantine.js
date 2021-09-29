import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Header } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import NotFoundPage from "../../main/NotFoundPage";
import { message, Modal } from 'antd';
import CreateQuarantine from "../Create/CreateQuarantine"

class ShowUserF0 extends Component {
  constructor() {
    super();
    this.state = {
      listquarantines: [],
      searchTerm: "",

      idUser: null,
      isShowModalCreate: false,
      isModalDelete: false,
    }
  }


  componentDidMount() {
    axios.get("http://localhost:8080/covid/quarantinearea/show").then(res => {
      const listquarantines = res.data;
      this.setState({ listquarantines })
    })
  }
  handleDeleteQuarantine = () => {
    this.setState({ listquarantines: this.state.listquarantines.filter((listquarantine) => listquarantine.id !== this.state.idUser) })
    axios.delete("http://localhost:8080/covid/quarantinearea/" + this.state.idUser).then(response => {
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
    const { listquarantines } = this.state;
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
            <CreateQuarantine parentCallback={this.callBackFunction} />
          </Modal>
          <Modal title="DELETE" visible={this.state.isModalDelete} onOk={this.handleDeleteQuarantine} onCancel={this.handleCancelDelete}>
            <p>Are you sure</p>
          </Modal>
          <Header
            as='h2'
            content='LIST QUARANTINE AREA'
            subheader='Manage quarantine'
          />
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Button content='+ADD' onClick={this.showModalCreate} primary />
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
                <Table.HeaderCell>Adress</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                listquarantines.filter(listquarantine => {
                  if (this.state.searchTerm == "") {
                    return listquarantine
                  } else if (listquarantine.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                    return listquarantine
                  }
                }).map((listquarantine, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell style={{ whiteSpace: "nowrap", width: "50px", fontWeight: "bold" }}>{listquarantine.id}</Table.Cell>
                      <Table.Cell style={{ fontWeight: "bold" }}>{listquarantine.name}</Table.Cell>
                      <Table.Cell>{listquarantine.address}</Table.Cell>
                      <Table.Cell style={{ whiteSpace: "nowrap", width: "30px" }}>
                        <NavLink to={`/detailquarantine/${listquarantine.id}`} >
                          <Button color='teal' compact={true}>
                            <i class='bx bxs-detail'></i>
                          </Button>
                        </NavLink>
                        <NavLink to={`/updatequarantine/${listquarantine.id}`} >
                          <Button color='orange' compact={true}>
                            <i class='bx bxs-pencil'></i>
                          </Button>
                        </NavLink>
                        <Button color='red' onClick={() => this.handleShowModalDelete(listquarantine.id)} compact={true}>
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
export default ShowUserF0;