"use client"
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


import { useState } from 'react';

export default function Form() {
    const [incomePercent, setIncomePercent] = useState(25);
    const [income, setIncome] = useState(0.00);
    const [expenses, setExpenses] = useState(1000.00);
    const [downPayment, setdownPayment] = useState(0);
    const [interest, setInterest] = useState(2400);
    const [tax, setTax] = useState(0);
    const [insurance, setInsurance] = useState(0.00);
    const [hoa, setHoa] = useState(0.00);
    const [payments, setPayments] = useState(360);

    const getMonthlyPayment = () => {
        return (income / 2) - expenses;
    }

    /*
        we determined the final monthly payment
        We next need to determine Insurnace cost in regards to monthly payment
            NewMonthly = MonthlyPayment - (Insurance / 12)
        
        Monthly Payment = (P (I(1+I)^N) / ((1+I)^N-1) ) + (P (T/12)) +(H/12) + A
        P - Principal
        I - Interest
        N - Amount of Payments
        T - Property Tax
        H - Home Insurance
        A - Monthly HoA Dues
    */

  return (
   <div className="lg:mx-64">
        <div className='my-4'>
            This uses the 50/20/30 rule (Expenses/Savings/Wants)
        </div>
        <div className="flex flex-row">
            <div className="flex flex-col">
                <TextField id="income-amt" className="m-2" label="Monthly Take Home" value={income} variant="outlined" onChange={e => {setIncome(+e.target.value)}}/>
                <TextField id="live-exp" className="m-2" label="Living Expenses" value={expenses} variant="outlined" onChange={e => {setExpenses(+e.target.value)}}/>
                <TextField id="down-pay" className="m-2" label="Down Payment" value={downPayment} variant="outlined" onChange={e => {setdownPayment(+e.target.value)}}/>
                <TextField id="int-rate" className="m-2" label="Interest Rate" value={interest} variant="outlined" onChange={e => {setInterest(+e.target.value)}}/>
                <TextField id="tax-rate" className="m-2" label="Tax Rate" value={tax} variant="outlined" onChange={e => {setTax(+e.target.value)}}/>
                <TextField id="ins-amt" className="m-2" label="Insurance" value={insurance} variant="outlined" onChange={e => {setInsurance(+e.target.value)}}/>
                <TextField id="hoa-amt" className="m-2" label="Home Owner Association" value={hoa} variant="outlined" onChange={e => {setHoa(+e.target.value)}}/>
            </div>
            <div className="ml-16">
                Monthly Payment 
                <Tooltip title="Mortgage Interest Property Tax or Rent">
                <IconButton>
                    <HelpOutlineIcon className="text-sm"/>
                </IconButton>
                </Tooltip>
                <div className="mb-4">${getMonthlyPayment()}</div>
                Loan Amount
                <div className="mb-4">$</div>
            </div>
        </div>
    </div>
  );
}
