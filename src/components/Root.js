import PropTypes from "prop-types";
import React from "react";
import { Provider } from "react-redux";
import Application from "./App";
import LoadingSplash from "./LoadingSplash"

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={ this.props.store }>
                <Application />
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}