"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl border border-red/20 px-4 py-2 text-xs font-medium text-red-400 transition-all duration-300 hover:border-red/40 hover:text-red-600"
    >
      Esci
    </button>
  );
}
