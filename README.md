## Instructions:

In this lab we will be using the jsonplaceholder API.
Add react-router-dom and redux toolkit to the list of dependncies before you start.

1- Fetch the list of users in this end point:
https://jsonplaceholder.typicode.com/users

2- Create a store and save the fetched users into that store. Your store should reflect wither the request is done or is still loading.

3- Display the list of users in a Table in the `ListUsers.jsx` component.
The Table column should be :
Id, Name, Email, Phone, Action.

4- In the `AddUser.jsx` we should be able to add a new user to that store, and see the changes in the Table from previous component immediatly. After the user is added make sure the router take the user to the home page.

5- In the `ListUsers.jsx` the Action column should have a Buttnon labled as Delete. Once the user Clicks the button the user should be deleted from the store.

6- In the home page we should be able to see the List of users, and there should be a button to take us to the `AddUser.jsx` component.

7- Style to impress :)

BONUS: Have a number that indicate how many users are in the store, and it should update if we add or remove.
