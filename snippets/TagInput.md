---
title: TagInput
tags: components,input,state,intermediate
---

Renders a tag input field.

- Define a `TagInput` component and use `React.useState()` hook to initialize an array with tags passed as `props`.
- Use `Array.prototype.map()` on collected nodes to render the list of tags.
- Define the `addTags` method, which will be executed on pressing the `Enter` key.
- The `addTags` method uses the `setTags` method to add the new tag using the spread (`...`) operator to prepend the existing tags and adds the new tag at the end of the `tags` array.
- Define the `removeTags` method, which will be executed on clicking the delete icon in the tag.
- Use `Array.prototype.filter()` in `removeTags` method to remove the tag using the `index` of the tag to filter it out from `tags` array.

```css
.tag-input {
  display: flex;
  flex-wrap: wrap;
  min-height: 48px;
  padding: 0 8px;
  border: 1px solid #d6d8da;
  border-radius: 6px;
}
.tag-input input {
  flex: 1;
  border: none;
  height: 46px;
  font-size: 14px;
  padding: 4px 0 0;
  &:focus {
    outline: transparent;
  }
}
#tags {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0;
}
.tag {
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 8px;
  font-size: 14px;
  list-style: none;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  background: #0052cc;
}
.tag-title {
  margin-top: 3px;
}
.tag-close-icon {
  display: block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 14px;
  margin-left: 8px;
  color: #0052cc;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}
```

```jsx
function TagInput(props) {
  const [tags, setTags] = React.useState(props.tags);
  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = event => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="tag-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={event => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
    </div>
  );
}
```

```jsx
ReactDOM.render(<TagInput tags={['Nodejs', 'MongoDB']}/>, document.getElementById('root'));
```
