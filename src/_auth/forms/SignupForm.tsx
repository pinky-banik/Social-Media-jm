import * as z from "zod"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSigninAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";




const SignupForm = () => {

    const { toast } = useToast();
    const { checkAuthUser, isLoading: idUserloading } = useUserContext();
    const navigate = useNavigate();

    const {
        mutateAsync: createUserAccount,
        isPending: isCreatingAccount
    } = useCreateUserAccount();

    const {
        mutateAsync: signInAccount,
        isPending: isSigningInUser,
    } = useSigninAccount();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: '',
            username: "",
            email: '',
            password: ''
        },
    })



    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        console.log(values);
        const newUser = await createUserAccount(values);
        console.log(newUser)
        if (!newUser) {
            return toast({
                title: "Sign Up failed, Please try again.",
            })
        }

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        })
        console.log(session)

        if (!session) {
            return toast({ title: 'Sign in failed. Please try again.' })
        }

        const isLoggedIn = await checkAuthUser();
        console.log(isLoggedIn);

        if (isLoggedIn) {
            form.reset();
            navigate('/');
        } else {
            return toast({ title: 'Sign up failed. Please try again' })
        }


    }
    return (

        <Form {...form}>
            <div className="sw:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo" />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your account details</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full  mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Email</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="shad-button_primary" type="submit">
                        {
                            isCreatingAccount ? (
                                <div className="flex-center gap-2 ">
                                    <Loader /> Loading...
                                </div>
                            ) : "Sign up"
                        }
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account?  <Link className="text-primary-500 text-small-semibold ml-1" to="/sign-in">Signin</Link>
                    </p>
                </form>
            </div>
        </Form>

    );
};

export default SignupForm;