/**
 * Created by Erich on 7/26/2017.
 */
import PropTypes from "prop-types";
import React from "react";
import { createPortal } from "react-dom";
import { Motion, spring, presets } from "react-motion";
import VerticallyCentered from "./VerticallyCentered";

class Lightbox extends React.Component {
    constructor(props) {
        super(props);
        this.lightboxRoot = document.getElementById("lightbox-root")
        this.el = document.createElement("div")
    }

    componentDidMount() {
        this.lightboxRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.lightboxRoot.removeChild(this.el);
    }

    render() {
        const { dailyData, onCloseClick, backgroundWidth } = this.props;
        return createPortal(
            <Motion defaultStyle={{ opacity: 0, width: 0, height: 0 }} style={{ opacity: spring(9), width: spring(75, presets.wobbly), height: spring(60, presets.wobbly) }}>
                { ({ opacity, width, height }) => (
                    <div className="lightbox" style={{ width: backgroundWidth, backgroundColor: `rgba(0,0,0,0.${ Math.round(opacity) }` }}>
                        <span className="glyphicon glyphicon-remove-sign lightbox__exit" onClick={ onCloseClick } />
                        <VerticallyCentered>
                            <div className="lightbox__content" style={{ width: `${ Math.round(width) }%`, height: `${ Math.round(height) }%` }}>
                                <iframe src={ dailyData.link }></iframe>
                            </div>
                        </VerticallyCentered>
                    </div>
                )}
            </Motion>,
            this.lightboxRoot
        );
    }
}

Lightbox.propTypes = {
    dailyData: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    backgroundWidth: PropTypes.number.isRequired
};

export default Lightbox;