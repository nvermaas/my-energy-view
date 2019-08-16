import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getDate} from '../utils/DateUtils'


class MyDatePicker extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            to : this.props.to,
            from : this.props.from,
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
        this.props.handleChangeDate(this.state.from, this.state.to)
    }

    handleShow() {
        this.setState({ show: true });
    }

    // this function stores the picked dates in the local state,
    // because sending it back through the callback function would immediately trigger a new render.
    // The flow will remain locally in this component until the OK button triggers the 'handleClose' function,
    // which will send the changed dates back with the callback function 'this.props.handleChangeDate'
    handleLocalChangeDate= (date, which) => {

        //this.props.handleChangeDate(newDate, which)
        if (which==='from') {
            this.setState({from: getDate(date)});
        } else
        if (which === 'to') {
            this.setState({to: getDate(date)});
        }
    }

    render() {
        //alert('myDatePicker : '+this.state.show)
        let periodeDialog
        if (this.state.show) {
            periodeDialog =
                <Modal.Dialog show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Period</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Choose Period</h4>
                        Van:
                        <DatePicker
                            selected={this.state.from}
                            onChange={(new_date) => this.handleLocalChangeDate(new_date,'from')}
                        />
                        Tot:
                        <DatePicker
                            selected={this.state.to}
                            onChange={(new_date) => this.handleLocalChangeDate(new_date,'to')}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleClose}>OK</Button>
                    </Modal.Footer>
                </Modal.Dialog>
        }

        return (
            <div>
                <Button variant="info" onClick={this.handleShow}>
                    Choose Period
                </Button>
                {periodeDialog}

            </div>
        );
    }
}

export default MyDatePicker;
