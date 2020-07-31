import React, { Component, Fragment } from 'react'

export class LeftPanelBody extends Component {


    state = {
        groups: []//temporary
    }


    componentDidMount(){
        // const $panel = document.getElementsByClassName("left-panel")[0];
        // $panel.animate([
        //     { left: '0' }, 
        //     ],{
        //       duration: 400, 
        //       fill: "forwards", 
        //       easing: "cubic-bezier(0.42, 0, 0.58, 1)"
        //     }
        // );


        // TODO: get actuall groups
        var groups = []
        for (var i = 0; i< 4; i++){
            groups.push({id: i, name: "Группа "+i, progress: Math.random()})
        }

        this.setState({groups: groups})
    }

    refreshGroup = (id) => {
        console.log("TODO: refresh request / id = ", id)
    }
    renderGroups = () => {
        const self = this
        const groups = this.state.groups

        return groups.map(item => {
            const style = {
                width: (item.progress * 224) + "px"
            }
            return (
                <Fragment>
                    <div className="group-line">
                        <p>{item.name}</p>
                        <div className="progress">
                            <div className="bar" style={style}></div>
                        </div>
                        <button onClick={() => self.refreshGroup(item.id)}><i className="fas fa-sync-alt"></i></button>
                    </div>
                </Fragment>
            )
        })
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

export default LeftPanelBody