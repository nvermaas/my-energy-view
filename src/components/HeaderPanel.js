import React, { Component } from 'react';
import { Panel, PageHeader } from 'react-bootstrap';
import logo from '../logo.svg';

class HeaderPanel extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h2"><img  src={logo} alt="Logo" width="40" />QboxView 1.0</Panel.Title>
                    </Panel.Heading>
                </Panel>
            </div>
        );
    }
}

export default HeaderPanel;