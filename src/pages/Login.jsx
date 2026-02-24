import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    function handleSubmitForm() {
        // Cek nilai input kesimpan atau tidak di state
        // console.log(formValue);
        if (formValue.email == "" || formValue.password == "") {
            setError("Email dan Password harus diisi");
        } else {
            setError("");
            // Lanjutkan ke fetch api
            authLogin();
        }
    }

    async function authLogin() {
        const url = "https://api.escuelajs.co/api/v1/auth/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValue),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);
            // Simpan token JWT ke local storage
            localStorage.setItem("access_token", result.access_token);
            localStorage.setItem("refresh_token", result.refresh_token);
            // Ubah nilai isLogin jadi true yang ada di context
            checkLogin();
            // Pindahkan halaman
            navigate("/cart");
        } catch (error) {
            setError("Gagal! pastikan email dan password benar");
        }
    }

    // const untuk perpindahan halaman
    const navigate = useNavigate();

    // Panggil context, ambil checkLogin dari context file AurhContext.jsx
    const { checkLogin } = useContext(AuthContext);
    return (
        <>
            {
                error != "" && (
                    <div className="flex justify-end pe-25 w-full">
                        <Toast className="bg-red-100 font-bold">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">{error}</div>
                            <ToastToggle />
                        </Toast>
                    </div>
                )
            }
            <div className="block mx-auto my-5 w-4xl">
                <h1 className="text-center font-bold text-2xl">Login</h1>
                <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1">Your email</Label>
                        </div>
                        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required onKeyUp={(e) => setFormValue({ ...formValue, email: e.target.value })} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1">Your password</Label>
                        </div>
                        <TextInput id="password1" type="password" required onKeyUp={(e) => setFormValue({ ...formValue, password: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="button" onClick={handleSubmitForm}>Submit</Button>
                </form>
            </div>
        </>
    )
}