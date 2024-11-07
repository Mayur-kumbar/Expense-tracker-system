import React from 'react'
import { IoMdStats } from "react-icons/io";

const Navbar = () => {
  return (
    <header className="flex w-full h-20 justify-center ">
      <nav className="flex  justify-between w-full sm:w-[50%] p-3">
      <div className="flex justify-center items-center gap-2">
        <img className="w-10 rounded-full" src="https://t4.ftcdn.net/jpg/07/45/00/13/360_F_745001329_kykmupmbvAybNrT54ZP3b8YHAfy1ixwt.jpg" alt="profile picture" />
        <div className="text-xs">Mayur Kumbar</div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button>
          <IoMdStats/>
        </button>
        <button className="text-sm border-0 h-10 bg-red-500 p-2 rounded-lg hover:bg-red-800">
          sign out
        </button>
      </div>
      </nav>
    </header>
  )
}

export default Navbar
