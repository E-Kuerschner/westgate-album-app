import React from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import BackgroundImage from './BackgroundImage';
import HorizontallyCentered from './HorizontallyCentered';
import Frame from './Frame';
import Lightbox from "./Lightbox";
import CountDown from './Countdown';

class FrameContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLightBox: false,
            lightBoxContent: null
        };

        this.frameClicked = this.frameClicked.bind(this);
    }

    frameClicked({ countDownTill, link }) {
        const isUnlocked = countDownTill.isBefore(moment());
        if (isUnlocked) {
            this.setState({
                showLightBox: true,
                lightBoxContent: link
            });
        } else {
            alert("Please wait, would you?");
        }
    }

    render() {
        const { background, Frames } = this.props;
        return (
            <div className="container">
                { this.state.showLightBox && (
                    <Lightbox link={ this.state.lightBoxContent } backgroundWidth={ background.width } onCloseClick={ () => this.setState({ showLightBox: false }) } />
                )}
                <HorizontallyCentered>
                    <div style={{position: 'relative'}}>
                        <BackgroundImage width={300} height={300} />
                        <Frame size={ Frames[0].size } offset={ Frames[0].offset } onClick={ () => this.frameClicked(Frames[0]) } isUnlocked={ Frames[0].countDownTill.isBefore(moment()) }>
                            <CountDown targetMoment={Frames[0].countDownTill}/>
                        </Frame>
                        <Frame size={ Frames[1].size } offset={ Frames[1].offset } onClick={ () => this.frameClicked(Frames[1]) } isUnlocked={ Frames[1].countDownTill.isBefore(moment()) }>
                            <CountDown targetMoment={Frames[1].countDownTill}/>
                        </Frame>
                        <Frame size={ Frames[2].size } offset={ Frames[2].offset } onClick={ () => this.frameClicked(Frames[2]) } isUnlocked={ Frames[2].countDownTill.isBefore(moment()) }>
                            <CountDown targetMoment={Frames[2].countDownTill}/>
                        </Frame>
                        <Frame size={ Frames[3].size } offset={ Frames[3].offset } onClick={ () => this.frameClicked(Frames[3]) } isUnlocked={ Frames[3].countDownTill.isBefore(moment()) }>
                            <CountDown targetMoment={Frames[3].countDownTill}/>
                        </Frame>
                        <Frame size={ Frames[4].size } offset={ Frames[4].offset } onClick={ () => this.frameClicked(Frames[4]) } isUnlocked={ Frames[4].countDownTill.isBefore(moment()) }>
                            <CountDown targetMoment={Frames[4].countDownTill}/>
                        </Frame>
                    </div>
                </HorizontallyCentered>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    background: state.background,
    Frames: state.frames
});

export default connect(mapStateToProps)(FrameContainer);