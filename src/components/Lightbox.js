/**
 * Created by Erich on 7/26/2017.
 */
import PropTypes from "prop-types";
import React from "react";
import { Motion, spring, presets } from "react-motion";
import VerticallyCentered from "./VerticallyCentered";

function Lightbox({ children, onCloseClick, backgroundWidth }) {
    return (
        <Motion defaultStyle={{ opacity: 0, width: 0, height: 0 }} style={{ opacity: spring(9), width: spring(75, presets.wobbly), height: spring(60, presets.wobbly) }}>
            { ({ opacity, width, height }) => (
                <div className="lightbox" style={{ width: backgroundWidth, backgroundColor: `rgba(0,0,0,0.${ Math.round(opacity) }` }}>
                    <span className="glyphicon glyphicon-remove-sign lightbox__exit" onClick={ onCloseClick } />
                    <VerticallyCentered>
                        <div className="lightbox__content" style={{ width: `${ Math.round(width) }%`, height: `${ Math.round(height) }%` }}>
                            { children }
                        </div>
                    </VerticallyCentered>
                </div>
            )}
        </Motion>
    );
}

Lightbox.propTypes = {
    children: PropTypes.element.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    backgroundWidth: PropTypes.number.isRequired
};

export default Lightbox;