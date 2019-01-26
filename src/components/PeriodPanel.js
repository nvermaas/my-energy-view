import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import PeriodButtonBar from './PeriodButtonBar';

class PeriodePanel extends Component {

    render() {
        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h5">Periode</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <PeriodButtonBar handleChoice={this.props.handleChoice} />
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default PeriodePanel;