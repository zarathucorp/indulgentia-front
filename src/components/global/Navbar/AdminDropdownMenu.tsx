"use client";
import { useEffect, useState } from "react";
import useUser from "@/hooks/fetch/useUser";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const AdminDropdownMenu: React.FC = () => {
    const { userInfo, error, isLoading, mutate } = useUser();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        mutate();
        // 관리자 여부 확인
        if (userInfo?.is_admin) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [mutate, userInfo]);
    return isAdmin ? (
        <Link href="/admin">
            <DropdownMenuItem className="cursor-pointer">관리자 페이지</DropdownMenuItem>
        </Link>
    ) : null;
};

export default AdminDropdownMenu;