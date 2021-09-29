import React, { Component } from "react";
import {  Table, Button, Segment } from 'semantic-ui-react'
import axios from 'axios';
import NotFoundPage from "../../main/NotFoundPage";
class ShowAdmin extends Component {
    constructor(props){
        super(props)
        this.state = {
            listadmins: [],
        }
    }

    

   
    componentDidMount() {
        axios.get(`http://localhost:8080/covid/admins/show`)
          .then(res => {
            const listadmins = res.data;
            this.setState({ listadmins });
          })
          .catch(error => console.log(error));
    }

    
    render() {
        const { listadmins } = this.state;
        const isLogged = JSON.parse(localStorage.getItem("user"))
        let isShow;
        if (isLogged.role == "medical") {
            isShow = true;
        } else {
            isShow = false
        }
        if (isShow) {
            return (<NotFoundPage />)
        }else{
            return (
                <Table celled fixed singleLine selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>UserName</Table.HeaderCell>
                            <Table.HeaderCell>Password</Table.HeaderCell>
                            {/* <Table.HeaderCell>Action</Table.HeaderCell> */}
    
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            listadmins.map((listadmin, index) => {
                                return(
                                    <Table.Row key={index}>
                                    <Table.Cell>{listadmin.id}</Table.Cell>
                                    <Table.Cell>{listadmin.username}</Table.Cell>
                                    <Table.Cell>{listadmin.password}</Table.Cell>
                                    {/* <Table.Cell style={{ whiteSpace: "nowrap", width: "10px"  }}>
                                            <Button  color='orange'>
                                                Update
                                            </Button>
                                    </Table.Cell> */}
                                </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            )
        }
    }
}
export default ShowAdmin;