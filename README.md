# Features
- With account management system (register via email or Facebook), users can create their own restaurant list easily.
- User is able to review all restaurants at home page.
- User can do search by entering keyword into search bar; restaurants will be shown if their "name" or "description" includes keyword.
- Sort feature is supported under review and search page. 
- User can easily review, edit, delete or create their restaurant list.

<br/>
<br/>

# Getting Started
## **Prerequisites**
Make sure you already have `Node.js` and `npm` installed, and have `MongoDB` account.

<br>

## **Installing**
1. Clone the project
2. Go to the project directory
3. Install dependencies
```
npm install
```

<br/>

4. Prepare your `.env` file. Please refer to `.env.example` for more details. 

<br/>

5. (optional) Apply seed data.  
There are two seed users are prepared for test:
```
npm run seed1
npm run seed2
```

<br/>

6. Start the server
```
npm run star
```

<br/>

7. If you see  `Express is running on localhost:3000`  on terminal, it means the server is running successfully and you can enter following url to check this project:
```
http://localhost:3000
``` 

<br/>

8. (optional) Login test with seed users: if you follow step 5 to generate seed users, you can log-in with following accounts:
- **Seed User 1**:  
  email: user1@example.com  
  password: 12345678
- **Seed User 2**:  
  email: user2@example.com  
  password: 12345678  

<br>

9. Stop the server
```
control + c
```
<br/>
<br/>

# Tech Stack
- Node
- Express 4.16.4
- Express - Handlebars 3.0.0
- Express-session 1.17.1
- Bootstrap 4.3.1
- Font Awesome 5.8.1
- Mongoose 5.9.7
- Method-override 3.0.0
- bcryptjs 2.4.3
- connect-flash 0.1.1
- dotenv 8.2.0
- passport 0.4.1
- passport-facebook 3.0.0, passport-local 1.0.0

<br/>
<br/>

# My Restaurant List
![Home Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/homePage.png)
---
![Create Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/createPage.png)
---
![Login Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/loginPage.png)
---
![Rrgister Page](https://github.com/Yunya-Hsu/S2-3_W1_A1_restaurant-list/blob/main/public/img/registerPage.png)
---