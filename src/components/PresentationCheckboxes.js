
import React, { Component } from 'react';
import { FormCheck } from 'react-bootstrap';


class PresentationCheckboxes extends Component {

    handleChoice = (choice) => {
        alert(choice.checked)
        alert(choice.name)

        this.props.handleChoice(choice.name);
    }

    render() {

        return (
            <div>

                <h2>
                    <FormCheck name="Kosten" onClick={e => this.handleChoice(e.target)} >Kosten</FormCheck>
                </h2>
            </div>

        );
    }
}
export default PresentationCheckboxes;