import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      //log the error to an error reporting service
      console.log({ error, errorInfo });
    }
  
    render() {
      if (this.state.hasError) {
        return <h1 data-testid="errorBoundary">Oops, something went wrong.</h1>;
      }
      return this.props.children; 
    }
  }

  export default ErrorBoundary