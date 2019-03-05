import React, { Component } from 'react';
import data from './static/data/products.json'
import { Row, Col, Button } from 'react-bootstrap'
import './static/app.css';
import SaleItems from './components/SaleItems'
import ShoppingCart from './components/ShoppingCart'
import FilterButtons from './components/FilterButtons'
import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_URL
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: data.products,
      cart: [],
      cartOpen: false,
      itemCount: 0,
      activeFilters: {
        "s": false,
        "m": false,
        "l": false
      },
      isLoggedIn: false,
      currentUser: null
    }

    this.addItemToCart = this.addItemToCart.bind(this)
    this.removeItemFromCart = this.removeItemFromCart.bind(this)
    this.toggleCart = this.toggleCart.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)

    this.authConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }

    this.auth = firebase.auth()
  }

  componentDidMount() {
    this.auth.onAuthStateChanged(user => {
      this.setState({
        isLoggedIn: !!user,
        currentUser: user
      })
    })
  }

  toggleFilter(filter) {
    let { activeFilters } = this.state
    activeFilters[filter] = !activeFilters[filter]
    this.setState({
      activeFilters
    })
  }

  addItemToCart(newItem, size) {
    let existing = this.state.cart
    let updated = false
    for (let item of existing) {
      if (item.sku === newItem.sku) {
        if (!item.quantity[size]) {
          item.quantity[size] = 0
        }
        item.quantity[size] += 1
        updated = true
        break
      }
    }

    if (!updated) {
      newItem.quantity = {}
      newItem.quantity[size] = 1
      existing.push(newItem)
    }

    let data = this.state.data
    for (let item of data) {
      if (item.sku === newItem.sku) {
        item.availableSizes[size] -= 1
      }
    }

    this.setState({
      data: data,
      cart: existing,
      itemCount: this.state.itemCount + 1
    })
  }

  removeItemFromCart(oldItem, size) {
    let existing = this.state.cart
    for (let i in existing) {
      let item = existing[i]
      if (item.sku === oldItem.sku) {
        item.quantity[size] -= 1
        if (item.quantity[size] === 0) {
          delete item.quantity[size]
        }

        let tempCount = 0
        for (let key in item.quantity) {
          tempCount += item.quantity[key]
        }

        if (tempCount === 0) {
          existing.splice(i, 1)
        }
        break
      }
    }

    let data = this.state.data
    for (let item of data) {
      if (item.sku === oldItem.sku) {
        item.availableSizes[size] += 1
      }
    }

    this.setState({
      data: data,
      cart: existing,
      itemCount: this.state.itemCount - 1
    })
  }

  toggleCart() {
    this.setState({
      cartOpen: !this.state.cartOpen
    })
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col md={12}>
            {
              this.state.isLoggedIn ?
                <div className="logged-in">
                  <h1>Welcome, {this.auth.currentUser.displayName}</h1>
                  <Button onClick={() => this.auth.signOut()}>Sign Out</Button>
                </div>
                :
                <div className="log-in">
                  <StyledFireBaseAuth
                    uiConfig={this.authConfig}
                    firebaseAuth={this.auth}
                  />
                </div>
            }
          </Col>

          <Col md={8}>
            <Row>
              <Col md={12}>
                <FilterButtons filter={this.toggleFilter} filters={this.state.activeFilters} />
              </Col>
              <Col md={12}>
                <SaleItems filters={this.state.activeFilters} add={this.addItemToCart} products={this.state.data} />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <ShoppingCart
              cart={this.state.cart}
              count={this.state.itemCount}
              toggle={this.toggleCart}
              open={this.state.cartOpen}
              remove={this.removeItemFromCart}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
