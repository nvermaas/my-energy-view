
import React, { Component } from 'react';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import Configuration from './Configuration';
class StatusPanel extends Component {

render() {
    let ip,sn,gp,ep
    // condition ? exprT : exprF
    localStorage.getItem('MyEnergyServerIP') == null ? ip = '192.168.178.64' : ip = localStorage.getItem('MyEnergyServerIP')
    localStorage.getItem('QboxGasPrice') == null ? gp = '0.63' : gp = localStorage.getItem('QboxGasPrice')
    localStorage.getItem('QboxElectricityPrice') == null ? ep = '0.20' : ep = localStorage.getItem('QboxElectricityPrice')

    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h5">Status</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <tr>
                        <td>
                            <Configuration ip = {ip} sn = {sn} gp={gp} ep = {ep} show="false"
                                           handleConfigChange={this.props.handleConfigChange} />
                        </td>
                        &nbsp;
                        <td>
                            <a href={this.props.url}>
                                <Button bsStyle="success" bsSize="small"
                                        onClick="location.href={this.props.url}" >
                                    MyEnergy Server
                                </Button>
                            </a>
                        </td>
                    </tr>

                </Panel.Body>
            </Panel>
        </div>
    );
}
}
export default StatusPanel;