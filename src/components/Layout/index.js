import React, { Component, Suspense } from 'react';

import { isUserAuthenticated } from '../../helpers/authUtils';
import PrivateLayout from './Private.layout';
import PublicLayout from './Public.layout';
import Loading from '../Loading';

const withLayout = (WrappedComponent)=>{
  const HOC = class extends Component{
    getLayout=()=>{
      if(isUserAuthenticated()) return PrivateLayout;
      return PublicLayout;
    }
    render(){
      const Layout = this.getLayout();
      return(
        <Suspense fallback={<Loading/>}>
          <Layout {...this.props}>
            <WrappedComponent {...this.props}/>
          </Layout>
        </Suspense>
      )
    }
  }
  return HOC
}

export default withLayout;