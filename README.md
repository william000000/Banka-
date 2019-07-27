[![Build Status](https://travis-ci.org/william000000/Banka-.svg?branch=develop)](https://travis-ci.org/william000000/Banka-)
[![Coverage Status](https://coveralls.io/repos/github/william000000/Banka-/badge.svg?branch=develop)](https://coveralls.io/github/william000000/Banka-?branch=develop)
# Banka-
Banka is a banking application that powers banking operations like account
creation, customer deposit and withdrawals. This application is going to help bank activities and users where s/he can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money.
--------
## It has such features:
- User can signup.
- User can login.
- User can create an account.
- User can view account transaction history.
- User can view a specific account transaction.
- Staff (cashier) can debit user account.
- Staff (cashier) can credit user account.
- Admin/staff can view all user accounts.
- Admin/staff can view a specific user account.
- Admin can activate or deactivate an account.
- Admin/staff can delete a specific user account.
- Admin can create staff and admin user accounts.

## Installation
- Code Editor Ex: Visual Studio, Sublime etc
- Node/Express
- Postman

## SetUp Project to get Started
- Clone my repo https://william000000.github.io/Banka-/UI/index.html
- install all dependencies using 
```npm install```
- Start Server 
```npm run dev```
- Run Postman to check my API Endpoint on 
```localhost:3000``` 

## Use these method and path to test my API Endpoint

| Method      | Path                                       | Description                   |
|-------------|--------------------------------------------|-------------------------------|
| POST        | /api/v1/auth/signup                        | Create User Account           |
| POST        | /api/v1/auth/signin                        | User login Bank Account       |
| POST        | /api/v1/accounts                           | Create User Bank Account      |
| PATCH       | /api/v1/accounts/:accountNumber            | Activate or Deactivate Account|
| POST        | /api/v1/accounts/:accountNumber/debit      | To Debit Bank Account         |
| POST        | /api/v1/accounts/:accountNumber/credit     | To Credit Bank Account        |
| DELETE      | /api/v1/accounts/:accountNumber            | To Delete Bank Account        |
--------------------------------------------------------------------------------------------

## Technologies Used

### Bank-End
- Node / Express js

### Front-End
- HTML
- CSS

## Author: Willy Boris
