import React from 'react';
import { Card  } from 'react-bootstrap';
import logo from '../my_energy.jpg';

export default function HeaderPanel() {
    return (
        <div>
            <Card border="info" >
                <Card.Header>
                    <Card.Title as="h2">
                        <img  src={logo} alt="Logo" width="40" /> MyEnergy
                    </Card.Title>
                </Card.Header>
            </Card>
        </div>
    );
}
