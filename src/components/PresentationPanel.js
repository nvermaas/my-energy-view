import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import PresentationButtonBar from './PresentationButtonBar';
import PresentationCheckboxes from './PresentationCheckboxes';

class PresentationPanel extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h5">Presentaties</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <PresentationButtonBar handleChoice={this.props.handleChoice} />
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default PresentationPanel;