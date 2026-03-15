import React from "react";
import ListItems from './ListItems'

//import { library } from '@fortawesome/fontawesome-svg-core'
//import { faTrash } from '@fortawesome/free-solid-svg-icons'
//library.add(faTrash)

class HomePage extends React.Component {
  constructor(thing) {
    super(thing)
    this.group_ids = this.getUsersGroups(123)
    this.state = {items:[], currentItem:{ name:'', id:undefined}}
    
    for (let i = 0; i < this.group_ids.length; i++) {
      let temp = { name: this.group_ids[i].name, id: this.group_ids[i].id}
      this.state.items = [...this.state.items, temp]
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  getUsersGroups(user_id) {
    var grp = {
      id : 1,
      name : "yo",
      drawing : {
        id: 4,
        topic: "",
        squares: []
      },
      members: [],
      start_time: "",
      close_time: ""
    }
    return [{ name:grp.name, id:grp.id, drawing:grp.drawing}, { name:grp.name, id:grp.id, drawing:grp.drawing}];
  }

  getGroupName(id) {
    var returner = "error"
    for (let i = 0; i < this.group_ids.length; i++) {
      if (this.group_ids[i].id === id) {
        returner = this.group_ids[i].name
        break
      }
    }
    return returner
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.id !==0){
      const items = [...this.state.items, newItem];
    this.setState({items: items, currentItem:{ name: '', id:undefined}})
    }
  }

  setGroupName(id) {
    this.setState({items: this.items, currentItem:{ name: this.getGroupName(id), id: id}});
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
    items.forEach(item=>{      
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
        <p>{this.state.currentItem.id}</p>
        
          {/* <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/> */}
          <ListItems items={this.state.items} info={this.group_ids}/>

        
      </header>
    </div>
  );
  }

}

export default HomePage;