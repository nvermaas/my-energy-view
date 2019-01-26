
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class StatusPanel extends Component {

render() {
    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h5">Status</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <table>
                        <tr><td>presentation</td><td>{this.props.state.presentation}</td></tr>
                        <tr><td>dataset</td><td>{this.props.state.dataset}</td></tr>
                        <tr><td>period</td><td>{this.props.state.period}</td></tr>
                        <tr><td>resolution</td><td>{this.props.state.resolution}</td></tr>
                        <tr><td>from</td><td>{this.props.state.from}</td></tr>
                        <tr><td>to</td><td>{this.props.state.to}</td></tr>
                    </table>
                </Panel.Body>
            </Panel>
        </div>
    );
}
}
export default StatusPanel;