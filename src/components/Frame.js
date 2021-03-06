import PropTypes from "prop-types";
import React from 'react';
import OffsetContent from './layout/OffsetContent';

const getFrameSize = ({ width, height }) => ({ width, height });

const Frame = ({size, offset, children, onClick, isUnlocked }) => (
    <OffsetContent offset={offset}>
        <div 
            style={ getFrameSize(size) }
            className={ `frame frame--${ isUnlocked ? "un" : "" }locked` }
            onClick={ onClick }
        >
            { children }
        </div>
    </OffsetContent>
);

Frame.propTypes = {
    size: PropTypes.object.isRequired,
    offset: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    isUnlocked: PropTypes.bool.isRequired
}

export default Frame;