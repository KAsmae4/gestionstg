import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VerificationCode() {

    const nav = useNavigate()

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const handelForm = async _ =>{
        nav("/NewPassword")
    }

    return (
        <Card color="transparent" className="w-[400px]" data-aos="fade-right" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Verification Code
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter the verification code sent to your email address to complete the password reset process.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"  onSubmit={handelForm} >
                <div className="mb-1 flex flex-col gap-6">

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Verification Code
                    </Typography>

                    <Input
                        size="lg"
                        placeholder="Enter code"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />

                </div>

                <Button className="mt-6" type="submit" fullWidth>
                    Verify Code
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Didn't receive the code?{" "}
                    <Link to={"/resend-code"} className="font-medium text-gray-900">
                        Resend Code
                    </Link>
                </Typography>
            </form>
        </Card>
    )
}
