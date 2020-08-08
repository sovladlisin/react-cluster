import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getWall } from '../../actions/walls'
import { checkToken } from '../../actions/auth/login'
import { stringify } from 'qs';
import ReactLinkify from 'react-linkify';
import { post } from 'jquery';

export class MainParser extends Component {

    static propTypes = {
        getWall: PropTypes.func.isRequired,
        checkToken: PropTypes.func.isRequired,
        new_post: PropTypes.object.isRequired

    }

    state = {
        post_link: "",
        posts: []
    }

    componentDidMount() {
        const $loading_screen = document.getElementById("loading");
        $loading_screen.style.visibility = "hidden"
        this.props.checkToken()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.new_post != nextProps.new_post) {
            const data = nextProps.new_post
            this.setState({ posts: [...this.state.posts, data] })
        }
    }

    handleParse = () => {
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitPostByLink = () => {
        var post_link = this.state.post_link
        if (post_link.indexOf('-') > 0) {
            const post_id = post_link.split('-')[1]
            this.props.getWall(this.props.token.access_token, "-" + post_id, false)
        }
        else {
            if (post_link.indexOf('wall') > 0) {
                // https://m.vk.com/wall7471312_10153?from=feed5_53562639_2823/15
                var step = post_link.split('wall')[1]
                const post_id = step.split('?')[0]
                this.props.getWall(this.props.token.access_token, post_id, true)
            }
            else alert('Данная ссылка не ведет на пост')
        }

    }

    renderPosts = () => {
        const posts = this.state.posts.reverse()
        return posts.map(post => {
            const owner = post.owner_data.response[0]
            const content = post.post_data.response[0]
            var link = "https://vk.com/wall" + content.from_id + "_" + content.id
            var name = ''
            var photo = ''
            if (owner.first_name == undefined) {
                name = owner.name
                photo = owner.photo_200
            }
            else {
                name = owner.first_name + ' ' + owner.last_name
                photo = owner.photo_50
            }

            return (
                <Fragment>
                    <div className="post">
                        <div className="post-header">
                            <img src={photo}></img>
                            <p className="name"><a href={link}>{name}</a></p>
                        </div>
                        <div className="post-body">
                            <div className="text">
                                <ReactLinkify>{content.text}</ReactLinkify>
                            </div>
                            <div className="attachments">
                                {this.renderAttachments(content.attachments)}
                            </div>
                        </div>
                        <div className="post-footer">
                            <p className="likes">Лайки: {content.likes.count}</p>
                            <p className="reposts">Репосты: {content.reposts.count}</p>
                            <p className="comments">Комментарии: {content.comments.count}</p>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }

    renderAttachments = (data) => {
        if (data != undefined) {
            return data.map(item => {
                if (item.type == 'doc') {
                    return (
                        <Fragment>
                            <div className="doc">
                                <a href={item.doc.url}><img src={item.doc.url}></img></a>
                            </div>
                        </Fragment>
                    )
                }
                if (item.type == 'photo') {
                    return (
                        <Fragment>
                            <div className="photo">
                                <img src={item.photo.sizes[4].url}></img>
                            </div>
                        </Fragment>
                    )
                }
                return null
            })

        }
        return null
    }


    render() {
        return (
            <Fragment>
                <div className="add-new-post">
                    <input name="post_link" onChange={this.onChange} placeholder="Введите ссылку на запись"></input>
                    <button id="submit_post" onClick={this.submitPostByLink}>Загрузить запись</button>
                </div>
                <div className="post-container">
                    {this.renderPosts()}

                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getWall,
    checkToken
};

const mapStateToProps = state => ({
    new_post: state.walls.selected,
    token: state.login.token
})

export default connect(mapStateToProps, mapDispatchToProps)(MainParser);
