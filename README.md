# ShopSphereAli – Backend

Backend for ShopSphereAli – Multi-Vendor E-Commerce Platform with Real-Time Chat.

## Day1: 
## Tech Stack
- Node.js + Express.js
- PostgreSQL + Prisma
- JWT + bcrypt
- Socket.io

## Setup
```bash
npm install
npm run dev


### **3f. Git initialize **

```bash
git init
git add .
git commit -m "Day 1: Initial backend setup"

### ** Github repo addedd and pushed code **
git remote add origin https://github.com/../shopsphereali-frontend.git
git branch -M main
git push -u origin main

## Day 2: Backend Setup – Express.js + Folder Structure
- Express.js install
- Folder structure (MVC)
- Basic server run
- Git commit + push

### Dependencies Install
npm install express dotenv cors helmet morgan express-rate-limit
npm install -D nodemon

###  Folder Structure

# make src folder
mkdir src

# create Sub-folders
mkdir src/config
mkdir src/controllers
mkdir src/middlewares
mkdir src/models
mkdir src/routes
mkdir src/utils
mkdir src/sockets
mkdir src/services

### .env file
### .env.example file // for developer

### make src/app.js