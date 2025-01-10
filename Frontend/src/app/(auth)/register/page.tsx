import Link from "next/link";
import AuthForm from "@/components/authForm";

export default function Register() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Create Account
          </h2>

          <AuthForm isLogin={false} />

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?
              <Link
                href="/login"
                className="ml-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
