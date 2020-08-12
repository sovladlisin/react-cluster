import React, { Component, Fragment } from 'react'
import $, { data } from "jquery"


export class Slide extends Component {

    state = {
        url: "",
        text_data: []
    }


    componentDidMount() {
        $('.slide-image').on("load", function () {
            $('.text-data').width($('.slide-image').width())
        })
        $(window).resize(function () {
            $('.text-data').width($('.slide-image').width())
        });

        this.setState({ url: this.props.item.image_url, text_data: this.props.item.bbs })
    }

    renderTextData = () => {
        const data = this.state.text_data
        var text_data = {}
        data.map(item => {

            const height = Number(item.h)
            const width = Number(item.w)
            const x = Number(item.x)
            const y = Number(item.y)
            const text = item.text


            if (Object.keys(text_data).length == 0) {
                text_data[y] = []
                text_data[y] = [...text_data[y], { height: height, width: width, x: x, y: y, text: text }]
            }
            else {
                for (var i = 0; i < Object.keys(text_data).length; i++) {
                    const key = Object.keys(text_data)[i]
                    if (Math.abs(key - y) < 0.07 && Math.abs(height - text_data[key][0].height) < 0.02) {
                        text_data[key] = [...text_data[key], { height: height, width: width, x: x, y: y, text: text }]
                        break
                    }
                    if (i == Object.keys(text_data).length - 1) {
                        text_data[y] = []
                        text_data[y] = [...text_data[y], { height: height, width: width, x: x, y: y, text: text }]
                        break
                    }
                }
            }
        })

        console.log(text_data)

        return Object.keys(text_data).map(id => {
            const temp = text_data[id]
            if (temp[0] != undefined) {
                var p_text = ''
                temp.map(line => {
                    p_text = p_text + line.text + ' '
                })


                var font_size = temp[0].height * 40 > 0.7 ? temp[0].height * 40 : 0.7
                font_size = font_size > 1.2 ? 1.2 : font_size

                const style = {
                    fontSize: font_size + 'em',
                }
                return (
                    <p style={style}>{p_text}</p>
                )
            }
        })
    }


    render() {
        return (
            <Fragment>
                <div className="slide" onClick={() => this.props.closeImage()}></div>
                <div className="data">
                    <div className="container">
                        <img className="slide-image" src={this.state.url}></img>
                    </div>
                    <div className="container">
                        <div className="text-data">
                            {this.renderTextData()}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Slide
