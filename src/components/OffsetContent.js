/**
 * Created by Erich on 12/30/2016.
 */
import PropTypes from "prop-types";
import React from 'react';

const getContentPosition = ({ top, left }) => ({ top, left });

const OffsetContent = ({offset, children}) => (
    <div className="offset-container" style={getContentPosition(offset)}>
        {children}
    </div>
);

OffsetContent.propTypes = {
    offset: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
}

export default OffsetContent;