import React from 'react'

const Model = ({show , onclose , children}) => {
  return (
    <div>
      {show && (<div className="w-full h-full  absolute top-0 left-0 z-10">
      <div className="container max-w-2xl min-h-[70vh] bg-slate-900 mx-auto rounded-2xl p-6">
        <button onClick={() =>{
          onclose(false)
        }} className="p-2 rounded-full bg-slate-500 w-10 h-10 my-2">X</button>
       {children}
      </div>

    </div>)}
    </div>
  )
}

export default Model
