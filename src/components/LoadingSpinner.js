import React, { Component } from "react"

class LoadingSpinner extends Component {
    render() {
        const { type, size, className } = this.props
        return (
            <div className={ `spinner-container ${ className ? className : "" }` }>
                <div className={ `spinner spinner--${ type } spinner--${ size }` } />
            </div>
        )
    }
}

LoadingSpinner.sizes = {
    small: "small",
    medium: "medium",
    large: "large"
}

LoadingSpinner.types = {
    primary: "primary",
    secondary: "secondary"
}

export default LoadingSpinner
