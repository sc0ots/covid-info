import React, {Component} from "react";
import { Result, Button } from 'antd';

class ShowFlowChart extends Component{
    render(){
        return(
            <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
          />
        )
    }
}
export default ShowFlowChart;