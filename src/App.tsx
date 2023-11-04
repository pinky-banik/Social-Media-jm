import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SigninForm from './_auth/forms/SigninForm';
import { Home } from "./_root/Pages";
import SignupForm from "./_auth/forms/SignupForm";
import Authlayout from "./_auth/Authlayout";
import RootLayout from "./_root/RootLayout";

import { Toaster } from "@/components/ui/toaster"


const App = () => {
    return (
        <main className="flex h-screen ">
            <Routes>
                {/* Public Route */}
                <Route element={<Authlayout />}>
                    <Route path="/sign-in" element={<SigninForm />} />
                    <Route path="/sign-up" element={<SignupForm />} />
                </Route>


                {/* Private Route */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>

            </Routes>
            <Toaster />
        </main>
    );
};

export default App;