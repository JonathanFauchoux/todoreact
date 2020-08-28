import React, {Component} from 'react';
import ListItems from './components/ListItems'

import './App.css';

export default class App extends Component{
  constructor(props){
    super()
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key: ''
      }
    }
  }
//recupérer la value input et setState({})
  handleInput = (ev) =>{
    this.setState({
      currentItem :{
        text : ev.target.value,
        key: Date.now()
      }
      
    })
    ev.target.value = ''
    this.saveStateToLocalStorage()
  }
  //add
  addItem = (ev) =>{
    ev.preventDefault()
    
    const newItem = this.state.currentItem
   // console.log(newItem.text)
    if(newItem.text !== ''){
      const newItems = [...this.state.items, newItem]
      this.setState({
        items : newItems,
        currentItem : {
          text:'',
          key:''
        }
        
      })  
      this.state.items = newItems
    }
    this.saveStateToLocalStorage()
  }
  //delete
  deleteItem =(key)=>{
    const filteredItems = this.state.items.filter(item => item.key!==key)
    this.setState({
      items : filteredItems
    })
    this.saveStateToLocalStorage()
   }

   //editer
   setUpdate =(text, key)=>{
     const items = this.state.items
    items.forEach((item) => {
      if(item.key===key){
        item.text = text
      }
    })
    this.setState({
      items : items
    })
    this.saveStateToLocalStorage()
   }

   //setLocalStorage
   saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  componentDidMount() {
    const state = localStorage.getItem('state')
    if (state) {
      this.setState(JSON.parse(state))
    }
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <form className="todoBoard" onSubmit={this.addItem}>

            <input type="text" 
            placeholder="New todo here ..." 
            value={this.state.currentItem.text} 
            onChange={this.handleInput}
            />

            <button className="addBtn" type="submit">Add</button>
          </form>
          
        </header>
        <ListItems 
          data={this.state.items} 
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    );
  }
}


