import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
    };

    componentWillMount() {
      if(!this.props.authenticated)
        this.context.router.push('/');
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated)
        this.context.router.push('/');
    }

    render() {
      // console.log(this.props.resources); //->resourceList
      // console.log('Rendering', ComposedComponent);
      // console.log(this.props.authenticated);
      // console.log(this.context);
      return <ComposedComponent { ...this.props} />;
    }
  }

  function mapStateToProps(state) {
      // console.log(state.authenticated);
    return {
      authenticated: state.authenticated.login,
    };
  }

  return connect(mapStateToProps)(Authentication);
}

// In some other location... not in this file
// we want to use this hoc

// const InnerComposedComponent = Authentication(Resource)

// In some render method...
// <InnerComposedComponent resources={resourceList}/>
