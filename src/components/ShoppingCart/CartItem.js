import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

export default class CartItem extends Component {
  render() {
    let sizes = {
      "s": "Small",
      "m": "Medium",
      "l": "Large"
    }

    return (
      <Row className="cart-item">
        <Col className="cart-item-image" md={3}>
          <img src={require(`../../static/images/${this.props.item.sku}_2.jpg`)} alt="" />
        </Col>
        <Col md={5}>
          <Row>
            <Col md={12} className="cart-item-name">
              <b>{this.props.item.title}</b>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="cart-item-price">
              {
                Object.keys(this.props.item.quantity).map(size => {
                  let num = this.props.item.quantity[size]

                  return (
                    <div>
                      <div>
                        {`${sizes[size]}:`}
                      </div>
                      <div>
                        {`${num} x $${this.props.item.price} = $${Math.round(num * this.props.item.price * 100) / 100}`}
                      </div>
                    </div>
                  )
                })
              }
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          {
            Object.keys(this.props.item.quantity).map(size => {
              return (
                <div className="cart-item-remove">
                  <Button onClick={() => this.props.remove(this.props.item, size)}>{`Remove size ${size.toUpperCase()}`}</Button>
                </div>
              )
            })
          }
          
        </Col>
      </Row>
    )
  }
}