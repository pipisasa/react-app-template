import React, { Component, Suspense } from 'react';
import Loading from '../Loading';
import { connect } from 'react-redux';

class PublicLayout extends Component {
  render() {
    const children = this.props.children || null
    return (
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
    );
  }
}

export default connect()(PublicLayout);
