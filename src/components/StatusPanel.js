
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Configuration from './Configuration';
class StatusPanel extends Component {

render() {
    let ip,sn,gp,ep
    // condition ? exprT : exprF
    localStorage.getItem('QserverIP') == null ? ip = '192.168.178.64' : ip = localStorage.getItem('QserverIP')
    localStorage.getItem('QboxSN') == null ? sn = '15-49-002-081' : sn = localStorage.getItem('QboxSN')
    localStorage.getItem('QboxGasPrice') == null ? gp = '0.63' : gp = localStorage.getItem('QboxGasPrice')
    localStorage.getItem('QboxElectricityPrice') == null ? ep = '0.20' : ep = localStorage.getItem('QboxElectricityPrice')

    return (
        <div>
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h5">Status</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Configuration ip = {ip} sn = {sn} gp={gp} ep = {ep} show="false"
                                   handleConfigChange={this.props.handleConfigChange} />
                    <table>
                        <tbody>
                        <tr><td>url : </td><td><a href={this.props.url}>(click for API)</a></td></tr>

                        </tbody>
                    </table>

                </Panel.Body>
            </Panel>
        </div>
    );
}
}
export default StatusPanel;