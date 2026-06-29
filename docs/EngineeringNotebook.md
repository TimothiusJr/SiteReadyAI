# SiteReady AI Engineering Notebook

## Project Overview

### Project Name
SiteReady AI

### Project Mission
SiteReady AI is an AI-assisted learning platform that helps Medical Implementation Leads (MILs) practice implementation scenarios, identify operational barriers, assess healthcare site readiness, and develop implementation action plans through realistic training experiences.

The goal is to replace passive slide-based learning with interactive, scenario-based learning that builds real decision-making skills.

---

# Problem Statement

New Medical Implementation Leads often learn through PowerPoint presentations and documentation.

However, the role itself requires critical thinking, communication, and operational decision-making.

MILs must evaluate healthcare sites, identify implementation barriers, coordinate with stakeholders, and recommend action plans.

SiteReady AI aims to simulate those real-world situations in a safe learning environment.

---

# Initial MVP

The first version of SiteReady AI will allow a learner to:

1. Select a training scenario.
2. Review a healthcare site profile.
3. Identify implementation barriers.
4. Answer implementation questions.
5. Receive AI-generated feedback.

---

# Planned Modules

## Module 1
AI Implementation Scenario Training

Purpose:
Teach learners how to evaluate healthcare sites and create implementation plans.

---

## Module 2
AI Stakeholder Role-Play

Purpose:
Allow learners to practice conversations with practice managers, pharmacists, nurses, and clinical coordinators.

---

## Module 3
AI Training Content Generator

Purpose:
Automatically transform training documents into quizzes, flashcards, discussion prompts, and case studies.

---

# Planned Tech Stack

Frontend
- React

Backend
- Node.js
- Express

Database
- PostgreSQL (SQLite may be used during early development)

AI
- Google Gemini API

Version Control
- Git
- GitHub

IDE
- WebStorm

---

# Project Structure

SiteReadyAI/

client/
- React frontend

server/
- Node.js / Express backend

docs/
- Engineering notebook
- Architecture diagrams
- Database diagrams
- API documentation
- Wireframes

---

# Engineering Notes

## Why separate the client and server?

The frontend and backend have different responsibilities.

The frontend is responsible for displaying the user interface and collecting user input.

The backend is responsible for business logic, authentication, communicating with the database, and interacting with AI services.

Separating them makes the application easier to maintain, test, and scale.

---

## What is the frontend?

The frontend is everything the user sees and interacts with.

Examples:
- Dashboard
- Login page
- Scenario page
- Buttons
- Forms
- Navigation

Technology:
React

---

## What is the backend?

The backend performs work that users cannot see.

Examples:
- Authentication
- Scenario retrieval
- AI requests
- Database queries
- Business logic

Technology:
Node.js + Express

---

## What is a Markdown (.md) file?

Markdown is a lightweight language used to write documentation.

GitHub renders Markdown files into clean, readable documentation.

Developers commonly use Markdown for:
- README files
- Documentation
- Project notes
- API documentation

---

# Interview Notes

Q: Why did you separate the frontend and backend?

A:
React and Express have different responsibilities. React handles the user interface while Express manages server-side logic, business rules, AI communication, and database operations. Separating them improves maintainability, scalability, and organization.

---

# Things To Learn

- React fundamentals
- Express fundamentals
- REST APIs
- PostgreSQL
- Authentication
- Prompt Engineering
- Gemini API
- Software Architecture
- Healthcare implementation workflows

# React Project Structure

## node_modules

Contains all third-party packages installed by npm.

Generated automatically.

Can be recreated by running:

npm install

---

## package.json

The blueprint of the project.

Contains:

- Project information
- Dependencies
- Scripts
- Metadata

---

## package-lock.json

Records the exact versions of every installed package.

Allows every developer to install identical dependencies.

---

## src

Contains the application's source code.

Most development happens here.

---

## public

Contains static assets that do not need React processing.

Examples:

- Images
- Icons
- PDFs

---

## index.html

The first file loaded by the browser.

Acts as the container where React is mounted.

---

## vite.config.js

Configuration file for Vite.

Controls how the React application is built and served.

---

## eslint.config.js

Configuration file for ESLint.

Defines the rules used to analyze JavaScript code quality.

---

## README.md

Project documentation.

Explains:

- Project purpose
- Installation
- Usage
- Technologies

# React Fundamentals

## What is React?

React is a JavaScript library for building user interfaces.

Instead of creating one large webpage, React encourages developers to divide the interface into reusable components.

---

## Component

A component is a reusable piece of the user interface with a single responsibility.

Examples:

- Navbar
- Footer
- Dashboard
- Scenario Card
- Login Form

Components can be combined to build larger interfaces.

---

## Component-Based Architecture

React applications are built by combining many small components into a complete user interface.

Benefits:

- Easier maintenance
- Reusable code
- Better organization
- Easier testing
- Faster development

# React Entry Point

## main.jsx

main.jsx is the entry point of the React application.

