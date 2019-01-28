### Carousel

Renders a carousel component.

Initially set `state.active` to `0` (index of the first item).
Use an object, `style`, to hold the styles for the individual components.
Define a method, `setActiveItem`, which uses `this.setState` to change the state's `active` property to the index of the next item.
Define another method, `changeItem`, which is called by `setActiveItem` after updating the state each time and also when the component
first renders (on `ComponentDidMount`).
In the `render()` method, destructure `state`, `style` and `props`, compute if visibility style should be set to `visible` or not for each carousel item while mapping over and applying the combined style to the carousel item component accordingly.
Render the carousel items using [React.cloneElement](https://reactjs.org/docs/react-api.html#cloneelement) and pass down rest
`props` along with the computed styles.

```jsx
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
    this.scrollInterval = null;
    this.style = {
      carousel: {
        position: "relative"
      },
      carouselItem: {
        position: "absolute",
        visibility: "hidden"
      },
      visible: {
        visibility: "visible"
      }
    };
  }
  componentDidMount() {
    this.changeItem();
  }
  setActiveItem = () => {
    const { carouselItems } = this.props;
    this.setState(
      prevState => ({
        active: (prevState.active + 1) % carouselItems.length
      }),
      this.changeItem
    );
  };
  changeItem = () => {
    this.scrollInterval = setTimeout(this.setActiveItem, 2000);
  };
  render() {
    const { carouselItems, ...rest } = this.props;
    const { active } = this.state;
    const { visible, carousel, carouselItem } = this.style;
    return (
      <div style={carousel}>
        {carouselItems.map((item, index) => {
          const activeStyle = active === index ? visible : {};
          return React.cloneElement(item, {
            ...rest,
            style: {
              ...carouselItem,
              ...activeStyle
            }
          });
        })}
      </div>
    );
  }
}
```

```jsx
ReactDOM.render(
  <Carousel
    carouselItems={[
      <div>carousel item 1</div>,
      <div>carousel item 2</div>,
      <div>carousel item 3</div>
    ]}
  />,
  document.getElementById("root")
);
 ```

<!-- tags: visual,children,state,class -->

<!-- expertise: 2 -->
 
