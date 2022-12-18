// импорт модуля по работе с файловой системой
const fs = require("fs/promises");

// импорт генератора id
const { v4 } = require("uuid");

// импорт модуля по работе с путями к файлам
const path = require("path");

// получение доступа к файлу с контактами
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === String(contactId));

  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === String(contactId));
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = { id: String(v4()), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === String(contactId));

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
