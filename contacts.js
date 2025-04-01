import fs from 'node:fs/promises'
import path from 'node:path'
import { nanoid } from 'nanoid'

const contactsPath = path.resolve('db', 'contacts.json')

const writeFile = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
}

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(contacts)
}

export async function getContactById(contactId) {
  const contacts = await listContacts()
  const contact = contacts.find((contact) => contact.id === contactId)
  return contact || null
}

export async function removeContact(contactId) {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId)

  if (contactIndex === -1) return null

  const [deletedContact] = contacts.splice(contactIndex, 1)
  writeFile(contacts)
  return deletedContact
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts()

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }

  contacts.push(newContact)
  writeFile(contacts)
  return newContact
}
