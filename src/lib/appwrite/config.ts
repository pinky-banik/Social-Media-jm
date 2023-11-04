import {Account, Avatars, Client, Databases, Storage} from 'appwrite';

export const appwriteConfig = {
    projectId : '65426a361a9615a3136c', //import.meta.VITE_APPWRITE_PROJECT_ID, 
    url : 'https://cloud.appwrite.io/v1', //import.meta.VITE_URL, 
    storageId : '6545c882c724507402ab', //import.meta.VITE_APPWRITE_STORAGE_ID, 
    datbaseId : '6545c882c724507402ab' //import.meta.VITE_APPWRITE_DATABASE_ID, 
}

export const client = new Client();

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)


export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);