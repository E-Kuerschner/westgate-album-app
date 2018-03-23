import PropTypes from "prop-types";
import React from "react";
import { Provider } from "react-redux";
import FrameContainer from "./FrameContainer";
import UnderConstruction from "./UnderConstructionPage"

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={ this.props.store }>
                <UnderConstruction />
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}