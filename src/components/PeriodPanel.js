import React from 'react';
import { Card } from 'react-bootstrap';
import PeriodButtonBar from './PeriodButtonBar';

export default function PeriodPanel(props) {

    return (
        <div>
            <Card border="info" >
                <Card.Header>
                    <Card.Title as="h5">Period</Card.Title>
                </Card.Header>
                <Card.Body>
                    <PeriodButtonBar
                        from={props.from}
                        to={props.to}
                        range={props.range}
                        resolution={props.resolution}
                        handleChoice={props.handleChoice}
                        handleChangeDate={props.handleChangeDate}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

