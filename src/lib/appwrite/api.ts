import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            // email: newAccount.email,
            username: user.username,
            imgUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
    accountId: string;
    // email: string;
    name: string;
    imgUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        console.log(newUser)
        return newUser;
    } catch (error) {
        console.log(error);
    }
}


export async function signInAccount(user: {
    email: string;
    password: string
}) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        console.log(session);

        return session;
    } catch (error) {
        console.log(error)
    }
}

// const currentAccount = await account.get();
//     console.log(currentAccount);

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        console.log(currentAccount);

        if (!currentAccount) throw Error;
        console.log(Error);

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        console.log(currentUser);

        if (!currentUser) throw Error;
        return currentUser.documents[0];


    } catch (error) {
        console.log(error);
        return null;
    }
}

// ============================== SIGN OUT
export async function signOutAccount() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      console.log(error);
    }
  }
