# Finca ERP – Currency Exchange Management System

## Overview
Finca ERP is a web-based financial application that simulates a currency exchange office. It allows users to perform currency exchange operations, store transaction records, and view financial summaries through a dashboard.

This project was inspired by real-world financial practices in Afghanistan, where many exchange businesses still rely on manual calculations.

## Features
- Currency exchange calculation
- Transaction history tracking
- Financial dashboard (Cash USD, AFN, Money Sent/Received)
- REST API communication

## Technologies Used

Frontend:
- React
- Vite
- JavaScript
- CSS
- Axios
- React Router DOM

Backend:
- Node.js

Database:
- PostgreSQL (pg library)

## System Architecture
Frontend (React) → REST API → Backend (Node.js) → PostgreSQL

## How to Run

Clone project:
```
git clone https://github.com/Feroz-Abubakr/finca.git
cd finca
```

Run backend:
```
cd backend
npm install
node server.js
```

Run frontend:
```
cd frontend
npm install
npm run dev
```

Important:
Backend must be running before frontend.

## Screenshots

Dashboard:
![Dashboard](screenshots/Dashboard%20Page.png)

Transactions:
![Transactions](screenshots/Transaction%20Page.png)

Exchange:
![Exchange](screenshots/Exchange%20Page.png)
## Algorithm
ConvertedAmount = Amount × Rate

Example:
100 × 90 = 9000

## GitHub Repository
https://github.com/Feroz-Abubakr/finca

## Author
Feroz Abubakr