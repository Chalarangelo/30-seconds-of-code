---
title: Large factorial
tags: javaScript, Linked-list
firstSeen: 2021-10-2
---

Factorial of large number is time consuming and it may sometimes do not fit inside interger limit and leads to overflow and inaccurate result. This issue can be solved by storing result in linked list. mostly we can use it for scientific calculation

- First, create a class for linked list and implement basic methods like `insert at begining`, `insert at end` and `reverse` 
- implement large factorial function where it calculates factioial of given number and store result in linked list 
- Then reverse the resultant linked list so that we get proper large factorial value

```js
/**
 * linked list implementation
 * @author Prasanna kale
 */
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // insert at begining
    insertAtBegining(element) {
        let newNode = new Node(element);

        // if head is empty then make new node as head
        if (this.head === null) {
            this.head = newNode;
            return this.head;
        }

        newNode.next = this.head;
        this.head = newNode;
        return this.head;

    }

    // insert at end
    insetAtEnd(element) {
        // creating new node
        let newNode = new Node(element);

        // if head is empty then make new node as head
        if (this.head === null) {
            this.head = newNode;
            return this.head;
        }
        // other wise travers til end        
        let tempNode = this.head;
        while (tempNode.next !== null) {
            tempNode = tempNode.next;
        }

        tempNode.next = newNode;
        return this.head;
    }

    // reverse linked list
    reverse() {

        if (this.head === null || this.head.next === null) {
            return this.head;
        }

        let preNode = this.head;
        let currNode = preNode.next;
        let nextNode = currNode.next;
        preNode.next = null;

        while (nextNode !== null) {
            currNode.next = preNode;
            preNode = currNode;
            currNode = nextNode;
            nextNode = nextNode.next;
        }

        currNode.next = preNode;
        this.head = currNode;
        return this.head;
    }

   // toString
    toString() {
        let tempNode = this.head;
        let string = '';
        while (tempNode !== null) {
            string += `[${tempNode.data}]-> `;
            tempNode = tempNode.next;
        }
        string += 'null';
        return string;
    }
}
```

```js
/**
 * @param {Number} val
 * @return {LinkedList} 
 * @author Prasanna kale
 */
const largeFactorial = (val) => {

    let result = new LinkedList();
    let carry = 0;
    result.insertAtBegining(1);  // added 1 manually
    let tempNode = result.head;
    for (let i = 2; i <= val; i++) {


        while (tempNode !== null) {

            let innerResult = tempNode.data * i + carry;

            if (innerResult > 9) {
                carry = Number.parseInt(innerResult / 10);
            }
            else{
                carry = 0;  
            }

            tempNode.data = innerResult % 10;
            tempNode = tempNode.next;
            
        }
        while (carry > 0) {
            result.insetAtEnd(carry % 10)
            carry = Number.parseInt(carry / 10);
        }

        tempNode = result.head;
        carry = 0;

    }

    result.reverse();
    return result.toList();

}
```
```js
// change val to see different result
let val = 1000;
let myRes = _1000Fact(val).toString().replace(/,/g, "");

console.log(`${val}! = ${myRes}\nTotal Digits = ${myRes.length}`);
```
