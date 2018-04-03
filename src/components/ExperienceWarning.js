import React from "react"
import PropTypes from "prop-types"

class ExperienceWarning extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (<div>
            <div>Wait!</div>
            <p>
                This site performs best when viewed in full-screen at specific aspect-ratios.
                We have suggested that for a better user experience all users should revisit on a larger device such as a tablet, laptop or home computer.
                
                Thanks,
                Westgate
            </p>
            <button onClick={ this.props.onBypassWarning }>Who cares!? Gimme Westgate, NOW!</button>    
        </div>)
    }
}

ExperienceWarning.propTypes = {
    onBypassWarning: PropTypes.func.isRequired
}

export default ExperienceWarning