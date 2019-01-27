### Tab
Render a menu and a view, change the content in the view by clicking the button in the menu and the callback will execute before render 

Define the `TabItem` as a middleware, pass it to the `Tab` and remove the useless nodes expect `TabItem` by identify the function's name in `props.children`, after that we will use the collected nodes to render the `tab-menu` and `tab-view` with map. Buttons in the `tab-menu` will execute `changeTab`
when been clicked, `changeTab` will execute the callback funciton(`onTabClick`) and change `bindIndex` to emit `render`,every node in `tab-view` use `bindIndex` and the `index` which ws passing from `TabItem` to judege whether it show of not(`itemStyle`)


```jsx
class Tab extends React.Component{
  constructor(props){
    super(props)
    this.changeTab(props.defaultIndex)
    this.state = {
      bindIndex:''
    }
  }

  changeTab(newIndex){
    if(typeof this.props.onTabClick === 'function'){
        this.props.onTabClick(newIndex)
    }
    this.setState({
      bindIndex: newIndex
    })
  }

  itemStyle(index){
    return {
      display:this.state.bindIndex === index?'block':'none'
    }
  }

  render(){
    const items = this.props.children
                      .filter(item=>item.type.name==='TabItem')
    return (
      <div className='wrapper'>
        <div className='tab-menu'>
          {items.map(({props:{index, label}})=><button onClick={()=>this.changeTab(index)}>{label}</button>)}
        </div>
        <div className='tab-view'>
          {items.map(({props})=>(
                     <div {...props}
                       className='tab-view_item' 
                       key={props.index} 
                       style={this.itemStyle(props.index)}/>))}
        </div>
      </div>
    )
  }
}

function TabItem(props){
  return <div {...props}></div>
}
```
```jsx
ReactDOM.render(
  <Tab defaultIndex='1' onTabClick={console.log}>
    <TabItem label='item1' index='1'>item1</TabItem>
    <TabItem label='item2' index='2'>item2</TabItem>
  </Tab>,
  document.getElementById('root')
);
```

<!-- tags: visual,children,class -->

<!-- expertise: 1 -->