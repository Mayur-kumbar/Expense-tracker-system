import React, { useContext } from 'react';
import { authContext } from '@/lib/store/Auth-context';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
    const { googleLoginHandler } = useContext(authContext);

    return (
        <main className="flex items-center justify-center bg-gray-800">
            <div className="p-8 bg-gray-700 rounded-xl shadow-lg space-y-6 max-w-md w-full text-center">
                <h1 className="font-bold text-3xl text-white">Welcome to Expense Tracker</h1>
                <p className="text-gray-300">Sign in to manage your expenses easily and securely.</p>
                <div className='w-full flex justify-center'>
                    <button
                        onClick={googleLoginHandler}
                        className="flex items-center px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-red-500 space-x-2"
                    >
                        <FcGoogle className="text-2xl" /> 
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </main>
    );
};


export default SignIn;
