import React, { Component } from 'react';
import { Result, Button } from 'antd';

class NotFoundPage extends Component {
    render() {
        return (
            <Result
                title="We don't have any documents matching your query."
            ></Result>
        )
    }
}

export default NotFoundPage;


