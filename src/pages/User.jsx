import { useEffect, useState } from "react"
import { Spinner } from "flowbite-react"

export default function User() {
    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(true);

    async function getDataUser() {
        const url = "https://api.escuelajs.co/api/v1/users/1";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // isi state user dengan data dari API
            setUser(result);
            // mengganti loading state menjadi false untuk menghilangkan spinner
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Memanggil atau menjalankan getda`ta API pas baru buka halamannya
    useEffect(() => {
        getDataUser();
    }, []);

    if (loading == true) {
        return (
            <div className="block mx-auto mt-60 w-100 text-center">
                <Spinner />  Sedang memuat data...
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center py-10">
            <h1 className="font-bold text-2xl mb-8">Dashboard User</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full object-cover mb-3"
                    />
                </div>

                <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Name</p>
                        <p className="text-gray-900 font-semibold">{user.name}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="text-gray-900">{user.email}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Role</p>
                        <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}