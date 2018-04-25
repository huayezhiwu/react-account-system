import React, { Component } from 'react';
import Record from './Record';
import CreateRecord from './CreateRecord';
import AmountBox from './AmountBox';
// import { getJSON } from 'jquery';//按需导入
import * as RecordsAPI from '../utils/RecordsAPI';
 
class Records extends Component {
  constructor(){
    super();
    this.state = {
      records: []
      , isLoaded: false
      , error: null
    }
    
    this.addNewRecord = this.addNewRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.credits = this.credits.bind(this);
    this.debits = this.debits.bind(this);
    this.balance = this.balance.bind(this);
  }

  componentDidMount(){
    RecordsAPI.getAll().then(
      response => this.setState({
        "records":response.data
        , "isLoaded": true
      })
    ).catch( error => this.setState({
      "isLoaded": true
      , "error": error
    })
    )
  }

  addNewRecord(record){
    this.setState({
      records: [
        ...this.state.records
        , record
      ]
      , isLoaded: true
      , error: null
    })
  }

  updateRecord(record,data){
    console.log(record)
    const records = this.state.records;
    const recordIndex = records.indexOf(record);
    console.log(recordIndex)
    
    const newRecords = records.map( (item, index) => {
        if(index !== recordIndex) {
            return item;
        }
        return {
            ...item,
            ...data
        };    
    });
    console.log(newRecords)

    this.setState({
      records: newRecords
    })
    
  }

  deleteRecord(record){
    const records = this.state.records;
    const recordIndex = records.indexOf(record);
    const newRecords = records.filter( (item, index) => index !== recordIndex);
    this.setState({records:newRecords})
  }

  credits(){
    let credits = this.state.records.filter(item => item.amount > 0);
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits(){
    let debits = this.state.records.filter(item => item.amount < 0);
    return debits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance(){
    return this.credits() + this.debits();
  }

  

  render() {
    const {records, error, isLoaded} = this.state;
    let recordsComponent;
    if(error){
      recordsComponent = <div>Error: {error.message}</div>;
    }else if(!isLoaded){
      recordsComponent = <div>Loading...</div>;
    }else{
      recordsComponent = (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
                {records.map((record, index) => {
                  return (
                    <Record 
                      key={record.id} 
                      record={record} 
                      handlerEditRecord={this.updateRecord} 
                      handlerDeleteRecord={this.deleteRecord} 
                    />
                  )
                })}
            </tbody>
          </table>
      );
    }

    return (
      <div>
        <h1>Records</h1>
        <div className="row mb-3">
          <AmountBox text="Credit" type="danger" amount={this.credits} />
          <AmountBox text="Debit" type="info"  amount={this.debits}/>
          <AmountBox text="Balance" type="success"  amount={this.balance}/>
        </div>
        <CreateRecord 
            onClick={this.Add}
            onAddNewRecord={this.addNewRecord}
        />
        { recordsComponent }
      </div>
    );
    
  }
}

export default Records;
