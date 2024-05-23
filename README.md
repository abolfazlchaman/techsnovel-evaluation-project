# Techsnovin User Management Application

You can use this application live at [https://techsnovel.vercel.app/](https://techsnovel.vercel.app/).

This project is a user management application built with Next.js, Typescript, React, Redux Toolkit, and Material-UI. It allows users to view, create, update, and delete user information with pagination support.

## Features

- View a list of users
- Create new users
- Update existing users
- Delete users
- Pagination to navigate through user lists
- Skeleton loaders for better user experience during data fetching

## Tech Stack

- Next.js
- TypeScript
- React
- Redux Toolkit
- Material-UI
- Axios

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.22.x)

### Installation

1. Clone and run the repository or:
You can use this application live at [https://techsnovel.vercel.app/](https://techsnovel.vercel.app/).


```bash
git clone https://github.com/abolfazlchaman/techsnovel-evaluation-project

cd techsnovel-evaluation-project
npm install
npm run dev

Open your browser and navigate to http://localhost:3000.

```
```bash
Project Structure (Summary - not all files included)

bash
user-management-app/
│
├── public/                       # Public assets
│
├── src/                          # Source files
│   ├── components/               # React components
│   │   ├── UserForm/             # User form component for create and update
│   │   │   └── UserForm.tsx
│   │   └── UserList.tsx          # Main user list component
│   │
│   ├── lib/                      # Library and utilities
│   │   ├── features/             # Redux features (slices)
│   │   │   └── users/            
│   │   │       └── userSlice.ts  # User slice
│   │   └── store.ts              # Redux store configuration
│   │
│   ├── pages/                    # Next.js pages
│   │   └── index.tsx             # Main entry page
│   │
│   ├── styles/                   # Styles (CSS or SASS)
│   └── utils/                    # Utility functions
│
├── .gitignore                    # Git ignore file
├── package.json                  # NPM package configuration
├── README.md                     # Project README file
└── tsconfig.json                 # TypeScript configuration

```