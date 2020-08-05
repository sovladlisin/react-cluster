import React, { Component, Fragment } from 'react'

export class Slide extends Component {

    state = {
        url: ""
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.url != nextProps.url) {
            this.setState({ url: nextProps.url })
        }
    }


    render() {
        return (
            <Fragment>
                <div className="slide" onClick={() => this.props.closeImage()}></div>
                <div className="container">
                    <img className="slide-image" src={this.props.url}></img>
                </div>
            </Fragment>
        )
    }
}

export default Slide
