import React, { Component } from 'react';
import { Panel  } from 'react-bootstrap';
import logo from '../logo.svg';

class HeaderPanel extends Component {

    render() {
        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h2">
                            <img  src={logo} alt="Logo" width="40" />QboxView <small> version 1.0 - 27 jan 2019</small>
                        </Panel.Title>
                    </Panel.Heading>
                </Panel>
            </div>
        );
    }
}

export default HeaderPanel;