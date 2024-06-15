import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Conncetion } from "../ServerConection/conction";

export default function Password_resets() {
    const nav = useNavigate();
    const [formData, setFormData] = useState({ email: '' });

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Conncetion.post("/forgot-password", formData);
            if (res.status === "OK") {
                // nav('/VerificationCode');\
                console.log(res)
            }
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    return (
        <Card color="transparent" className="w-[400px]" data-aos="fade-right" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Forgot Password?
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter the email address you used when you joined and we’ll send
                you instructions to reset your password.

                For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Email Address
                    </Typography>
                    <Input
                        size="lg"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@mail.com"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Button className="mt-6" type="submit" fullWidth>
                    Send Reset Instructions
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    I have an account?{" "}
                    <Link to={"/"} className="font-medium text-gray-900">
                        Login
                    </Link>
                </Typography>
            </form>
        </Card>
    )
}
