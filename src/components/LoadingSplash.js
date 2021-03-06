import React from "react"
import anime from "animejs"
import { spring, TransitionMotion, presets } from "react-motion"
import VerticallyCentered from "./layout/VerticallyCentered"
import TitleSVG from "./TitleSVG"
import LoadingSpinner from "./LoadingSpinner"
import wait from "../wait"

class LoadingSplash extends React.Component {
    constructor(props) {
        super(props)
        this.transitionKey = "backgroundOpacity"

        this.willEnter = this.willEnter.bind(this)
        this.willLeave = this.willLeave.bind(this)
        this.getStyles = this.getStyles.bind(this)

    }

    componentDidMount() {
        this.animateSVG = anime({
            targets: '#drawableSVG path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeOutCubic',
            duration: 2500,
            delay: function(el, i) { return i * 0 },
            direction: 'alternate',
            loop: false,
            autoplay: false,
            complete: this.props.onAnimationCompletion
        })
        
        wait(1000).then(this.animateSVG.restart)
    }

    getStyles() {
        if (this.props.show) {
            return [{
                key: this.transitionKey,
                style: { opacity: 1 }
            }]
        }
        return []
    }

    willEnter () {
        return { opacity: 1 }
    }

    willLeave () {
        return { opacity: spring(0, { stiffness: 40, damping: 10 }) }
    }

    render() {
        return (
            <TransitionMotion
                styles={ this.getStyles }
                willEnter={ this.willEnter }
                willLeave={ this.willLeave }
            >
                { interpolatedStyles => {
                    const itemStyles = interpolatedStyles.pop()
                    if (itemStyles) {
                        const { opacity } = itemStyles.style
                        return (
                            <div
                                id="drawableSVG"
                                className="loading-splash"
                                style={{ opacity }}
                            >
                                <VerticallyCentered>
                                    <div className="loading-splash__title">
                                        <TitleSVG />
                                    </div>
                                    <LoadingSpinner className="loading-splash__spinner" size="medium" type="primary" />
                                </VerticallyCentered>
                            </div>
                        )
                    }
                    return null
                }}
            </TransitionMotion>
        )
    }
}

export default LoadingSplash