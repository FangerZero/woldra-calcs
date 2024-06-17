"use client"
import TextField from '@mui/material/TextField';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import { useState } from 'react';

export default function Form() {
    const [incomePercent, setIncomePercent] = useState(25);
    const [income, setIncome] = useState("0.00");
    const [expenses, setExpenses] = useState(1000.00);
    const [downPayment, setdownPayment] = useState(0);
    const [interest, setInterest] = useState("7.0");
    const [tax, setTax] = useState("2.0");
    const [insurance, setInsurance] = useState(2400);
    const [hoa, setHoa] = useState(0.00);
    const [loanTerm, setLoanTerm] = useState(360);
    
    const getMonthlyPayment = () => {
        const payment = (+income / 2) - expenses;
        return payment > 0 ? roundToHundredth(payment) : 0;
    };

    const getLoanAmt = () => {
        // Math.pow(x, y);
        const monthlyPayment = getMonthlyPayment();
        const i = (+interest / 100) / 12;
        const x = Math.pow((1+i), loanTerm);
        const h = insurance / 12;

        const top = 12 * monthlyPayment - insurance;
        const bottomTop = i * x;
        const bottomBottom = x - 1;
        const bottom = (12 * (bottomTop / bottomBottom)) + (+tax/100);

        const loan = roundToHundredth(top/bottom);

        return loan > 0 ? loan : 0;
    };

    /*
        Monthly Payment = (P (I(1+I)^N) / ((1+I)^N-1) ) + (P (T/12)) + (H/12) + A
        P - Principal
        I - Interest
        N - Amount of Payments
        T - Property Tax
        H - Home Insurance
        A - Monthly HoA Dues
    */
   
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number,
  ) => {
    setLoanTerm(newAlignment);
  };
  
  //============================
  // Utilities
  //============================
  function roundToHundredth(num: number) {
    return Math.round(num * 100) / 100;
  }

  return (
   <div className="lg:mx-64">
        <div className='my-4'>
            This uses the 50/20/30 rule (Expenses/Savings/Wants) 
            <br />
            PMI is  missing
        </div>
        <div className="flex flex-row">
            <div className="flex flex-col">
                <TextField id="income-amt" className="m-2" label="Monthly Take Home" value={income} variant="outlined" onChange={e => {setIncome(e.target.value)}}/>
                <TextField id="live-exp" className="m-2" label="Living Expenses" value={expenses} variant="outlined" onChange={e => {setExpenses(+e.target.value)}}/>
                <TextField id="down-pay" className="m-2" label="Down Payment" value={downPayment} variant="outlined" onChange={e => {setdownPayment(+e.target.value)}}/>
                <TextField id="int-rate" className="m-2" label="Interest Rate" value={interest} variant="outlined" onChange={e => {setInterest(e.target.value)}}/>
                <TextField id="tax-rate" className="m-2" label="Tax Rate" value={tax} variant="outlined" onChange={e => {setTax(e.target.value)}}/>
                <TextField id="ins-amt" className="m-2" label="Insurance" value={insurance} variant="outlined" onChange={e => {setInsurance(+e.target.value)}}/>
                <TextField id="hoa-amt" className="m-2" label="Home Owner Association" value={hoa} variant="outlined" onChange={e => {setHoa(+e.target.value)}}/>
                <ToggleButtonGroup
                    className="m-2"
                    color="primary"
                    value={loanTerm}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    >
                    <ToggleButton value="180">15 Years</ToggleButton>
                    <ToggleButton value="360">30 Years</ToggleButton>
                </ToggleButtonGroup>
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
                <div className="mb-4">${getLoanAmt()}</div>
                House Price
                <div className="mb-4">${roundToHundredth(getLoanAmt()+downPayment)}</div>
            </div>
        </div>
    </div>
  );
}
