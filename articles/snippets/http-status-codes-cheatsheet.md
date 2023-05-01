---
title: Common HTTP status codes Cheat Sheet
shortTitle: HTTP status codes
type: cheatsheet
tags: [webdev,http]
author: chalarangelo
cover: lake-runner
excerpt: Familiarize yourself with the most common HTTP status codes with this handy cheatsheet.
dateModified: 2021-06-12T19:30:41+03:00
---

### 1xx - Informational

- **100**: Continue - Everything is ok so far
- **102**: Processing - Request is being processed, no response available yet

### 2xx - Success

- **200**: OK - Request successful
- **201**: Created - Request fulfilled, new resource has been created

### 3xx - Redirection

- **301**: Moved Permanently - Resource permanently moved to a new URL
- **302**: Moved Temporarily - Resource temporarily moved to a new URL

### 4xx - Client Error

- **400**: Bad Request - Server cannot understand and process the request
- **401**: Unauthorized - Authentication required, user not yet authenticated
- **403**: Forbidden - Insufficient access permissions to the resource
- **404**: Not Found - Requested resource not found
- **410**: Gone - Request no longer available due to intentional removal

### 5xx - Server Error

- **500**: Internal Server Error - Generic unhandled server error
- **502**: Bad Gateway - Gateway server got an invalid response
- **503**: Service Unavailable - Server temporarily unable to handle request
- **504**: Gateway Timeout - Gateway server didn't get a response in time
