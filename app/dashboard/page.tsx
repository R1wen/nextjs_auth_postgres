"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  name?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const localUserData = localStorage.getItem("user_data");
      if (!localUserData) {
        router.push("/auth/login");
        return;
      }

      try {
        const userData = JSON.parse(localUserData);
        setUser(userData);
      } catch (e) {
        console.error("Erreur de parsing des données utilisateur:", e);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    router.push("/auth/login");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-xl p-8 shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Tableau de bord
        </h1>

        <div className="flex items-center mb-8 border-b pb-8 border-gray-200">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${
              user.name || user.email
            }`}
            alt="Avatar"
            className="w-20 h-20 rounded-full mr-5 shadow-md"
          />

          <div className="flex-1">
            {user.name && (
              <p className="text-xl font-semibold text-gray-900 mb-1">
                {user.name}
              </p>
            )}
            <p className="text-gray-600 text-base mb-1">{user.email}</p>
            <p className="text-sm text-gray-400">ID: {user.id}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
            w-full 
            py-3 
            bg-red-600 
            text-white 
            font-semibold 
            rounded-lg 
            text-lg 
            cursor-pointer 
            transition 
            duration-300 
            hover:bg-red-700
            shadow-lg
          "
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
