import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// serve static UI
app.use(express.static(path.join(__dirname, "public")));

// API
app.get("/api/contacts", async (_req, res) => {
  const items = await listContacts();
  res.json(items);
});

app.get("/api/contacts/:id", async (req, res) => {
  const item = await getContactById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

app.post("/api/contacts", async (req, res) => {
  const { name, email, phone } = req.body || {};
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "name, email, phone are required" });
  }
  const created = await addContact(name, email, phone);
  res.status(201).json(created);
});

app.delete("/api/contacts/:id", async (req, res) => {
  const removed = await removeContact(req.params.id);
  if (!removed) return res.status(404).json({ error: "Not found" });
  res.json(removed);
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`UI ready on http://localhost:${PORT}`);
});
