import { Descriptions } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import { Empty } from 'antd';
import { Table, Button, Header } from 'semantic-ui-react'
import NotFoundPage from '../../main/NotFoundPage';
import classNames from 'classnames';

class ShowPcrTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPcrTests: [],
            name: ""
        }
    }
    render() {
        const isLogged = JSON.parse(localStorage.getItem("user"))
        let isShow;
        if (isLogged.role == "admin") {
          isShow = true;
        } else {
          isShow = false
        }
        if (isShow) {
          return (<NotFoundPage />)
        }else{
            return (
                <>
                
                    <Header
                        as='h1'
                        content='PCR TEST'
                        subheader='Pcr test user'
                    />
                   
                    <h2 style={{margin:"14px 0"}}>{this.props.name}</h2>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Result</Table.HeaderCell>
                                <Table.HeaderCell>Time</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        {
                            this.props.listPcrTests.length > 0 &&
    
                            <Table.Body>
                                {
                                    this.props.listPcrTests.map((data, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{data.result}</Table.Cell>
                                                <Table.Cell>{data.time}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        }
                    </Table>
                    {this.props.listPcrTests.length === 0 && <Empty />}
                   
                </>
            )
        }
       
    }
}

export default ShowPcrTest;