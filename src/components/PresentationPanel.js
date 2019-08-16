import React from 'react';
import { Card } from 'react-bootstrap';
import PresentationButtonBar from './PresentationButtonBar';

export default function PresentationPanel(props) {
    return (
        <div>
            <Card border="info">
                <Card.Header>
                    <Card.Title as="h5">Presentations</Card.Title>
                </Card.Header>
                <Card.Body>
                    <PresentationButtonBar handleChoice={props.handleChoice} />
                </Card.Body>
            </Card>
        </div>
    );
}

