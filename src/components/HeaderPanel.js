import React, { Component } from 'react';
import { Panel  } from 'react-bootstrap';
import logo from '../my_energy.jpg';

class HeaderPanel extends Component {

    render() {
        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h2">
                            <img  src={logo} alt="Logo" width="40" /> MyEnergy View<small> version 1.1.0 - 23 feb 2019</small>
                        </Panel.Title>
                    </Panel.Heading>
                </Panel>
            </div>
        );
    }
}

export default HeaderPanel;