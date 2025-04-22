
# Cerberus Access Control Demo

A demonstration of role-based access control for agent systems, showcasing a metadata-driven approach to tool access management.

## Project Overview

This demo illustrates a client-server access control flow:

- **Client (React UI)**: Lets you choose a role (Student, Prefect, Teacher) and sends a "borrow request" (role, context) to the server.

- **Server (Node/Express MCP)**: Registers three tools (Standard Book, Restricted Section, Cursed Scroll), applies a policy discriminator to decide which tools your role may call, executes the tool function, and returns the result.

## Key Features

- **Role-Based Access Control**: Different roles have different levels of access to tools
- **Policy Discriminator**: Central policy enforcement based on role metadata
- **Real Tool Registration**: Each tool is implemented as a registered function
- **Dynamic UI Feedback**: Visualizes access control decisions in real time
- **Context Passing**: Demonstrates how context is passed through the system

## Access Policy Rules

This demo implements the following access control rules:

| Role    | Standard Book | Restricted Section | Cursed Scroll |
|---------|:------------:|:------------------:|:-------------:|
| Student | ✅            | ❌                | ❌            |
| Prefect | ✅            | ✅                | ❌            |
| Teacher | ✅            | ✅                | ✅            |

## Technical Implementation

- **Frontend**: React with TypeScript, Tailwind CSS
- **Client-Side API**: Simulates server communication
- **Role Selection**: Choose between Student, Prefect, or Teacher
- **Tool Access**: Request access to different tools based on your role

## Getting Started

1. Install dependencies:
```
npm install
```

2. Run the development server:
```
npm run dev
```

3. Open [http://localhost:8080](http://localhost:8080) to view the demo

## Why This Matters

This demonstration showcases a true client-server roundtrip and real access control in an agent-style system. It's a clear end-to-end example of metadata-driven gatekeeping with:

- No mocks
- Real registered functions
- Built-in policy logic
- Complete separation of concerns

It provides a blueprint for implementing secure access control in more complex agent systems.
