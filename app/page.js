"use client";

import { useState ,useContext ,  useEffect} from "react";
import { expenseContext } from "@/lib/store/Expense-context";
import { authContext } from "@/lib/store/Auth-context";

import { currencyFormatter } from "@/lib/utils";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import ExpenseCategory from "./components/ExpenseCategory";
import AddIncomeModal from "./components/Modals/AddIncomeModal";
import AddExpensesModal from "./components/Modals/AddExpensesModal";
import SignIn from "./components/SignIn";


ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {

  const [incomeModelOpened, setincomeModelOpened] = useState(false)
  const [expenseModelOpened, setexpenseModelOpened] = useState(false)
  const [Balence, setBalence] = useState(0)

  const {expenses , income} = useContext(expenseContext)
  const {user} = useContext(authContext)

  useEffect(() => {
    const newBalence = income.reduce((total, i) => {
      return total + i.amount
    } , 0) -
    expenses.reduce((total , e) => {
      return total + e.total
    }, 0)


    setBalence(newBalence)
  
  }, [expenses , income])
  

  if(!user){
    return <SignIn/>
  }

  return (
    <>
      <AddIncomeModal show={incomeModelOpened} onclose={setincomeModelOpened}/>
     <AddExpensesModal show={expenseModelOpened} onclose={setexpenseModelOpened}/>
      <div>
        <main className="flex w-full justify-center ">
          <div className="w-full sm:w-[50%] p-4 ">
            <div className="text-[0.7rem] text-gray-400">My Balence</div>
            <div className="text-3xl font-bold mb-3">{currencyFormatter(Balence)}</div>
            <div className="flex ">
              <button onClick={() => {setexpenseModelOpened(true)}} className="border-green-600 border rounded-lg text-green-500 p-3 hover:bg-gray-700 m-2 ">+Expenses</button>
              <button onClick={() => {
                setincomeModelOpened(true)
              }} className="border-green-600 border rounded-lg text-green-500 p-3 hover:bg-gray-700 m-2 " >+Income</button>
            </div>
          </div >
        </main >

        <section className="flex w-full justify-center">
          <div className="w-full sm:w-[50%] p-4 ">
            <h3 className="font-bold">My Expenses</h3>
            {expenses.map(expense => {
              return <ExpenseCategory key={expense.id} expense={expense} />
            })}
          </div>
        </section>

        <section className="flex w-full justify-center">
          <div className="w-full sm:w-[50%] p-4 ">
            <a id="stats"/>
            <h3 className="font-bold">Stats</h3>
            <div className="w-full sm:w-[60%] md:w-[50%] lg:w-[40%] mx-auto">
              <Doughnut data={{
                labels: expenses.map(expense => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map(expense => expense.total),
                    backgroundColor: expenses.map(expense => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 2,
                  }
                ]
              }}
                options={{
                  maintainAspectRatio: true,
                  responsive: true,
                }} />
            </div>
          </div>
        </section>


      </div >
    </>
  );
}
