import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class MyDatePicker extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);


        this.state = {
            startDate: new Date(),
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChoice = (choice) => {
        alert('myDatePicker.handleChoice:' +choice)
        this.props.handleChoice(choice);
    }

    handleChangeDate= (date) => {
        alert(date)
        this.setState({
            startDate: date,
        });
    }

    render() {
        //alert('myDatePicker : '+this.props.date)
        return (
            <div>
                <Button bsStyle="info" bsSize="large" onClick={this.handleShow}>
                    Kies Periode
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <DatePicker
                            selected={this.props.date}
                            onChange={this.handleChangeDate}
                        />
                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
                        </p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        );
    }
}

export default MyDatePicker;
