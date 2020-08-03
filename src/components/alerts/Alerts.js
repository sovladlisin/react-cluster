import React, { Component } from 'react'

export class Alerts extends Component {


    cancel = () => {
        this.props.toggleAlerts()
    }

    render() {
        return (
            <div className="alert-message">
                <p>{this.props.message}</p>
                <button>Подтвердить</button>
                <button onClick={this.cancel}>Отмена</button>
            </div>
        )
    }
}

export default Alerts
