#!/usr/bin/env node
import { Command } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const program = new Command();

program
  .option("-a, --action <type>", "choose action: list | get | add | remove")
  .option("-i, --id <id>", "contact id")
  .option("-n, --name <name>", "contact name")
  .option("-e, --email <email>", "contact email")
  .option("-p, --phone <phone>", "contact phone");

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const contacts = await listContacts();
      console.table(contacts);
      break;
    }
    case "get": {
      const contact = await getContactById(id);
      console.log(contact);
      break;
    }
    case "add": {
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    }
    case "remove": {
      const removed = await removeContact(id);
      console.log(removed);
      break;
    }
    default:
      console.warn("❌ Unknown action. Use: list | get | add | remove");
  }
}

invokeAction(options);
