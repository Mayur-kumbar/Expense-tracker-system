import React, { useContext } from 'react';
import { authContext } from '@/lib/store/Auth-context';
import { FcGoogle } from 'react-icons/fc'; // Google icon from react-icons

const SignIn = () => {
  const { googleLoginHandler } = useContext(authContext);

  return (
    <main className="container flex flex-col items-center justify-center space-y-6">
      <h1 className="font-bold text-2xl mb-2">Welcome to Expense Tracker</h1>
      <p className="text-gray-400">Please sign in to continue</p>
      <div>
        <button
          onClick={googleLoginHandler}
          className="flex items-center px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-red-500 space-x-2"
        >
          <FcGoogle className="text-2xl" /> {/* Google logo */}
          <span>Google</span>
        </button>
      </div>
    </main>
  );
};

export default SignIn;
