This function takes form element as parameter and return all values of the form as JSON

```
function get_formdata_inJSON(formElement){
    return Object.values(formElement).reduce((obj, field) => { obj[field.name] = field.value; return obj }, {})
}
```
