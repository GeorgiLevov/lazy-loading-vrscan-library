import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();
client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(import.meta.env.VITE_API_KEY);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

