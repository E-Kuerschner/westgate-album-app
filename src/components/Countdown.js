/**
 * Created by Erich on 1/21/2017.
 */
import PropTypes from "prop-types";
import React, { Component } from 'react';
import moment from "moment";
import VerticallyCentered from './layout/VerticallyCentered';

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
        const target = this.props.targetEpoch;
        const now = moment().unix();
        const diff = target - now;
        const duration = moment.duration(diff * 1000, "milliseconds");
        const days = duration.days() > 0 ? `${ duration.days() }d` : "";
        const hours = duration.hours() >= 0 ? `${ duration.hours() }h` : "";
        const minutes = duration.minutes() >= 0 && duration.hours() > 0 ? `${ duration.minutes() }m` : "";
        const seconds = duration.seconds() >= 0 && duration.minutes() > 0 && duration.days() < 1 ? `${ duration.seconds() }s` : "";

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
    targetEpoch: PropTypes.number.isRequired
}

export default Countdown;