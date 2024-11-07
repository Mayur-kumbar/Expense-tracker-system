import React from 'react'
import Model from '../Model'
import { useState, useContext ,useRef } from 'react'
import { expenseContext } from '@/lib/store/Expense-context'

import { v4 as uuidv4 } from 'uuid'

const AddExpensesModal = ({ show, onclose }) => {

    const [expenseAmount, setExpenseAmount] = useState("")
    const [selectedCategory, setselectedCategory] = useState(null)
    const [showNewCategory, setshowNewCategory] = useState(false)

    const { expenses, addExpenseItem , addCategory } = useContext(expenseContext)

    const titleRef = useRef()
    const colorRef = useRef()


    const addExpenseItemHandler = async () => {

        const expense = expenses.find(e => {
            return e.id === selectedCategory
        })

        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id: uuidv4(),
                }
            ]
        }

        try {
            await addExpenseItem(selectedCategory, newExpense)

            setExpenseAmount("")
            setselectedCategory(null)
            onclose()
        } catch (error) {
            console.log(error.message);

        }
    }

    const addCategoryHandler = async () => {
        const title = titleRef.current.value
        const color = colorRef.current.value

        try {
            await addCategory({title , color , total : 0})
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Model show={show} onclose={onclose}>
            <div className='flex flex-col gap-4'>
                <label htmlFor="">Enter an amount</label>
                <input className="py-1 px-3 rounded-xl bg-slate-600" type="number" min={0.01} step={0.01} placeholder='Enter expense amount' value={expenseAmount} onChange={(e) => {
                    setExpenseAmount(e.target.value)
                }} />
            </div>

            {expenseAmount > 0 && (
                <div className='flex flex-col gap-4 mt-6'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-xl capitalize'>Select expense category</h3>
                        <button onClick={() => setshowNewCategory(true)} className='text-sm text-green-400'>+ New Category</button>
                    </div>

                    {showNewCategory && (
                        <div className='flex gap-2 items-center'>
                        <input className="py-1 px-3 rounded-xl bg-slate-600" type="text" placeholder='Enter title' ref={titleRef}/>
                        <label htmlFor="color">Pick Color</label>
                        <input className='cursor-pointer' type="color" ref={colorRef} />
                        <button onClick={addCategoryHandler} className="text-sm rounded-lg text-green-500 p-3 bg-gray-700 hover:bg-gray-800 m-2 ">Create</button>
                        <button onClick={() => setshowNewCategory(false)} className="text-sm border-0 h-10 bg-red-500 p-2 rounded-lg hover:bg-red-800">Cancel</button>
                    </div>
                    )}

                    
                    {expenses.map(expense => {
                        return (
                            <button key={expense.id} onClick={() => { setselectedCategory(expense.id) }} className=''>
                                <div style={{
                                    boxShadow: expense.id === selectedCategory ? "1px 1px 4px" : "none"
                                }} className='flex items-center justify-between px-4 py-4 rounded-3xl bg-slate-700 hover:bg-slate-800'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor: expense.color }}></div>
                                        <h4 className='capitalize'>{expense.title}</h4>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}

            {expenseAmount > 0 && selectedCategory && (
                <button className="text-sm rounded-lg text-green-500 p-3 bg-gray-700 m-2 mt-5" onClick={addExpenseItemHandler}>
                    Add Expense
                </button>
            )}
        </Model>
    )
}

export default AddExpensesModal
