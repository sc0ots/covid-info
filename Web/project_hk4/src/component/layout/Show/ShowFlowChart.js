import axios from "axios";
import React, { Component } from "react";
import { Chart } from "react-google-charts";
import { Statistic } from 'semantic-ui-react'
import "../../../css/news.css"
import { Table } from 'antd';
import CountUp from 'react-countup';
import NotFoundPage from "../../main/NotFoundPage";


const columns = [
    {
        title: 'PROVINCE/CITY',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'INFECTED',
        dataIndex: 'cases',
        width: 150,
    },
    {
        title: 'TODAY',
        dataIndex: 'casesToday',
        width: 150,
    },
    {
        title: 'DECEASED',
        dataIndex: 'death',
        width: 150,
    },
];


class ShowFlowChart extends Component {
    constructor() {
        super()
        this.state = {
            user: "",
            userf1: "",
            userf0: "",

            infected: "",
            recovered: "",
            deceased: "",
            treated: "",
            listAreas: [],
            canhiem: [],
            cakhoi: [],
            catuvong: []
        }
    }
    componentDidMount() {
        axios.get("https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST").then(res => {
            this.setState({
                infected: res.data.infected,
                recovered: res.data.recovered,
                deceased: res.data.deceased,
                treated: res.data.treated,
                listAreas: res.data.detail
            })
        })
        axios.get("https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST").then(res => {
            this.setState({
                canhiem: res.data.canhiem,
                cakhoi: res.data.cakhoi,
                catuvong: res.data.catuvong
            })
        })
        axios.get("http://localhost:8080/covid/users/count").then(res => {
            this.setState({
                user: res.data.user,
                userf1: res.data.userf1,
                userf0: res.data.userf0
            })
        })
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
                <div>
                    <div>
                        <marquee behavior="scroll" direction="left" className="marquee-heading">
                            <h2 style={{textTransform: "uppercase"}}>Website to update the latest information about the Covid-19 epidemic</h2>
                        </marquee>
                        <div className="information-covid">
                            <Statistic.Group size='small'>
                                <Statistic color="red">
                                    <Statistic.Value><CountUp duration={0.5} separator=' ' end={this.state.infected || 0} /></Statistic.Value>
                                    <Statistic.Label >Infected</Statistic.Label>
                                </Statistic>
                                <Statistic color="orange">
                                    <Statistic.Value><CountUp duration={0.5} separator=' ' end={this.state.treated || 0} /></Statistic.Value>
                                    <Statistic.Label>Treated</Statistic.Label>
                                </Statistic>
                                <Statistic color="green">
                                    <Statistic.Value><CountUp duration={0.5} separator=' ' end={this.state.recovered || 0} /></Statistic.Value>
                                    <Statistic.Label>Recovered</Statistic.Label>
                                </Statistic>
                                <Statistic color="grey">
                                    <Statistic.Value><CountUp duration={0.5} separator=' ' end={this.state.deceased || 0} /></Statistic.Value>
                                    <Statistic.Label>Deceased</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </div>
                        <div style={{display: "flex", width: "1600px"}}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Task', 'Hours per Day'],
                                    ['Normal', this.state.user],
                                    ['F0', this.state.userf0],
                                    ['F1', this.state.userf1],
                                ]}
                                options={{
                                    title: 'User statistics',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                            <Table style={{display: "flex", width: "1100px"}} columns={columns} dataSource={this.state.listAreas} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                        </div>
                        <div className="show-chart" style={{ display: "flex" }}>
                            <Chart
                                width={'530px'}
                                height={'400px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['x', 'people'],
                                    ...this.state.canhiem.map(ca => {
                                        return (
                                            [ca.day, ca.quantity]
                                        )
                                    })
                                ]}
                                options={{
                                    hAxis: {
                                        title: 'Total number of infected people',
                                    },
                                    vAxis: {
                                        title: 'Total number of infected people',
                                    },
                                    colors: ['red']
    
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                            <Chart
                                width={'530px'}
                                height={'400px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['x', 'people'],
                                    ...this.state.cakhoi.map(ca => {
                                        return (
                                            [ca.day, ca.quantity]
                                        )
                                    })
                                ]}
                                options={{
                                    hAxis: {
                                        title: 'Infected today',
                                    },
                                    vAxis: {
                                        title: 'Infected today',
                                    },
                                    colors: ['orange']
    
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                            <Chart
                                width={'530px'}
                                height={'400px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['x', 'people'],
                                    ...this.state.catuvong.map(ca => {
                                        return (
                                            [ca.day, ca.quantity]
                                        )
                                    })
                                ]}
                                options={{
                                    hAxis: {
                                        title: 'Total number of deaths',
                                    },
                                    vAxis: {
                                        title: 'Total number of deaths',
                                    },
                                    colors: ['grey']
    
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    </div>
                </div >
            )
        }
    }
}
export default ShowFlowChart;