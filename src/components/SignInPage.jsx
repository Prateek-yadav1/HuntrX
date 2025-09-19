import { SignIn, SignedOut, SignInButton } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <SignedOut>
        <div className="text-center bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-md w-full">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">Welcome to Mentor Munch</h1>
          <p className="text-gray-500 mb-6">Please sign in to continue</p>

          <SignInButton mode="modal" redirectUrl="/">
            <button className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 hover:scale-105 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}