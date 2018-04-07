/**
 * Created by Erich on 7/26/2017.
 */
import PropTypes from "prop-types";
import React from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux"
import { Motion, spring, presets } from "react-motion";
import VerticallyCentered from "./layout/VerticallyCentered";
import LoadingSpinner from "./LoadingSpinner";

class DailyContentPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            externalLink: null,
            videoLoaded: false
        }

        this.lightboxRoot = document.getElementById("lightbox-root")
        this.el = document.createElement("div")

        this.escFunction = this.escFunction.bind(this)
    }

    escFunction(event){
        if(event.keyCode === 27) {
          this.props.onCloseClick()
        }
    }

    componentDidMount() {
        this.lightboxRoot.appendChild(this.el);
        document.addEventListener("keydown", this.escFunction, false);
        if (!this.props.selectedDay.link) {
            this.props.fetchDailyData(this.props.dailyData.number, { artificialWait: 1500 })
        }
    }

    componentWillUnmount() {
        this.lightboxRoot.removeChild(this.el);
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        const { dailyData, onCloseClick, backgroundHeight, selectedDay } = this.props;
        const { externalLink, openAnimationComplete, videoLoaded } = this.state;
        return createPortal(
            <Motion
                defaultStyle={{ opacity: 0, width: 0, height: 0 }}
                style={{
                    opacity: spring(8),
                    width: spring(80, presets.wobbly),
                    height: spring(70, presets.wobbly)
                }}        
            >
                { ({ opacity, width, height }) => {
                    const windowWidth = window.innerWidth
                    const imageWidth = backgroundHeight * 1.789916
                    const lightboxWidth = imageWidth < windowWidth ? windowWidth : imageWidth
                    return (
                        <div
                            className="lightbox"
                            style={{
                                width: lightboxWidth,
                                height: backgroundHeight,
                                backgroundColor: `rgba(0,0,0,0.${ Math.round(opacity) }`
                            }}
                            onClick={ onCloseClick }
                        >
                            <span className="glyphicon glyphicon-remove-sign lightbox__exit" onClick={ onCloseClick } />
                            <VerticallyCentered>
                                <div
                                    className="lightbox__content"
                                    style={{ width: `${ Math.round(width) }%`, height: `${ Math.round(height) }%` }}
                                >
                                    <iframe src={ selectedDay.link } onLoad={ () => this.setState({ videoLoaded: true }) }></iframe>
                                    { (!Boolean(selectedDay.link) || !videoLoaded) &&
                                        <div className="lightbox__spinner">
                                            <LoadingSpinner size="medium" type="primary" />
                                        </div>
                                    }
                                </div>
                            </VerticallyCentered>
                        </div>
                    )
                }}
            </Motion>,
            this.lightboxRoot
        );
    }
}

DailyContentPopup.propTypes = {
    dailyData: PropTypes.object.isRequired,
    fetchDailyData: PropTypes.func.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    backgroundHeight: PropTypes.number.isRequired,
    selectedDay: PropTypes.object
};

const mapStateToProps = state => ({
    selectedDay: state.frames.selectedDay 
        ? state.frames.frames[state.frames.selectedDay - 1]
        : null
})

export default connect(mapStateToProps)(DailyContentPopup);