import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import SizeButtons from './SizeButtons'

export default class SaleItem extends Component {
  render() {
    return (
      <Col md={4} className="product-item">
        <img src={require(`../../static/images/${this.props.product.sku}_1.jpg`)} alt="" />
        <h4>{this.props.product.title}</h4>
        <p>{`$${this.props.product.price}`}</p>
        <SizeButtons add={this.props.add} product={this.props.product} />
      </Col>
    )
  }
}
