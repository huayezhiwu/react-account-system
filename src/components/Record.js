import React from 'react';
import PropTypes from 'prop-types';
import * as RecordAPI from '../utils/RecordsAPI';

export default class Record extends React.Component {
    constructor(){
        super();
        this.state = {
            'edit': false
        }
        this.handlerToggle = this.handlerToggle.bind(this);
        this.handlerEdit = this.handlerEdit.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
        
    }

    handlerToggle(){
        this.setState({
            edit: !this.state.edit
        })
    }

    handlerEdit(e){
        e.preventDefault();
        const record = {
            date: this.refs.date.value
            , title: this.refs.title.value
            , amount: this.refs.amount.value
        }
        RecordAPI.update(this.props.record.id, record).then(
            response => {
                this.props.handlerEditRecord(this.props.record,response.data);
                this.setState({
                    edit: !this.state.edit
                })
            }
        ).catch(
            error => {
                console.log(error.message)
            }
        )
       
    }

    handlerDelete(e){
        e.preventDefault();
        RecordAPI.remove(this.props.record.id).then(
            reponse => {
                this.props.handlerDeleteRecord(this.props.record)
                
            }
        ).catch(
            error => {
                console.log(error.message);
            }
        )
    }

    recordRow(){
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button onClick={this.handlerToggle} className="btn btn-info mr-1">Edit</button>
                    <button onClick={this.handlerDelete} className="btn btn-danger mr-1">Delete</button>
                </td>
            </tr>
        );
    }
    recordForm(){
        return (
            <tr>
                <td><input type="text" ref="date" defaultValue={this.props.record.date} /></td>
                <td><input type="text" ref="title" defaultValue={this.props.record.title} /></td>
                <td><input type="text" ref="amount" defaultValue={this.props.record.amount} /></td>
                <td>
                    <button onClick={this.handlerEdit} className="btn btn-info mr-1">Update</button>
                    <button onClick={this.handlerToggle} className="btn btn-danger mr-1">Cancel</button>
                </td>
            </tr>
        );
    }
    // shouldComponentUpdate () {

    // }
    render() {
        if(this.state.edit){
            return this.recordForm();
        }else{
            return this.recordRow();
        }
       
    }
}
Record.propTypes = {
    id: PropTypes.string
    , data: PropTypes.string
    , title: PropTypes.string
    , amount: PropTypes.number
}
