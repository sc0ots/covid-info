import React, { Component } from 'react';
import Context from './Context';
class Provider extends Component {
    constructor(){
        super();
        this.state = {
            visible: false
        }
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Context.Provider value={{
                visible: this.state.visible,
                showDrawer: this.showDrawer,
                onClose: this.onClose
            }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default Provider;