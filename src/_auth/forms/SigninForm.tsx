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
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { useSigninAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";




const SignInForm = () => {

    const { toast } = useToast();
    const { checkAuthUser, isLoading: isUserloading } = useUserContext();
    const navigate = useNavigate();
    const {
        mutateAsync: signInAccount
    } = useSigninAccount();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: '',
            password: ''
        },
    })



    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SigninValidation>) {
        
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
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your details</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full  mt-4">
                    
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
                            isUserloading ? (
                                <div className="flex-center gap-2 ">
                                    <Loader /> Loading...
                                </div>
                            ) : "Sign in "
                        }
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Don't have an account?  <Link className="text-primary-500 text-small-semibold ml-1" to="/sign-up">Sign-up</Link>
                    </p>
                </form>
            </div>
        </Form>

    );
};

export default SignInForm;