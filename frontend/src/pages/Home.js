import React from "react";

class HomePage extends React.Component {
  constructor(group_ids) {
    super()
    this.group_ids = group_ids
    this.state = {items:[], currentItem:{ name:'', id:0}}
    
    for (let i = 0; i < group_ids.length; i++) {
      let temp = { name: '', id: group_ids[i]}
      this.state.items = [...this.state.items, temp]
    }
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
    this.setState({items: items, currentItem:{ name:'', id:0}})
    }
  }

  setState(e) {

  }

  render() {
  return (
    <div className="HomePage">
      <header>
        <form id="groups-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter group ID" value= {this.state.currentItem.id} onChange={this.handleInput}></input>
          <button type="Add group">Add</button>
        </form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
  }

}

let groups = new HomePage(getUsersGroups(user_id))