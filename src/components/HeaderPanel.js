import React, { Component } from 'react';
import { Card  } from 'react-bootstrap';
import logo from '../my_energy.jpg';

class HeaderCard extends Component {

    render() {
        return (
            <div>
                <Card border="info">
                    <Card.Header>
                        <Card.Title as="h2">
                            <img  src={logo} alt="Logo" width="40" /> MyEnergy View
                        </Card.Title>
                    </Card.Header>
                </Card>
            </div>
        );
    }
}

export default HeaderCard;