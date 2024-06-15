import { Card, Input, Button, Typography } from "@material-tailwind/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Conncetion } from "../ServerConection/conction";

export default function NewPassword() {
    const nav = useNavigate();
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        try {
            const email = new URLSearchParams(window.location.search).get('email');
            const res = await Conncetion.post("/reset-password", {
                token,
                email,
                password: newPassword,
                password_confirmation: confirmPassword,
            });
            if (res.status == 200) {
                nav('/');
            }
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    return (
        <Card color="transparent" className="w-[400px]" data-aos="fade-right" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Enter New Password
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Please enter your new password and confirm it to complete the password reset process.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        New Password
                    </Typography>
                    <Input
                        size="lg"
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Confirm Password
                    </Typography>
                    <Input
                        size="lg"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Button className="mt-6" type="submit" fullWidth>
                    Reset Password
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Remember your password?{" "}
                    <Link to={"/"} className="font-medium text-gray-900">
                        Login
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}
