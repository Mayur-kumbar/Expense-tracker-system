import React from 'react'
import { currencyFormatter } from '@/lib/utils'
import { useState } from 'react'
import ViewCategoryExpenseModal from './Modals/ViewCategoryExpenseModal'

const expenseCategory = ({ expense }) => {
    const [showCategoryModal, setshowCategoryModal] = useState(false)
    return (
        <>
            <ViewCategoryExpenseModal show={showCategoryModal} onclose={setshowCategoryModal} expense={expense} />
            <button onClick={() => setshowCategoryModal(true)} className='w-full'>
                <div className="flex justify-between p-3 m-3 rounded-3xl bg-slate-700 hover:bg-slate-500 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <div className="w-[1rem] h-[1rem] rounded-full" style={{ backgroundColor: expense.color }} />
                        <div>{expense.title}</div>
                    </div>
                    <div>{currencyFormatter(expense.total)}</div>
                </div>
            </button>
        </>
    )
}

export default expenseCategory
