/**
 * Created by erichk on 1/7/17.
 */
import PropTypes from "prop-types";
import React from 'react';

const VerticallyCentered = ({children}) => (
    <div className="vertically-center">
        <div className="vertically-center__content">
            {children}
        </div>
    </div>
);

VerticallyCentered.propTypes = {
    children: PropTypes.node.isRequired
}

export default VerticallyCentered;