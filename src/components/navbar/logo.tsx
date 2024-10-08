'use client';


import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Logo = () => {
    const router = useRouter();

    return (
        <div className="flex items-center gap-4">
            <Link href="/" className="text-white hover:text-gray-300 transition">
                <FaHome size={24} />
            </Link>

            <div
                onClick={() => router.push('/')}
                className="hidden md:block cursor-pointer text-white">
                Car Rental
            </div>
        </div>
    );
}

export default Logo;