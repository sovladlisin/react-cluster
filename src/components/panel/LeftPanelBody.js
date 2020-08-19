import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getClusters, getGroupStatus } from '../../actions/clusters';

export class LeftPanelBody extends Component {


    state = {
        groups: [], //temporary
        selected_group: null
    }

    static propTypes = {
        getCluster: PropTypes.func.isRequired,
        getGroupStatus: PropTypes.func.isRequired,
        current_clusters: PropTypes.array.isRequired,
        groups: PropTypes.object.isRequired
    }


    componentDidMount() {
        this.props.getGroupStatus()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current_clusters != nextProps.current_clusters) {
            this.props.setGroupData(nextProps.current_clusters)
        }
    }

    refreshGroup = (id) => {
        this.props.getGroupStatus()
    }

    selectGroup = (id) => {
        // this.props.getClusters(id, id)
        // this.setState({ selected_group: id })
    }

    renderGroups = () => {
        // const self = this
        // const groups = this.state.groups

        const groups = this.props.groups

        return Object.keys(groups).map(id => {
            const group = groups[id]

            const progress = parseInt(group.status.substring(0, group.status.length - 1)) / 100
            const style = {
                width: (progress * 224) + "px"
            }
            return (
                <Fragment>
                    <div className="group-line">
                        <button className="group-name" title={group.name} onClick={() => this.selectGroup(group.id)}>{group.name}</button>
                        <div className="progress">
                            <div className="bar" style={style}></div>
                        </div>
                        <button onClick={() => this.refreshGroup(group.id)}><i className="fas fa-sync-alt"></i></button>
                    </div>
                </Fragment >
            )
        })

        // return groups.map(item => {
        //     const style = {
        //         width: (item.progress * 224) + "px"
        //     }
        //     const highlight_style = item.id == this.state.selected_group ? {
        //         visibility: "visible"
        //     } : null



        //     return (
        //         <Fragment>
        //             <div className="group-line">
        //                 <p onClick={() => this.selectGroup(item.id)}>{item.name}</p>
        //                 <div className="group-highlight" style={highlight_style}><i class="fas fa-eye"></i></div>
        //                 <div className="progress">
        //                     <div className="bar" style={style}></div>
        //                 </div>
        //                 <button onClick={() => self.refreshGroup(item.id)}><i className="fas fa-sync-alt"></i></button>
        //             </div>
        //         </Fragment >
        //     )
        // })

    }

    render() {
        return (
            <Fragment>
                <div className="left-panel">
                    <div className="panel-body">
                        <button id="close" onClick={this.props.toggleLeftPanel}><i className="fas fa-times"></i></button>
                        <p className="title">Панель управления</p>

                        <div className="groups">
                            <p className="block-title">Текущие группы</p>
                            {this.renderGroups()}
                        </div>
                        <div className="new-request">
                            <p className="block-title">Новый анализ</p>
                            <label>Название группы:</label>
                            <input></input>
                            <label>Тип данных:</label>
                            <select defaultValue="1">
                                <option value="1" key="1">Изображение</option>
                                <option value="2" key="2">Текст</option>
                            </select>
                            <label className="data">Данные:</label>
                            <textarea>
                            </textarea>
                            <button className="submit">Отправить</button>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}

const mapDispatchToProps = {
    getGroupStatus
};

const mapStateToProps = state => ({
    groups: state.clusters.group_status,
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanelBody);
