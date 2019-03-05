import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

export default class SizeButtons extends Component {
  render() {
    let sizes = {
      "s": "S",
      "m": "M",
      "l": "L"
    }

    return (
      <div className="product-item-buttons">
        {
          Object.keys(this.props.product.availableSizes).map(size => {
            if (this.props.product.availableSizes[size] === 0) {
              return (
                <Button disabled>{`Add size ${sizes[size]} to cart (${this.props.product.availableSizes[size]} left)`}</Button>
              )
            }
            return (
              <Button onClick={() => this.props.add(this.props.product, size)}>{`Add size ${sizes[size]} to cart (${this.props.product.availableSizes[size]} left)`}</Button>
            )
          })
        }
      </div>
    )
  }
}