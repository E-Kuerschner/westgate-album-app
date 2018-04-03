/**
 * Created by Erich on 7/26/2017.
 */
import PropTypes from "prop-types";
import React from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux"
import { Motion, spring, presets } from "react-motion";
import VerticallyCentered from "./VerticallyCentered";
import LoadingSpinner from "./LoadingSpinner";

class Lightbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            externalLink: null
        }

        this.lightboxRoot = document.getElementById("lightbox-root")
        this.el = document.createElement("div")
    }

    componentDidMount() {
        this.lightboxRoot.appendChild(this.el);

        if (!this.props.selectedDay.link) {
            this.props.fetchDailyData(this.props.dailyData.number, { artificialWait: 1000 })
        }
    }

    componentWillUnmount() {
        this.lightboxRoot.removeChild(this.el);
    }

    render() {
        const { dailyData, onCloseClick, backgroundWidth, selectedDay } = this.props;
        const { externalLink, openAnimationComplete } = this.state;
        return createPortal(
            <div>
                <Motion
                    defaultStyle={{ opacity: 0, width: 0, height: 0 }}
                    style={{ opacity: spring(8), width: spring(75, presets.wobbly), height: spring(60, presets.wobbly) }}        
                >
                    { ({ opacity, width, height }) => (
                        <div className="lightbox" style={{ width: backgroundWidth, backgroundColor: `rgba(0,0,0,0.${ Math.round(opacity) }` }}>
                            <span className="glyphicon glyphicon-remove-sign lightbox__exit" onClick={ onCloseClick } />
                            <VerticallyCentered>
                                <div className="lightbox__content" style={{ width: `${ Math.round(width) }%`, height: `${ Math.round(height) }%` }}>
                                    { Boolean(selectedDay) 
                                        ? <iframe src={ selectedDay.link }></iframe>
                                        : (
                                            <VerticallyCentered>
                                                <LoadingSpinner size="medium" type="primary" />
                                            </VerticallyCentered>
                                        )
                                    }
                                </div>
                            </VerticallyCentered>
                        </div>
                    )}
                </Motion>
            </div>,
            this.lightboxRoot
        );
    }
}

Lightbox.propTypes = {
    dailyData: PropTypes.object.isRequired,
    fetchDailyData: PropTypes.func.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    backgroundWidth: PropTypes.number.isRequired,
    selectedDay: PropTypes.object
};

const mapStateToProps = state => ({
    selectedDay: state.frames.selectedDay 
        ? state.frames.frames[state.frames.selectedDay - 1]
        : null
})

export default connect(mapStateToProps)(Lightbox);