import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';


class CreateRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            'date': ''
            , 'title': ''
            , 'amount': ''
        }

        this.valid = this.valid.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerChange(event){
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ));

    }

    handlerSubmit(event){
        event.preventDefault();
        const data = {
            date: this.state.date
            , title: this.state.title
            , amount: parseInt(this.state.amount, 0)
        }
        RecordsAPI.create(data).then(
            response => {
                this.props.onAddNewRecord(response.data);
                this.setState({
                    date: ''
                    , title: ''
                    , amount: ''
                })
            }
        ).catch(
            error => console.log(error.message)
        )

    }

    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }
    render() {
        return (
            <form className="form-inline">
                <div className="form-group mr-1">
                    <input type="text" name="date" className="form-control" onChange={this.handlerChange} placeholder="Date" value={this.state.date} />            
                </div>
                <div className="form-group mr-1">
                    <input type="text" name="title" className="form-control" onChange={this.handlerChange} placeholder="Title" value={this.state.title} />            
                </div>
                <div className="form-group mr-1">
                    <input type="text" name="amount" className="form-control" onChange={this.handlerChange} placeholder="Amount" value={this.state.amount} />            
                </div>
                <button className="btn btn-primary" onClick={this.handlerSubmit} disabled={!this.valid()}>Create Record</button>
            </form>
        )
        
    }
}
export default CreateRecord;

