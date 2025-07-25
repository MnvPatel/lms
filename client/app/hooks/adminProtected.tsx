/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps{
    children: React.ReactNode;
}

export default function AdminProtected({children}: ProtectedProps){
    const user = useSelector((state: any) => state?.auth?.user);

    if(user){
        const isAdmin = user?.role === "admin";
        return isAdmin ? children : redirect("/")
    }
}