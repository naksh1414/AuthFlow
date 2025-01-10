"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, UserPlus, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Loader from "../Loader";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isLoading } = useUser();
  const isActive = (path: string) => pathname === path;
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              AuthFlow
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/login")
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/register")
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center px-6 py-3 text-white rounded-lg font-semibold transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        ) : (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/login"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive("/login")
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
            <Link
              href="/register"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive("/register")
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
