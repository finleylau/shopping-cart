import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

export default class FilterButtons extends Component {
  render() {
    let sizes = {
      "s": "Small",
      "m": "Medium",
      "l": "Large"
    }

    return (
      <div className="filter-buttons">
        {
          Object.keys(this.props.filters).map(size => {
            return (
              <Button onClick={() => this.props.filter(size)}>
                {`${this.props.filters[size] ? "Unfilter" : "Filter"} ${sizes[size]}`}
              </Button>
            )
          })
        }
      </div>
    )
  }
}