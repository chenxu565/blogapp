# A Simple and Comprehensive Blog App

## Description
This Blog App is my implementation of a full-stack web application during the [Full Stack Open course](https://fullstackopen.com/en/). It allows users to create, read, comment, and delete blog posts. Built with React, Node.js, Express, and MongoDB, it comes with modern web development practices including RESTful API design, state management, and responsive UI.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Testing**: Jest, Cypress
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: Fly.io

## Features
- User authentication and authorization
- Create, read, comment, and delete blog posts
- Responsive design

## App Architecture
```mermaid
graph TD
    subgraph Frontend [React Frontend]
        F1[App Component]
        F2[Blog Component]
        F3[User Component]
    end

    subgraph Backend [Node.js/Express Backend]
        B1[Blog Controller]
        B2[User Controller]
        B3[Authentication Controller]
        DB[(MongoDB Database)]
    end

    F1 -->|API Requests| B1
    F2 -->|API Requests| B1
    F3 -->|API Requests| B2
    B1 -->|CRUD Operations| DB
    B2 -->|CRUD Operations| DB
    B3 -->|Auth| DB

    style Frontend fill:#f9f,stroke:#333,stroke-width:2px
    style Backend fill:#bbf,stroke:#333,stroke-width:2px
```