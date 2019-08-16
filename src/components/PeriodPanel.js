import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PeriodButtonBar from './PeriodButtonBar';

class PeriodeCard extends Component {
    render() {
        //alert('periodCard to='+this.props.to+', from='+this.props.from)

        return (
            <div>
                <Card border="info" >
                    <Card.Header>
                        <Card.Title as="h5">Period</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <PeriodButtonBar
                            from={this.props.from}
                            to={this.props.to}
                            range={this.props.range}
                            resolution={this.props.resolution}
                            handleChoice={this.props.handleChoice}
                            handleChangeDate={this.props.handleChangeDate}
                        />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default PeriodeCard;