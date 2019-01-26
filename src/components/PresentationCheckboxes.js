
import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';


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
                    <Checkbox name="Kosten" onClick={e => this.handleChoice(e.target)} >Kosten</Checkbox>
                </h2>
            </div>

        );
    }
}
export default PresentationCheckboxes;