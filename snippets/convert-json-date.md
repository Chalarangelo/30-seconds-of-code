### Convert Json Date
 
Convert dates coming from ajax as json to readable format
Example: converts "/Date(1489525200000)/" to "15/2/2017"
 
 ```js
cconst JsonToDate = arr =>
    {
        const dt = new Date(parseInt(arr.toString().substr(6)));
        return dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
    };
 // JsonToDate(/Date(1489525200000)/) -> 15/2/2017
 ```
 
