import { INewUser } from "@/types"
import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api"
import { useMutation } from '@tanstack/react-query'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSigninAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string
        }) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount,
    });
  };
  