import {Account, Avatars, Client, Databases, Storage} from 'appwrite';

export const appwriteConfig = {
    projectId : '65426a361a9615a3136c', //import.meta.VITE_APPWRITE_PROJECT_ID, 
    url : 'https://cloud.appwrite.io/v1', //import.meta.VITE_URL, 
    storageId : '6545c882c724507402ab', //import.meta.VITE_APPWRITE_STORAGE_ID, 
    datbaseId : '6545c882c724507402ab', //import.meta.VITE_APPWRITE_DATABASE_ID, 
    savesCollectionId :'6545cc07aee9273eb2fc',
    userCollectionId : '6545cbd478a35621e74f',
    postsCollectionId : '6545ca752972cf46986b'
}

export const client = new Client();

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)


export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);