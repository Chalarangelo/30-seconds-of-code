---
title: Tag input field
language: react
tags: [components,input,state]
cover: interior-4
excerpt: Create a custom input field with selectable tags, using React.
listed: true
dateModified: 2024-06-15
---

Tag input fields have become a common feature in modern web applications. They allow users to add **multiple tags** to a form or search field. While this all might sound complicated, it's actually fairly simple to implement with React.

Starting with the component's props, we'll only need to store the initial `tags` array in a state variable. Then, using `Array.prototype.map()`, we'll render the list of tags. The `addTagData` method will be called when the user presses the `Enter` key, and the `removeTagData` method will be called when the user clicks the delete icon in the tag.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <TagInput tags={['Nodejs', 'MongoDB']} />
);
```
