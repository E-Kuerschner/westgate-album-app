import React from "react"
import PropTypes from "prop-types"

class ExperienceWarning extends React.Component {
   render() {
        return (<div className="warning">
            <div className="warning__heading">Wait!</div>
            <p className="warning__message">
                This site performs best when viewed in full-screen at a specific aspect-ratios.
                We have suggested that for a better user experience all users should revisit on a larger device such as a tablet, laptop or home computer.
                <br />
                <br />
                Cheers!
                <br />
                Westgate
            </p>
            <button className="warning__btn" onClick={ this.props.onBypassWarning }>Who cares!? Gimme Westgate, NOW!</button>    
        </div>)
    }
}

ExperienceWarning.propTypes = {
    onBypassWarning: PropTypes.func.isRequired
}

export default ExperienceWarning