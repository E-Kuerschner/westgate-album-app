import PropTypes from "prop-types";
import React from 'react';

const HorizontallyCentered = ({children}) => (
    <div className="horizontally-center">
        <div className="horizontally-center_content">
            {children}
        </div>
    </div>
);

HorizontallyCentered.propTypes = {
    children: PropTypes.node.isRequired
}

export default HorizontallyCentered;