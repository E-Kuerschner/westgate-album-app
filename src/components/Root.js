import PropTypes from "prop-types";
import React from "react";
import { Provider } from "react-redux";
import FrameContainer from "./FrameContainer";
import UnderConstruction from "./UnderConstructionPage";
import LoadingSplash from "./LoadingSplash"

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={ this.props.store }>
                <FrameContainer />
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}