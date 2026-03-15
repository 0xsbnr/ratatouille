import React from 'react';
import './ListItems.css';
// import FlipMove from 'react-flip-move';



function ListItems(props){
    const items = props.items;

    const ListItem = (item) => {
    return (
     <p>
        <Button key={item.id} onClick={() => {alert('clicked');}} variant="outlined">{item.name}</Button>
        
     </p>
    )
}


    const listItems = items.map(item =>
   {
       return <ListItem className="list" key={item.id}/>
    })
    console.log(listItems)

//this needs to display the itemLists (the components that comtain the groups) [was meant to use the flipmove but that doesnt work]
    return (
        <div>
            {listItems}
        </div>
    );

  }

  export default ListItems;