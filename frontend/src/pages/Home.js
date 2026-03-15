import React from "react";
import ListItems from './ListItems'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

class HomePage extends React.Component {
  constructor(thing) {
    super(thing)
    this.group_ids = this.getUsersGroups(123)
    this.state = {items:[], currentItem:{ name:'', id:0}}
    
    for (let i = 0; i < this.group_ids.length; i++) {
      let temp = { name: this.getGroupName(this.group_ids[i]), id: this.group_ids[i]}
      this.state.items = [...this.state.items, temp]
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  getUsersGroups(user_id) {
    const idList  = [1234,5678,9123];
    return idList;
  }

  getGroupName(group_id) {
    return "GroupNamed" + group_id;
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.id !==0){
      const items = [...this.state.items, newItem];
    this.setState({items: items, currentItem:{ name: '', id:0}})
    }
  }

  setGroupName(id) {
    this.state.currentItem.name = this.getGroupName(id);
  }

  handleInput(e){
    this.setState({currentItem:{name: this.setGroupName(e.target.value),id: e.target.value}})
  }

  deleteItem(id){
    const filteredItems= this.state.items.filter(item =>
      item.id!==id);
    this.setState({items: filteredItems})
  }

  setUpdate(name,id){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.id===id){
        console.log(item.id +"    "+id)
        item.name= name;
      }
    })
    this.setState({items: items})
  }

  render() {
  return (
    <div className="HomePage">
      <header>
        <form id="groups-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter group ID" value= {this.state.currentItem.id} onChange={this.handleInput}></input>
          <button type="Add group">Add</button>
        </form>
        <p>{this.state.items.id}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
  }

}

export default HomePage;