import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PresentationButtonBar from './PresentationButtonBar';

class PresentationCard extends Component {

    render() {
        return (
            <div>
                <Card border="info">
                    <Card.Header>
                        <Card.Title as="h5">Presentations</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <PresentationButtonBar handleChoice={this.props.handleChoice} />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default PresentationCard;