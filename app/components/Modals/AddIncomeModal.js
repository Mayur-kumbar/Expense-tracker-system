import React from 'react'
import { useRef , useContext} from 'react'

import {expenseContext} from '@/lib/store/Expense-context'
import { authContext } from '@/lib/store/Auth-context'

import { currencyFormatter } from '@/lib/utils'

import { MdDelete } from "react-icons/md";

import Model from '../Model' 

const AddIncomeModal = ({show , onclose }) => {
    
  const amountRef = useRef()
  const descriptionRef = useRef()
  const {income , addIncomeItem , removeIncomeItem} = useContext(expenseContext)

  const {user} = useContext(authContext)

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid : user.uid,
    }

    try {
        await addIncomeItem(newIncome)
        amountRef.current.value = ""
        descriptionRef.current.value = ""
    } catch (error) {
        console.log(error.message);
        
    }
  }

  const deleteIncomeHandler = async (incomeID) => {
    try {
        await removeIncomeItem(incomeID)
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <Model show={show} onclose={onclose}>
    <form onSubmit={addIncomeHandler}>
      <div className="flex flex-col gap-3 mb-3">
        <label htmlFor="amount">Income Amount </label>
        <input ref={amountRef} className="py-1 px-3 rounded-xl bg-slate-600" type="number" name="amount" min={0.01} step={0.01} placeholder="Enter Income Amount" required/>
      </div>

      <div className="flex flex-col gap-3 mb-3">
        <label htmlFor="description">Description </label>
        <input ref={descriptionRef} className="py-1 px-3 rounded-xl bg-slate-600" type="description" name="amount" min={0.01} placeholder="Enter Income description" required/>
      </div>
      <button className="text-sm rounded-lg text-green-500 p-3 bg-gray-700 hover:bg-gray-800 m-2 ">
        Add Entry
      </button>
    </form>

    <section>
      <h2 className="font-bold mt-2 text-xl">Income History</h2>
      {income.map(i => {

        return (
          <div key={i.id} className="flex justify-between items-center" >
            <div >
              <div className="font-semibold">{i.description}</div>
              <div className="text-xs mb-1">{i.createdAt.toISOString()}</div>
            </div>
            <p className="flex items-center gap-2">
              {currencyFormatter(i.amount)}
              <button onClick={() => deleteIncomeHandler(i.id)}><MdDelete /></button>
            </p>
          </div>
        )
      })}
    </section>
  </Model>
  )
}

export default AddIncomeModal
