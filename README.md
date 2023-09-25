# TodoApp

TodoApp is a modern to-do list application designed to help you manage your tasks efficiently. It is comprised of two main components: a frontend and a backend, both containerized using Docker Compose for easy deployment.

## Project Structure:

### Frontend:

The frontend of the application is built using React, a popular JavaScript library for building user interfaces. It utilizes various dependencies like Axios for making HTTP requests and Tailwind CSS for styling.

#### Dockerfile (Frontend):

The Dockerfile for the frontend sets up the Node.js runtime, installs project dependencies, and exposes port 3000 for running the React application.

#### package.json (Frontend):

This file contains the project's metadata and dependencies required for the frontend. It includes React, Axios, Tailwind CSS, and other dependencies.

### Backend:

The backend of the application is built using Node.js and Express.js, a web application framework for Node.js. It uses Sequelize as an Object-Relational Mapping (ORM) tool to interact with a PostgreSQL database.

#### Dockerfile (Backend):

The Dockerfile for the backend sets up the Node.js runtime, installs project dependencies, and exposes port 3001 for running the Express.js server.

#### package.json (Backend):

This file contains the project's metadata and dependencies required for the backend. It includes Express.js, Sequelize, PostgreSQL, and other dependencies.

#### Server.js (Backend):

The server.js file is the main server script for the backend. It defines routes for creating, retrieving, updating, and deleting tasks, and it establishes a connection to the PostgreSQL database using Sequelize.

### Database (PostgreSQL):

The application relies on a PostgreSQL database to store task data. The Docker Compose file sets up a PostgreSQL container with specific environment variables and volume mapping to persist data.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with the TodoApp, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/TodoApp.git
   ```
2. Change to the project directory:

   ```bash
   cd TodoApp
   ```

3. Build the Docker containers using Docker Compose:
   ```
   docker-compose build
   ```
4. Once the build is complete, start the application:

   ```bash
   docker-compose up
   ```

   This command will start the backend server and the frontend application. You should see output indicating that the containers are running.

5. Open your web browser and access the TodoApp at http://localhost:3000.

6. You can now use the to-do list application to manage your tasks.

## Stopping the Application:

To stop the application and shut down the Docker containers, press Ctrl + C in the terminal where the containers are running, and then run:

```bash
docker-compose down
```

## Contributing

If you'd like to contribute to this project, please feel free to fork the repository and submit pull requests with your changes.

## License

This project is licensed under the MIT License. See the <a href="https://opensource.org/license/mit/" >LICENSE</a> link for details.

Happy task management with TodoApp!

## Additional Comment

```
Replace `yourusername` with your actual GitHub username in the clone URL.

```

## Project Tree :

```
TodoApp
├─ backend
│  ├─ Dockerfile
│  ├─ package.json
│  └─ server.js
├─ docker-compose.yml
├─ frontend
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo.ico
│  │  ├─ logo152.png
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.js
│  │  ├─ App.test.js
│  │  ├─ components
│  │  │  ├─ AllTasks.js
│  │  │  └─ TodoForm.js
│  │  ├─ index.css
│  │  ├─ index.js
│  │  ├─ logo.svg
│  │  ├─ reportWebVitals.js
│  │  └─ setupTests.js
│  └─ tailwind.config.js
└─ README.md

```
