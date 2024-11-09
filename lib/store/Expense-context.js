"use client"

import { createContext } from "react";
import { useState , useEffect , useContext} from "react";
import { authContext } from "./Auth-context";

import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc ,query , where } from "firebase/firestore";
import { db } from "@/lib/Firebase";

export const expenseContext = createContext({
    income: [],
    expenses : [],
    addIncomeItem : async () => {},
    removeIncomeItem : async () => {},
    addExpenseItem : async () => {},
    addCategory : async () => {},
    deleteExpenseItem : async () => {},
    deleteExpenseCategory : async () => {}
})

export default function ExpenseContextProvider({children}){
    const [income, setIncome] = useState([])
    const [expenses , setExpenses] = useState([])

    const {user} = useContext(authContext)

    const addIncomeItem = async (newIncome) =>{
        try {
            const docRef = await addDoc(collection(db, "income"), newIncome)
      
            setIncome((prevState) => {
              return [
                ...prevState,
                {
                  id: docRef.id,
                  ...newIncome
                }
              ]
            })
          } catch (error) {
            console.log(error.message);
            throw error
          }
    }

    const removeIncomeItem = async (incomeID) =>{
        const docRef = doc(db, 'income', incomeID)
    try {
      await deleteDoc(docRef)
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeID)
      })
    } catch (error) {
        console.log(error.message);
        throw error
        
    }
    }

    const addExpenseItem = async (expenseCategoryID , newExpense) => {
      const docRef = doc(db,'expenses',expenseCategoryID)
      try {
        await updateDoc(docRef,{...newExpense})
        setExpenses(prevState => {
          const upadateExpenses = [...prevState]

          const findIndex = upadateExpenses.findIndex(expense => {
            return expense.id === expenseCategoryID
          })

          upadateExpenses[findIndex] = {id : expenseCategoryID , ...newExpense}

          return upadateExpenses
        })
      } catch (error) {
        throw error
      }
    }

    const deleteExpenseItem = async (updatedExpense , expenseCategoryID) => {
      try {
        const docRef = doc(db , 'expenses' , expenseCategoryID)
        await updateDoc(docRef,{
          ...updatedExpense,
        })

        setExpenses(prevExpenses => {
          const updatedExpenses = [...prevExpenses]
          const position = updatedExpenses.findIndex((ex) => ex.id === expenseCategoryID)
          updatedExpenses[position].items = [...updatedExpense.items]
          updatedExpenses[position].total = updatedExpense.total

          return updatedExpenses
        })
      } catch (error) {
        
      }
    }

    const addCategory = async ( category) => {
      try {
        const collectionRef = collection(db , 'expenses')
        const docSnap = await addDoc(collectionRef, {
          uid : user.uid, 
          ...category,
          items: [],
        })

        setExpenses(prevExpenses => {
          return [
            ...prevExpenses,
            {
              id : docSnap.id,
              uid : user.uid,
              items : [],
              ...category
            }
          ]
        })
      } catch (error) {
        console.log(error.message);
        
      }

    }

    const deleteExpenseCategory = async (expenseCategoryID) => {
      try { 
        const docRef = doc(db,'expenses' ,expenseCategoryID)
        await deleteDoc(docRef)

        setExpenses(prevState => {
          return prevState.filter(i => i.id !== expenseCategoryID)
        })
      } catch (error) {
        console.log(error.message)
      }
    }

    useEffect(() => {
      if(!user){
        return
      }

        const getIncome = async () => {
          try {
            const docRef = collection(db, 'income');
            const q = query(docRef , where("uid" , '==' , user.uid))
            const docSnap = await getDocs(q);
            const data = docSnap.docs.map(doc => {
              return {
                id: doc.id,
                // ...doc.data(),
                amount: doc.data().amount,
                description: doc.data().description,
                createdAt: new Date(doc.data().createdAt.toMillis()),
              };
            });
            setIncome(data);
          } catch (error) {
            console.error("Error fetching income data:", error);
          }
        };

        const getExpensesData = async() => {
            const collectionRef = collection(db , 'expenses')
            const q = query(collectionRef , where("uid" , '==' , user.uid))
            const docsSnap = await getDocs(q)

            const data = docsSnap.docs.map((doc) => {
                return {
                    id : doc.id,
                    ...doc.data(),

                }
            })
            setExpenses(data)
        }
    
        getIncome();
        getExpensesData();
      }, [user]);

    return <expenseContext.Provider value={{income, expenses , addIncomeItem , removeIncomeItem , addExpenseItem ,addCategory ,deleteExpenseItem , deleteExpenseCategory}}>
        {children}
    </expenseContext.Provider>
}

