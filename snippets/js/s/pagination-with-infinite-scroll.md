---
title: Pagination with Infinite Scroll
type: snippet
language: javascript
tags: [browser,event,function]
cover: book-stopper
dateModified: 2023-08-21T19:18:29+02:00
---

Implementing efficient pagination using infinite scroll technique for loading large datasets.

- Enhanced user experience with seamless content loading.
- Reduces initial page load time.
- Reduces server load by fetching data only when needed.
- Scalable for handling large datasets.

```js
// Function to fetch and append new data when scrolling
function fetchAndAppendData() {
  const container = document.getElementById('data-container');
  const lastItem = container.lastElementChild;
  const lastItemId = lastItem ? lastItem.dataset.itemId : 0;

  // Fetch new data from the server using an API call
  fetch(`/api/data?lastItemId=${lastItemId}`)
    .then(response => response.json())
    .then(newData => {
      if (newData.length === 0) {
        // No more data to load
        window.removeEventListener('scroll', scrollHandler);
      } else {
        newData.forEach(item => {
          const newItem = createItemElement(item);
          container.appendChild(newItem);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Event handler for scrolling
function scrollHandler() {
  const scrollThreshold = 200; // Pixels before reaching the bottom
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight = window.innerHeight;

  if (scrollHeight - (scrollTop + windowHeight) < scrollThreshold) {
    fetchAndAppendData();
  }
}
```

```js
window.addEventListener('scroll', scrollHandler);
```

**Practical Usage:**

This code is useful for scenarios where you have a large dataset that needs to be displayed in a paginated manner. It optimizes the user experience by loading additional data as the user scrolls down the page. This technique is commonly used in social media feeds, news articles, and any application where displaying a large amount of content is required.

Remember to adapt the code to your specific use case, like adjusting the API endpoints, data structure, and the way you create and append new elements to the DOM.

By implementing efficient pagination with infinite scroll, you'll ensure a smoother user experience and better performance for your application.