import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // this method ONLY update State!!!
    // static getDerivedStateFromError(error) {
    //     return { error: true};
    // }

    // if need smth else use componentDidCatch()
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;