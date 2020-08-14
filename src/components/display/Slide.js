import React, { Component, Fragment } from 'react'
import $, { data } from "jquery"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../actions/walls'




export class Slide extends Component {

    state = {
        url: "",
        text_data: []
    }


    componentDidMount() {
        $('.slide-image').on("load", function () {
            $('.text-data').width($('.slide-image').width())
            $('.text-data').height($('.slide-image').height())
        })
        $(window).resize(function () {
            $('.text-data').width($('.slide-image').width())
            $('.text-data').height($('.slide-image').height())
        });
        this.props.getUser(this.props.token.access_token, this.props.item.user_id)
    }

    componentDidUpdate(prevProps) {
        if (this.props.item != prevProps.item) {
            this.props.getUser(this.props.token.access_token, this.props.item.user_id)
        }
    }




    static propTypes = {
        item: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getToken: PropTypes.func.isRequired,
        user: PropTypes.array.isRequired,
        token: PropTypes.object.isRequired
    }



    renderTextData = () => {
        const data = this.props.item.bbs
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
                {Object.keys(this.props.item).length ?
                    <Fragment>
                        <div className="slide" onClick={() => this.props.closeImage()}></div>
                        <div className="data">
                            <div className="container">
                                {Object.keys(this.props.user).length ?
                                    <div className="slide-user-info">
                                        <a target="_blank" rel="noopener noreferrer" href={"https://vk.com/id" + this.props.item.user_id}>
                                            <img className="user-photo" src={this.props.user.response[0].photo_200}></img>
                                        </a>
                                        <p>{this.props.user.response[0].first_name} {this.props.user.response[0].last_name}</p>
                                        <p>ID пользователя: {this.props.item.user_id}</p>
                                        <a target="_blank" rel="noopener noreferrer" href={"https://vk.com/id" + this.props.item.user_id}>
                                            {"https://vk.com/id" + this.props.item.user_id}
                                        </a>
                                        <p>Пост:</p>
                                        <a target="_blank" rel="noopener noreferrer" href={"https://vk.com/wall" + this.props.item.user_id + "_" + this.props.item.post_id}>
                                            {"https://vk.com/wall" + this.props.item.user_id + "_" + this.props.item.post_id}
                                        </a>

                                        {/* <a id="post-link" href={"https://vk.com/wall" + this.props.item.user_id + "_" + this.props.item.post_id}>
                                            Оригинал
                                        </a> */}
                                    </div>
                                    : null}

                                <img className="slide-image" src={this.props.item.image_url}></img>
                            </div>
                            <div className="container">
                                <div className="text-data">
                                    {this.renderTextData()}
                                </div>
                            </div>
                        </div>
                        <button id="close-slide" onClick={this.props.closeImage}><i className="fas fa-times"></i></button>


                    </Fragment>
                    : null}
            </Fragment>
        )
    }
}


const mapDispatchToProps = {
    getUser,
};

const mapStateToProps = state => ({
    user: state.walls.user,
    token: state.login.token
})

export default connect(mapStateToProps, mapDispatchToProps)(Slide);