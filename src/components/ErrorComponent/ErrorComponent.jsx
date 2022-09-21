import React, { Component } from 'react';

export default class ErrorComponent extends Component {
  state = {
    hasError: false,
  };
  componentDidCatch(error, info) {
    this.state({
      hasError: true,
    });
  }
  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>someting went wrong</h1>;
    }
    return this.props.children;
  }
}
