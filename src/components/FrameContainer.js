import React from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { fetchDailyContentRequest, fetchDaysRequest, daySelected } from "../actions"
import HorizontallyCentered from './HorizontallyCentered';
import Frame from './Frame';
import Lightbox from "./Lightbox";
import CountDown from './Countdown';
import LoadingSplash from "./LoadingSplash"
import ExperienceWarning from "./ExperienceWarning"
import windowPic from "../../images/frames.jpg";

class FrameContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLightBox: false,
            lightBoxContent: null,
            frameDataReady: false,
            backgroundImageReady: false,
            loadingAnimationComplete: false,
            warningBypassed: this.props.background.width >= 1000
        };

        this.frameClicked = this.frameClicked.bind(this);
        this.isFrameUnlocked = this.isFrameUnlocked.bind(this);
        this.warningBypassed = this.warningBypassed.bind(this);
    }

    componentDidMount() {
        // set loading state that will animate logo
        // after all loading has been done then move the logo to its final place in the bottom left (maybe add fill)
        // and fade out loading overlay to reveal the frames in the background
        // also before any of this i should detect the device the user is ont and display a message if they are on a phone
        this.props.fetchDaysRequest({ artificialWait: 2000})
            .then(() => {
                this.setState({ frameDataReady: true })
            })
    }

    isFrameUnlocked({ unlockEpoch }) {
        const unlockMoment = moment.unix(unlockEpoch)
        return unlockMoment.isBefore(moment())
    }

    frameClicked(frameData) {
        this.props.daySelected(frameData.number)
        const isUnlocked = this.isFrameUnlocked(frameData);
        if (isUnlocked) {
            this.setState({
                showLightBox: true,
                lightBoxContent: frameData
            });
        }
    }

    warningBypassed() {
        this.setState({
            warningBypassed: true
        })
    }

    render() {
        const { background, Frames, fetchDailyContentRequest } = this.props
        const { frameDataReady, backgroundImageReady, showLightBox, lightBoxContent, loadingAnimationComplete, warningBypassed } = this.state
        if (background.width < 1000 && !warningBypassed) {
            return <ExperienceWarning onBypassWarning={ this.warningBypassed }/>
        } else {
            return (
                <div className="frame-container">
                    <LoadingSplash
                        show={ !frameDataReady || !backgroundImageReady || !loadingAnimationComplete }
                        onAnimationCompletion={ () => this.setState({ loadingAnimationComplete: true }) }
                    />
                    { showLightBox &&
                        <Lightbox
                            fetchDailyData={ fetchDailyContentRequest }
                            dailyData={ lightBoxContent }
                            backgroundHeight={ background.height }
                            onCloseClick={ () => this.setState({ showLightBox: false }) }
                        />
                    }
                    <div style={{ position: 'relative', width: background.height * 1.789916, height: background.height, margin: 'auto' }} ref={ node => this.container = node }>
                        <img
                            src={ windowPic }
                            height={ background.height }
                            onLoad={ () => this.setState({ backgroundImageReady: true }) }
                        />
                        <React.Fragment>
                            <Frame size={ Frames[0].size } offset={ Frames[0].offset } onClick={ () => this.frameClicked(Frames[0]) } isUnlocked={ this.isFrameUnlocked(Frames[0]) }>
                                <CountDown targetEpoch={Frames[0].unlockEpoch}/>
                            </Frame>
                            <Frame size={ Frames[1].size } offset={ Frames[1].offset } onClick={ () => this.frameClicked(Frames[1]) } isUnlocked={ this.isFrameUnlocked(Frames[1]) }>
                                <CountDown targetEpoch={Frames[1].unlockEpoch}/>
                            </Frame>
                            <Frame size={ Frames[2].size } offset={ Frames[2].offset } onClick={ () => this.frameClicked(Frames[2]) } isUnlocked={ this.isFrameUnlocked(Frames[2]) }>
                                <CountDown targetEpoch={Frames[2].unlockEpoch}/>
                            </Frame>
                            <Frame size={ Frames[3].size } offset={ Frames[3].offset } onClick={ () => this.frameClicked(Frames[3]) } isUnlocked={ this.isFrameUnlocked(Frames[3]) }>
                                <CountDown targetEpoch={Frames[3].unlockEpoch}/>
                            </Frame>
                            <Frame size={ Frames[4].size } offset={ Frames[4].offset } onClick={ () => this.frameClicked(Frames[4]) } isUnlocked={ this.isFrameUnlocked(Frames[4]) }>
                                <CountDown targetEpoch={Frames[4].unlockEpoch}/>
                            </Frame>
                        </React.Fragment>   
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    background: state.background,
    isFetchingData: state.frames.isFetching,
    Frames: state.frames.frames
});

const mapDispatchToProps = dispatch => ({
    fetchDaysRequest: (options) => dispatch(fetchDaysRequest(options)),
    fetchDailyContentRequest: (dayNumber, options) => dispatch(fetchDailyContentRequest(dayNumber, options)),
    daySelected: (dayNumber) => dispatch(daySelected(dayNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(FrameContainer);