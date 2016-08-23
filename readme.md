## Events as a linked list vs a calendar queue


### Intro:

I used this project to experiment with data structures and examine the trade offs between them. In particular I'm testing out a class that holds time as a queue vs a linked list. 

#### Calendar Queue
In this the data is represented as a list of lists. The outer list holds days and the inner lists hold the events per day. One advantage is that it can hold metadata about the day. One disadvantage is that it doesn't handle boundary cases very well such as an event that starts on one day and ends on another. 

#### Linked List 
Here the data is represented as a linked list. Since Javascript doesn't support pointers, I used array indexes. The advantage of using a linked list is that its fluid just like time. Unlike a calendar queue it doesn't have to represent a fixed number of days. It can represent an infinite amount of time if you replace the traditional null terminator for linked lists with infinity. This makes ordering events and generating freetime slots easier. One disadvantage is an inability to hold information about individual days. Another is that the list needs to be traversed whenever an event is inserted and this is very time intensive.  