Responsibilities:
- Imports global CSS
- Imports the main App component
- Finds the root HTML element
- Renders the React app into the browser

## App.jsx

App.jsx is the root React component.

Responsibilities:
- Controls the main user interface
- Can display child components
- Serves as the starting point for the visible app layout

## React Rendering Flow

index.html contains:

<div id="root"></div>

main.jsx finds that element using:

document.getElementById('root')

React then renders:

<App />

inside that root element.

# Rendering Lists in React

React can display lists by using JavaScript's `.map()` method.

Example:

items.map((item, index) => (
  <li key={index}>{item}</li>
))

The `.map()` method loops through an array and returns JSX for each item.

The `key` helps React track each rendered item efficiently.

# React Components

## What is a Component?

A React component is a JavaScript function that returns JSX.

Example:

function Header() {
return (
<h1>Hello</h1>
)
}

Components are reusable building blocks used to create user interfaces.

---

## Why use Components?

Benefits:

- Smaller files
- Easier maintenance
- Better organization
- Reusable UI
- Easier testing

---

## Component Rule

A component should have one clear responsibility.

Examples:

Header

Navigation

Scenario Card

Footer

Response Box

# .gitignore

The `.gitignore` file tells Git which files or folders should never be tracked.

Common examples:

- node_modules/
- .idea/
- .env
- dist/
- .DS_Store

Why?

Some files are generated automatically, contain personal settings, or contain secrets.

# Git Workflow

Git follows a three-step workflow:

1. Modify files
2. Stage changes
3. Commit changes

Example:

git add .

git commit -m "Add response submission feature"

---

## Staging Area

The staging area is a temporary holding area where Git collects changes before creating a commit.

It allows developers to choose exactly what will be included in the next project snapshot.

# Git Working Tree vs Staging Area

Git tracks changes in three places:

1. Working Directory
2. Staging Area
3. Commit History

## Working Directory

Contains the current files being edited.

## Staging Area

Contains the changes selected for the next commit.

Files can continue changing after they have been staged.

Running `git add` again updates the staged version.

## Commit History

A permanent snapshot of the staged files.

# Data Layer

The `data` folder stores application data that the UI uses.

During early development, it acts as a temporary database.

Example:

src/
data/
scenarios.js

Benefits:

- Keeps UI components clean
- Separates data from presentation
- Makes adding new scenarios simple
- Makes replacing local data with a database easier later

# Product Principle #1

Every feature must solve a user problem.

Before adding a feature, ask:

- Who is this helping?
- What problem does it solve?
- Is there a simpler solution?

# Project Root vs React Project

SiteReadyAI is the project root.

The React application lives inside the `client` folder.

Git commands are run from:

SiteReadyAI/

Examples:

git status

git add .

git commit

React commands are run from:

SiteReadyAI/client/pwd


Examples:

npm install

npm run dev


# Factory Function

A factory function creates and returns new objects or arrays.

Example:

createInitialProgress(scenarios)

Benefits:

- Prevents shared mutable data
- Creates fresh copies
- Easier to reuse
- Easier to test

# Single Source of Truth

The application stores learner progress in one place:

App.jsx

Reason:

- Dashboard needs progress.
- Scenario page updates progress.
- Future Progress page will display progress.

Keeping one owner for the data avoids duplicate or inconsistent state.

---

# Progress Model

Each scenario has one progress object.

Fields:

- scenarioId
- completed
- score
- completedAt
- attempts

This structure scales as more scenarios are added.


# Immutable State Updates

React state should not be modified directly.

Instead of changing an existing object or array, create a new one.

Common pattern:

1. Use `map()` to create a new array.
2. Use the spread operator (`...`) to copy an object.
3. Update only the properties that changed.

Example:

Old Object
↓

Copy Object

↓

Update Copy

↓

Replace State

# Service Layer

A service acts as a middle layer between the UI and the data.

Instead of React reading data directly, it asks a service.

Benefits:

- Separates business logic from the UI.
- Makes changing data sources easier.
- Supports future APIs and databases.
- Improves maintainability.

Example:

Dashboard

↓

Scenario Service

↓

Scenario Data

↓

Database (future)

# Layout Components

A layout component provides the common structure shared by multiple pages.

Examples:

- Header
- Sidebar
- Footer
- Main Content Area

Instead of repeating these on every page, they are placed inside a layout component.

React's `children` prop allows different pages to be rendered inside the same layout.

# React Router

React Router provides client-side routing.

Instead of conditionally rendering pages based on state, it maps URLs to React components.

Benefits:

- Browser history support
- Bookmarkable URLs
- Better navigation
- Cleaner application architecture

Example:

/dashboard
/scenario
/progress
/resources

# Client-Server Architecture

The frontend (client) is responsible for:

- Displaying the user interface
- Handling user interaction
- Sending requests to the backend

The backend (server) is responsible for:

- Processing requests
- Applying business logic
- Accessing the database
- Returning responses

Communication between the client and server happens using HTTP.