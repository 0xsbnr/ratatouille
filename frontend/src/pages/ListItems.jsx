import React from 'react';
import './ListItems.css';
import { useNavigate } from "react-router-dom";
// import FlipMove from 'react-flip-move';



function ListItems(props){
    const items = props.items;
    const first_group = items[0];
    const navigate = useNavigate();
    const info = props.info;

    const hamdle_draw_nav = () => {
        localStorage.setItem("drawing_id", getGroupDrawID(info,first_group.id));
        localStorage.setItem("group_id", first_group.id); 
        navigate("/drawing");
        window.location.reload()
    }

    function getGroupName(info,id) {
    var returner = "error"
    for (let i = 0; i < info.length; i++) {
      if (info[i].id === id) {
        returner = info[i].name
        break
      }
    }
    return returner
    }

    function getGroupDrawID(info,id) {
    var returner = "error"
    for (let i = 0; i < info.length; i++) {
      if (info[i].id === id) {
        returner = info[i].drawing.id
        break
      }
    }
    return returner
    }

    // const ListItem = items.map (item=> {
    //     return <div className="list" key={item.id}>
    //             <form action={}>
    //                 <button key={item.id} onClick={() => {alert('clicked');}} variant="outlined">{item.name}</button>
    //             </form>
    //         </div>
    // }
    // )


//     const listItems = items.map(item =>
//    {
//        return <ListItem className="list" key={item.id}/>
//     })
//     console.log(listItems)

//this needs to display the itemLists (the components that comtain the groups) [was meant to use the flipmove but that doesnt work]
    for (let i = 0; i < items.length; i++) {
    return (
        <div>
            <h3>{items[i].name}, {items[i].id}</h3>
            <p>Today's Theme is: {getGroupName(info,items[i].id)}! Ready .. Set ..</p>
            <form action={hamdle_draw_nav}>
                <button>DRAW!</button>
            </form>
        </div>
    );
    }

  }

  export default ListItems;