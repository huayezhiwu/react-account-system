import React, { Component } from 'react';

class AmountBox extends Component {
    
    render(){
        return (
            <div className="col">
                <div className="card">
                    <div className={`card-header text-white bg-${this.props.type}`}>
                        {this.props.text}
                    </div>
                    <div className="card-body">
                        {this.props.amount()}
                    </div>
                </div>
            </div>
        )
    }
}

export default AmountBox;
