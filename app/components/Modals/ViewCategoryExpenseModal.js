import React from 'react'
import Model from '../Model'
import { useContext } from 'react';
import { expenseContext } from '@/lib/store/Expense-context';

import { currencyFormatter } from '@/lib/utils'

import { MdDelete } from "react-icons/md";

const ViewCategoryExpenseModal = ({ show, onclose, expense }) => {

    const {deleteExpenseItem , deleteExpenseCategory} = useContext(expenseContext)

    const deleteItemHandler = async (item) => {
        try {
            const updatedItems = (expense.items || []).filter((i) => i.id !== item.id);

            const updatedExpense = {
                items : [...updatedItems] ,
                total : expense.total - item.amount,
            }

            await deleteExpenseItem(updatedExpense , expense.id)
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteCategoryHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id)
        } catch (error) {
            console.log(error.message);
            
        }
    }

    return (
        <Model show={show} onclose={onclose}>
            <div className='flex justify-between items-center '>
                <h3 className='text-2xl'>{expense.title}</h3>
                <button onClick={() => deleteCategoryHandler()} className='text-sm border-0 h-10 bg-red-500 p-2 rounded-lg hover:bg-red-800'>Delete</button>
            </div>

            <div>
                <h3 className='my-4 text-xl'>Expense History</h3>
                {expense.items.map(item => {
                    return (
                        <div key={item.id} className='flex items-center justify-between'>
                            <small>{item.createdAt.toMillis ? new Date(item.createdAt.toMillis()).toISOString() : item.createdAt.toISOString()}</small>
                            <div className='flex items-center justify-between gap-1'>
                                <p className='flex items-center gap-2'>{currencyFormatter(item.amount)}</p>
                                <button onClick={() => {deleteItemHandler(item)}}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Model>
    )
}

export default ViewCategoryExpenseModal
