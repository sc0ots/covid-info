import React, { Component } from "react";
import { Button, Form, Select, Header } from 'semantic-ui-react'
import axios from "axios";
import { Redirect } from "react-router-dom"
import { message } from "antd";



class CreateUserF1 extends Component {
    constructor(props) {
        super(props);
        const {match} = this.props;
        this.state = {
            area_id: "",
            isRedirect: false,
            quarantineareas: []
        }

    }

    componentDidMount(){
        axios.get("http://localhost:8080/covid/quarantinearea/show").then(res => {
            const quarantineareas = res.data           
            this.setState({ quarantineareas })
        })
    }
    handleChangeSelectArea = (e, data) =>{
        this.setState({
            [data.name]: data.value
        })
    }

    handleSubmitForm = (e) => {
        e.preventDefault()
        const userf1 = {
            user_id: this.props.id,
            area_id: this.state.area_id
        }
        axios.post(`http://localhost:8080/covid/user_f1s/`, userf1)
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    message.success("Success")
                    this.props.parentCallback(false)
                }else{
                    message.error("Error")
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const {quarantineareas} = this.state
        return (
            <>
                <Header
                    as='h1'
                    content='CREATE USER F1'
                    subheader=''
                />
                <Form onSubmit={this.handleSubmitForm}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            label='Quarantine Area'
                            options={[
                                ...quarantineareas.map((quarantinearea, index) => {
                                    return (
                                        { text: quarantinearea.name, value: quarantinearea.id }
                                    )
                                })
                            ]}
                            name="area_id"
                            placeholder='Quarantine Area'
                            onChange={this.handleChangeSelectArea}
                        />
                    </Form.Group>
                    <Button type='submit' primary>Submit</Button>
                </Form>
            
            </>
        )
    }
}
export default CreateUserF1;