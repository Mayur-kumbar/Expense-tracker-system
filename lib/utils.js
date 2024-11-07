export const currencyFormatter = (amount) =>{
    const rupee = new Intl.NumberFormat('en-IN', 
        { 
          style: 'currency',
          currency: 'INR' 
        });
    return rupee.format(amount)
}