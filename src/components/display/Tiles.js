import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Tiles extends Component {


    state = {
        elements_on_page: 14,
        page_number: 1,
        number_of_clusters: null,
        data: [] //temporary
    }

    static propTypes = {
        data: PropTypes.array.isRequired
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        //TODO - recieve actual data
        var data = []
        for (var i=1; i<20; i++){
            data.push({quant: i, thumbnail: "image_url", images: []})
        }
        this.setState({data: data, number_of_clusters: data.length})
    }


    renderData = () => {
        const data = this.state.data

        const page_number =  this.state.page_number
        const elements_on_page = this.state.elements_on_page
        const start = (page_number - 1) * elements_on_page
        const end = start + elements_on_page

        const output = data.slice(start, end)
        return output.map(item => {
            return (
                    <div key={item.quant} className="tile">
                        <div className="counter">
                            {item.quant}
                        </div>
                        <img url={item.thumbnail}></img>
                    </div>
            )
        })
    }

    render() {
        return (
            <Fragment>
                <div className="tiles">
                    {this.renderData()}
                </div>
                <div className="navigation">
                    <p>Страница: </p>
                    <input type="number" min="1" step="1" name="page_number" value={this.state.page_number} onChange={this.onChange}></input>
                    <p>Число элементов на странице: </p>
                    <input type="number" min="1" max={this.state.number_of_clusters} step="1" name="elements_on_page" value={this.state.elements_on_page} onChange={this.onChange}></input>
                    <p>Всего элементов: {this.state.number_of_clusters}</p>
                </div>
            </Fragment>
        )
    }
}

export default Tiles
