# Features
- User is able to review all restaurants.
- User can do search by entering keyword into search bar; restaurants will be shown if their "name" or "description" includes keyword.
- Sort feature is supported under review and search page. 
- By clicking "瀏覽" button, user will enter the dedicated page and be able to check restaurants' details.
- By clicking "編輯" button, user will enter the dedicated page and modify the restaurant's detail information.
- By clicking "刪除" button, restaurant will be deleted.
- By clicking "新增餐廳" button, user is able to add/ create a new restaurant. 

<br/>
<br/>

# Getting Started
## Prerequisites
Make sure you already have `Node.js` and `npm` installed.

## Installing
1. Clone the project
2. Go to the project directory
3. Install dependencies
```
npm install
```
5. Connect MongoDB
```
export MONGODB_URI="your MongoDB URI, account, password"
```
6. Apply seed data
```
npm run seed
```
6. Start the server
```
npm run star
```
7. If you see  `Express is running on localhost:3000`  on your terminal, it means the server is running successfully and you can enter following url to check this project:
```
http://localhost:3000
``` 
8. Stop the server
```
control + c
```
<br/>
<br/>

# Tech Stack
- Node
- Express 4.16.4
- Express - Handlebars 3.0.0
- Bootstrap 4.3.1
- Font Awesome 5.8.1
- mongoose 5.9.7
- Method-override 3.0.0

<br/>
<br/>

# My Restaurant List
![Home Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/homePage.png)
---
![Review Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/reviewPage.png)
---
![Edit Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/editPage.png)
---
![Create Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/createPage.png)
