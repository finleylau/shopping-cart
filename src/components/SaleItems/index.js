import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import SaleItem from './SaleItem'

export default class SaleItems extends Component {
  render() {
    let postFilter = []
    for (let item of this.props.products) {
      let passed = true
      for (let filter in this.props.filters) {
        if (this.props.filters[filter] && (!item.availableSizes[filter] || item.availableSizes[filter] === 0)) {
          passed = false
          break
        }
      }
      if (passed) {
        postFilter.push(item)
      }
    }

    let cols = postFilter.map((product) => <SaleItem add={this.props.add} key={product.sku} product={product} />)
    let rows = []
    let temp = []
    for (let i in cols) {
      if (i % 3 === 0 && i !== 0) {
        rows.push(temp)
        temp = []
      }
      temp.push([cols[i]])
    }
    for (let i in 4 - temp.length) {
      temp.push(<Col md={4}></Col>)
    }
    rows.push(temp)

    return (
      <div className="product-list">
        <div>
          {rows.map(row =>
            <Row>
              {row}
            </Row>)
          }
        </div>
      </div>
    )
  }
}