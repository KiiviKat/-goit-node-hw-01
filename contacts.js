const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    console.log("Contact found:", contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    const [result] = contacts.splice(index, 1);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );

    console.log("Contact is successfully deleted:", result);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );

    console.log("Contact is successfully created:", newContact);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
