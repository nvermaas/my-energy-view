
import React, { Component } from 'react';
import Example from './Example';

class MainScreen extends Component {
    render() {
        let data = this.props.data

        return (
            <div>
                <Example data={this.props.data} />
            </div>
        );
    }
}
export default MainScreen;