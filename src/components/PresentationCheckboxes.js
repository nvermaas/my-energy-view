
import React, { Component } from 'react';
import { ButtonToolbar, Checkbox, Button } from 'react-bootstrap';


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
                    <Checkbox name="Netto" onClick={e => this.handleChoice(e.target)} >Netto</Checkbox>
                </h2>
            </div>

        );
    }
}
export default PresentationCheckboxes;