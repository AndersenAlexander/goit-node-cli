

# goit-node-cli

A simple **Node.js CLI application** for managing contacts stored in a JSON file.  
Additionally, the project includes a minimal **web dashboard** (built with Express + Tailwind) to visualize and manage the same data.


---

## Design
<img width="1645" height="874" alt="Contacts Dashboard by Alexander Andersen" src="https://github.com/user-attachments/assets/3927fd0b-1f45-45da-a678-ab8ae2f7878a" />




---

## 📦 Requirements
- Node.js LTS (>= 18 recommended)
- npm (comes with Node.js)
- Git (for cloning the repository)




---

## 🚀 Installation


# 1. Clone the repository
git clone https://github.com/<your-username>/goit-node-cli.git
cd goit-node-cli




---

# 2. Install dependencies
npm install




---

## 📂 Project Structure


<img width="730" height="331" alt="Screenshot 2025-08-24 235808" src="https://github.com/user-attachments/assets/df23f75f-62d7-4ae1-9560-a9e677acaf28" />




---

## 🖥 CLI Usage
Run from terminal:
node index.js -a <action> [-i <id>] [-n <name>] [-e <email>] [-p <phone>]




---

Available actions:
# List all contacts
node index.js -a list

# Get a contact by ID
node index.js -a get -i 05olLMgyVQdWRwgKfg5J6

# Add a new contact
node index.js -a add -n "Mango" -e "mango@gmail.com" -p "322-22-22"

# Remove a contact by ID
node index.js -a remove -i qdggE76Jtbfd9eWJHrssH




---

## 🌐 Web Dashboard

Start the server:
npm run web
# or
node server.js

Then open in your browser:
http://localhost:5173

Features

View all contacts in a table

Search (by name, email, or phone)

Sort columns

Add new contacts

Delete contacts

Export filtered contacts to CSV





---

## 📡 API Endpoints

| Method | Path                | Body (JSON)                                         | Response         |
| ------ | ------------------- | --------------------------------------------------- | ---------------- |
| GET    | `/api/contacts`     | –                                                   | List of contacts |
| GET    | `/api/contacts/:id` | –                                                   | Contact or 404   |
| POST   | `/api/contacts`     | `{ "name": "...", "email": "...", "phone": "..." }` | Created contact  |
| DELETE | `/api/contacts/:id` | –                                                   | Removed contact  |






---

## 📸 Screenshots
CLI Example (list)

Web Dashboard





---

## ⚡ Troubleshooting
SyntaxError: Unexpected end of JSON input
Ensure contacts.json contains [] (an empty array) or valid JSON.

Cannot use import statement outside a module
Add "type": "module" in package.json.

Port already in use
Change PORT inside server.js or stop the conflicting process.





---

## 📝 License
MIT © 2025
Built with Node.js + Express + Tailwind by Alexander Andersen









