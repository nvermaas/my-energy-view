
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faQuestion } from '@fortawesome/free-solid-svg-icons'
import Configuration from './Configuration';

export default function StatusPanel(props) {

    let ip,sn,gp,ep
    // condition ? exprT : exprF
    localStorage.getItem('MyEnergyServerIP') == null ? ip = '192.168.178.64' : ip = localStorage.getItem('MyEnergyServerIP')
    localStorage.getItem('QboxGasPrice') == null ? gp = '0.63' : gp = localStorage.getItem('QboxGasPrice')
    localStorage.getItem('QboxElectricityPrice') == null ? ep = '0.20' : ep = localStorage.getItem('QboxElectricityPrice')

    let help_url = "https://github.com/nvermaas/my_energy/blob/master/README_DOCKER.md"

    return (
        <div>
            <Card border="info">
                <Card.Header>
                    <Card.Title as="h5">Status</Card.Title>
                </Card.Header>
                <Card.Body>
                    <tr><td>
                            <Configuration ip = {ip} sn = {sn} gp={gp} ep = {ep} show="false"
                                           handleConfigChange={props.handleConfigChange} />
                        </td>
                        &nbsp;
                        <td>
                            <a href={props.url} target="_blank">
                                <Button variant="success" >
                                    <FontAwesomeIcon icon={faCog} />
                                    &nbsp;Server
                                </Button>
                            </a>
                        </td>
                        &nbsp;
                        <td>
                            <a href={help_url} target="_blank">
                                <Button variant="info" >
                                    <FontAwesomeIcon icon={faQuestion} />
                                    &nbsp; Help
                                </Button>
                            </a>
                        </td>
                    </tr>
                </Card.Body>
            </Card>
        </div>
    );
}
