import React, { Component } from 'react';
import { Glyphicon, Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Configuration extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSaveClose = this.handleSaveClose.bind(this);

        this.state = {
            ip : this.props.ip,
            gp : this.props.gp,
            ep : this.props.ep,
            show: this.props.show
        };
    }

    handleClose() {
        this.setState({ show: 'false' });
    }

    handleSaveClose() {
        // setter
        localStorage.setItem('MyEnergyServerIP', this.state.ip);
        localStorage.setItem('QboxGasPrice', this.state.gp);
        localStorage.setItem('QboxElectricityPrice', this.state.ep);
        this.setState({ show: 'false' });

        this.props.handleConfigChange(this.state.ip)
    }

    handleShow() {
        this.setState({ show: 'true' });
    }

    changeIP = (ip) => {
        this.setState({ip: ip.target.value});
    }

    changeGasPrice = (price) => {
        this.setState({gp: price.target.value});
    }

    changeElectricityPrice = (price) => {
        this.setState({ep: price.target.value});
    }

    getValidationState() {
        const length = this.state.ip.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }


    render() {
        let renderConfigButton
        let renderConfigDialog

        if (this.state.show=='false') {
            renderConfigButton =
            <Button bsStyle="info" bsSize="small"
                    onClick={this.handleShow}><Glyphicon glyph="wrench" />
                &nbsp;Configuration
            </Button>
        } else {
            renderConfigDialog =
                <Modal.Dialog show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form>
                            <FormGroup controlId="qservice_ip" validationState={this.getValidationState()}>
                                <ControlLabel>Host or IP of MyEnergy Server</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.ip}
                                    placeholder={this.state.ip}
                                    onChange={(ip) => this.changeIP(ip)}
                                />
                            </FormGroup>

                            <FormGroup controlId="gas_price">
                                <ControlLabel>Gas price per m3 in EUR</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.gp}
                                    placeholder="0.63"
                                    onChange={(gp) => this.changeGasPrice(gp)}
                                />
                            </FormGroup>

                            <FormGroup controlId="electricity_price">
                                <ControlLabel>Electricity price per kWh in EUR</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.ep}
                                    placeholder={this.state.ep}
                                    onChange={(ep) => this.changeElectricityPrice(ep)}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleSaveClose}>OK</Button>
                        <Button bsStyle="warning" onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
        }

        return (
            <div>
                {renderConfigButton}
                {renderConfigDialog}
            </div>
        );
    }
}

export default Configuration;
