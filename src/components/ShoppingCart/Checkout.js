import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

export default class Checkout extends Component {
  render() {
    return (
      <div>
        <Row className="checkout">
          <Col md={6} className="checkout-price">
            {`Total Price: $${this.props.total}`}
          </Col>
          <Col md={3}>
            <Button>Checkout</Button>
          </Col>
        </Row>
      </div>
    )
  }
}