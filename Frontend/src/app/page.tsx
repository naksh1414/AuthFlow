"use client";
import Link from "next/link";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { user, logout, isLoading } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      {user ? (
        <div className="animate-fade-in flex justify-center flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome, {user.firstName}! 👋
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            Thank you for joining AuthFlow. Your account has been successfully
            created.
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome to AuthFlow
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            A secure and beautiful authentication system with a modern user
            interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
