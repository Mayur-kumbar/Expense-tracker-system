import React from 'react'
import { IoMdStats } from "react-icons/io";
import { useContext } from 'react';
import { authContext } from '@/lib/store/Auth-context';

const Navbar = () => {
  const {user , loading , logout} = useContext(authContext)

  return (
    <header className="flex w-full h-20 justify-center ">
      <nav className="flex  justify-between w-full sm:w-[50%] p-3">
        {user && !loading && (
          <div className="flex justify-center items-center gap-2">
          <img className="w-10 rounded-full" src={user.photoURL} alt={user.displayName} referrerPolicy='no-referrer'/>
          <div className="text-xs">{user.displayName}</div>
        </div>
        )}
      
      {user && !loading && (
          <div className="flex items-center justify-center gap-2">
          <button>
            <IoMdStats/>
          </button>
          <button onClick={logout} className="text-sm border-0 h-10 bg-red-500 p-2 rounded-lg hover:bg-red-800">
            sign out
          </button>
        </div>
      )}
    
      </nav>
    </header>
  )
}

export default Navbar
