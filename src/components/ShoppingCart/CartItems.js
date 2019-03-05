import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import CartItem from './CartItem'

export default class CartItems extends Component {
  render() {
    return (
      <div>
        {
          this.props.cart.map(item => <CartItem remove={this.props.remove} item={item} />)
        }
      </div>
    )
  }
}