import React, { Component, Fragment } from 'react'
import $, { data } from "jquery"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../actions/walls'
import { updateCertificateBlocks } from '../../actions/clusters'




export class Slide extends Component {

    state = {
        url: "",
        text_data: [],
        text_blocks: [],

        selected_block: { id: null, h: null, w: null }
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
        this.setState({ text_blocks: this.transformTextBlocks(this.props.item.text_blocks) })
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.item != prevProps.item) {
    //         this.props.getUser(this.props.token.access_token, this.props.item.user_id)
    //         console.log('test')
    //     }
    // }




    static propTypes = {
        item: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getToken: PropTypes.func.isRequired,
        updateCertificateBlocks: PropTypes.func.isRequired,
        user: PropTypes.array.isRequired,
        token: PropTypes.object.isRequired
    }



    renderTextData = () => {
        const data = this.state.text_blocks

        if (data != undefined) {

            return data.map(block => {
                var font_size = block.h * 40 > 0.7 ? block.h * 40 : 0.7
                font_size = font_size > 1.2 ? 1.2 : font_size

                const style = {
                    fontSize: font_size + 'em',
                }
                if (this.state.selected_block.id === block.y) {
                    style['height'] = this.state.selected_block.h
                    return (<textarea onChange={this.onTextAreaChange} name={block.y} style={style}>{block.text}</textarea>)
                }
                return (
                    <p onClick={(e) => { this.selectBlock(e, block.y) }} style={style} > {block.text}</p >
                )
            })
        }

        return null
    }

    selectBlock = (e, h) => {
        this.setState({ selected_block: { id: h, h: $(e.target).height(), w: $(e.target).width() } })
    }

    onTextAreaChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        var text_blocks = this.state.text_blocks



        var foundIndex = text_blocks.findIndex(item => item.y + '' == name)
        var new_data = text_blocks[foundIndex]
        new_data['text'] = value
        console.log(new_data)
        text_blocks[foundIndex] = new_data


        this.setState({ text_blocks: text_blocks })
    }

    transformTextBlocks = (data) => {
        var text_data = {}
        data.map(item => {

            const height = Number(item.h)
            const width = Number(item.w)
            const x = Number(item.x)
            const y = Number(item.y)
            const text = item.text


            if (Object.keys(text_data).length == 0) {
                text_data[y] = []
                text_data[y] = [...text_data[y], { h: height, w: width, x: x, y: y, text: text }]
            }
            else {
                for (var i = 0; i < Object.keys(text_data).length; i++) {
                    const key = Object.keys(text_data)[i]
                    if (Math.abs(key - y) < 0.07 && Math.abs(height - text_data[key][0].h) < 0.02) {
                        text_data[key] = [...text_data[key], { h: height, w: width, x: x, y: y, text: text }]
                        break
                    }
                    if (i == Object.keys(text_data).length - 1) {
                        text_data[y] = []
                        text_data[y] = [...text_data[y], { h: height, w: width, x: x, y: y, text: text }]
                        break
                    }
                }
            }
        })

        var new_text_blocks = []
        Object.keys(text_data).map(id => {
            const temp = text_data[id]

            var new_text = ""
            temp.map(line => {
                new_text = new_text + line.text + ' '
            })
            var new_block = { h: temp[0].h, w: temp[0].w, x: temp[0].x, y: temp[0].y, text: new_text }

            new_text_blocks.push(new_block)
        })

        return new_text_blocks
    }

    saveTextBlocks = () => {
        const data = this.state.text_blocks.filter(item => item.text.length > 0)
        this.props.updateCertificateBlocks(this.props.item.id, data)
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
                                <button onClick={this.saveTextBlocks} className="save-text-blocks"><i className="far fa-save"></i>Сохранить изменения</button>
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
    updateCertificateBlocks
};

const mapStateToProps = state => ({
    user: state.walls.user,
    token: state.login.token
})

export default connect(mapStateToProps, mapDispatchToProps)(Slide);