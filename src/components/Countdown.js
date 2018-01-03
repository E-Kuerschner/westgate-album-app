/**
 * Created by Erich on 1/21/2017.
 */
import PropTypes from "prop-types";
import React, { Component } from 'react';
import moment from "moment";
import VerticallyCentered from './VerticallyCentered';

class Countdown extends Component {
    constructor(props) {
        super(props);

        this.state = { timeRemaining: this._formatTime() };

        this.timer = setInterval(( ) => {
            this.setState({
                timeRemaining: this._formatTime()
            });
        }, 1000);

        this._formatTime = this._formatTime.bind(this);
    }
    

    _formatTime() {
        const target = this.props.targetMoment.unix();
        const now = moment().unix();
        const diff = target - now;
        const duration = moment.duration(diff * 1000, "milliseconds");
        const days = duration.days() > 0 ? `${ duration.days() }D` : "";
        const hours = duration.hours() >= 0 ? `${ duration.hours() }H` : "";
        const minutes = duration.minutes() >= 0 && duration.hours() > 0 ? `${ duration.minutes() }M` : "";
        const seconds = duration.seconds() >= 0 && duration.minutes() > 0 ? `${ duration.seconds() }S` : "";

        return `${ days } ${ hours } ${ minutes } ${ seconds }`;
    }

    render() {
        return (
            <VerticallyCentered>
                <div className="countdown">
                    {this.state.timeRemaining}
                </div>
            </VerticallyCentered>
        );
    }
}

Countdown.propTypes = {
    targetMoment: PropTypes.instanceOf(moment).isRequired
}

export default Countdown;