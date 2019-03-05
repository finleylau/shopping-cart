import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import Checkout from './Checkout'
import CartItems from './CartItems'

export default class ShoppingCart extends Component {
  render() {
    let totalPrice = 0
    for (let item of this.props.cart) {
      for (let size in item.quantity) {
        totalPrice += item.price * item.quantity[size]
      }
    }
    totalPrice = Math.round(totalPrice * 100) / 100

    if (this.props.open) {
      return (
        <div className="cart">
          <h4>Your Cart</h4>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={this.props.toggle}>Close</Button>
          </div>
          {
            this.props.cart.length > 0 ?
              <div>
                <CartItems cart={this.props.cart} remove={this.props.remove} />
                <hr />
                <Checkout total={totalPrice} />
              </div>
              :
              <div>
                You have nothing in your cart!
            </div>
          }
        </div>
      )
    } else {
      return (
        <div className="cart">
          <Button onClick={this.props.toggle}>
          {
            `Shopping Cart (${this.props.count} item${this.props.count === 1 ? '' : 's'})`
          }
          </Button>

        </div>
      )
    }
  }
}
