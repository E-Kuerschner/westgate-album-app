/**
 * Created by Erich on 12/28/2016.
 */
import PropTypes from "prop-types";
import React from 'react';
import framesImage from '../../images/frames.jpg';

//only set the width on the image so that the height scales organically as the width of the browser changes
const BackgroundImage = ({ width, height }) => (
    <img height={height} src={framesImage} />
);

BackgroundImage.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}

 export default BackgroundImage;