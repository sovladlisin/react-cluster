import React, { Component, Fragment } from 'react'

export class Slide extends Component {

    state = {
        url: ""
    }


    componentDidMount() {
        this.setState({ url: this.props.item.image_url })
    }


    render() {
        return (
            <Fragment>
                <div className="slide" onClick={() => this.props.closeImage()}></div>
                <div className="container">
                    <img className="slide-image" src={this.state.url}></img>
                </div>
            </Fragment>
        )
    }
}

export default Slide
