
import React, { Component } from 'react';
import { ButtonToolbar, Button, Panel } from 'react-bootstrap';

class StatusPanel extends Component {

render() {
    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h5">Status</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {this.props.presentation} - {this.props.period} - {this.props.resolution}
                </Panel.Body>
            </Panel>
        </div>
    );
}
}
export default StatusPanel;