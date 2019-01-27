import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import PeriodButtonBar from './PeriodButtonBar';

class PeriodePanel extends Component {
    render() {
        //alert('periodPanel to='+this.props.to+', from='+this.props.from)

        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h5">Periode</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <PeriodButtonBar
                            from={this.props.from}
                            to={this.props.to}
                            range={this.props.range}
                            resolution={this.props.resolution}
                            handleChoice={this.props.handleChoice}
                            handleChangeDate={this.props.handleChangeDate}
                        />
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default PeriodePanel;