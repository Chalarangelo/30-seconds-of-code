---
title: TagInput
tags: components,input,state,intermediate
---

Renders a tag input field.

- Define a `TagInput` component and use the `useState()` hook to initialize an array from `tags`.
- Use `Array.prototype.map()` on the collected nodes to render the list of tags.
- Define the `addTagData` method, which will be executed when pressing the `Enter` key.
- The `addTagData` method calls `setTagData` to add the new tag using the spread (`...`) operator to prepend the existing tags and add the new tag at the end of the `tagData` array.
- Define the `removeTagData` method, which will be executed on clicking the delete icon in the tag.
- Use `Array.prototype.filter()` in the `removeTagData` method to remove the tag using its `index` to filter it out from the `tagData` array.

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
}

.tag-input input:focus {
  outline: transparent;
}

.tags {
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
const TagInput = ({ tags }) => {
  const [tagData, setTagData] = React.useState(tags);
  const removeTagData = indexToRemove => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };
  const addTagData = event => {
    if (event.target.value !== '') {
      setTagData([...tagData, event.target.value]);
      event.target.value = '';
    }
  };
  return (
    <div className="tag-input">
      <ul className="tags">
        {tagData.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span
              className="tag-close-icon"
              onClick={() => removeTagData(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={event => (event.key === 'Enter' ? addTagData(event) : null)}
        placeholder="Press enter to add a tag"
      />
    </div>
  );
};
```

```jsx
ReactDOM.render(
  <TagInput tags={['Nodejs', 'MongoDB']} />,
  document.getElementById('root')
);
```
