import Link from "next/link";
import AuthForm from "@/components/authForm";

export default function Login() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Welcome Back
          </h2>

          <AuthForm isLogin={true} />

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="ml-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
