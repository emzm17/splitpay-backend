# Splitpay Backend Application
Splitpay is a collaborative finance management application designed to streamline the process of splitting and settling expenses among a group of users. The platform allows users to create groups, add expenses, and keep track of who owes whom.


## Table of Contents
- [Project Highlights](#ProjectHighlight)
- [Installation](#Install)
- [Run](#run)
- [API](#api)
- [Database schema](#databaseschema)



## Project Highlights 
1. Node.js
2. Express.js
3. Mysql
4. Redis
5. Docker
6. JWT
7. Bcrypt.js
## Install

    git clone https://github.com/emzm17/splitpay-backend.git
    cd splitpay-backend/

## Run the app


    docker-compose build
    docker-compose up

    
    
## API

#### `/users`
* `GET` : Get all Users.
#### `/users/signup`
* `POST` : Create new user.
#### `/users/signin`
* `POST` : Login as User.
#### `/users/user-involved-groups`
* `GET` : Get all groups current user member.
#### `/users/send-friend-request`
* `POST` : send friend request.
#### `/users/accept-friend-request`
* `POST` : accept friend request.
#### `/users/friend-request`
* `GET` : list down friend-request user.
#### `/users/friend`
* `GET` : list down friends user. 
#### `/groups/:id`
* `GET` : Get expense of that group.
#### `/expenses`
* `GET` : Get all Expenses.
#### `/expenses/:id`
* `GET` : Get all expense of that group.
#### `/expenses/create`
* `POST` : Create expense.
#### `/settlement/:id`
* `GET` : Get settle the expenses.

## Database Schema 
   
    
### Users Table
| Column        | Data Type         | Constraints          |
|---------------|-------------------|----------------------|
| user_id       | INT               | PRIMARY KEY, AUTO_INCREMENT |
| name          | VARCHAR(255)      | NOT NULL             |
| email         | VARCHAR(255)      | NOT NULL             |
| password      | VARCHAR(255)      | NOT NULL             |
| totalAmount   | DECIMAL(10,2)     |                      |
| totalOwe      | DECIMAL(10,2)     |                      |
| totalOwed     | DECIMAL(10,2)     |                      |
| friend_list   | JSON              |                      |

### Group Table
| Column        | Data Type         | Constraints                        |
|---------------|-------------------|------------------------------------|
| id            | INT               | PRIMARY KEY, AUTO_INCREMENT         |
| name          | VARCHAR(255)      | NOT NULL                           |
| created       | TIMESTAMP         | DEFAULT CURRENT_TIMESTAMP          |
| users_id      | JSON              | NOT NULL                           |
| created_by    | INT               | NOT NULL                           |
|               |                   | FOREIGN KEY (created_by) REFERENCES users(user_id) |

### Expense Table
| Column        | Data Type         | Constraints                                    |
|---------------|-------------------|------------------------------------------------|
| expense_id    | INT               | PRIMARY KEY, AUTO_INCREMENT                   |
| amount        | DECIMAL(10,2)     | NOT NULL                                       |
| description   | VARCHAR(255)      | NOT NULL                                       |
| created       | TIMESTAMP         | DEFAULT CURRENT_TIMESTAMP                    |
| payer_id      | INT               | NOT NULL                                       |
| group_id      | INT               | NOT NULL                                       |
|               |                   | FOREIGN KEY (payer_id) REFERENCES users(user_id) |
|               |                   | FOREIGN KEY (group_id) REFERENCES group_s(id)  |

### Friendship Table
| Column          | Data Type | Constraints                                  |
|-----------------|-----------|----------------------------------------------|
| friendship_id   | INT       | PRIMARY KEY, AUTO_INCREMENT                 |
| user1_id        | INT       | NOT NULL, FOREIGN KEY (user1_id) REFERENCES users(user_id) |
| user2_id        | INT       | NOT NULL, FOREIGN KEY (user2_id) REFERENCES users(user_id) |


  
  
  
   
   
   
  
  
  
 
 
    




  
