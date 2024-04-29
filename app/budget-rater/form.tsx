"use client"
import TextField from '@mui/material/TextField';

import { useState } from 'react';

export default function from() {
    const [income, setIncome] = useState(0.00);
    const [bill, setBill] = useState({amount: 0.00, percent: 0});
    const [save, setSave] = useState({amount: 0.00, percent: 0});
    const [spend, setSpend] = useState({amount: 0.00, percent: 0});

    const getColor = (type: string) => {
        if ((bill.percent + save.percent + spend.percent) !== 100) {
            return "text-red-600";
        }

        switch(type) {
            case "bill":
                if (bill.percent > 80) {
                    return "text-red-600";
                } else if (bill.percent > 50) {
                    return "text-orange-400";
                }
                break;
            case "save":
                if (save.percent < 10) {
                    return "text-red-600";
                } else if (save.percent < 20) {
                    return "text-orange-400";
                }
                break;
            case "spend":
                if (spend.percent < 10) {
                    return "text-orange-400";
                }
                break;
        }
        return "text-green-600";
    }

    const updatePercent = (type: string, value: number) => {
        const newValue = {amount: value, percent: roundToHundredth((value/income) * 100)};
        switch(type) {
            case "bill":
                setBill(newValue);
                break;
            case "save":
                setSave(newValue);
                break;
            case "spend":
                setSpend(newValue);
                break;
        }
    }
    
    //============================
    // Utilities
    //============================
    const roundToHundredth = (number) => {
        return Math.round(number * 100) / 100;
    }

  return (
    <div className="lg:mx-64">
        <TextField id="income-amt" className="m-2" label="Take Home" value={income} variant="outlined" onChange={e => {setIncome(+e.target.value)}}/>
        <div className="lg:my-2 lg:flex">
            <div className="mx-2">
                <h3 className="pb-2 font-bold">Bills <span className={getColor("bill")}>{bill.percent}%</span></h3>
                <TextField id="bill-amt" label="Bills" value={bill.amount} variant="outlined" onChange={e => {updatePercent("bill", +e.target.value)}}/>
            </div>
            <div className="mx-2">
                <h3 className="pb-2 font-bold">Saving <span className={getColor("save")}>{save.percent}%</span></h3>
                <TextField id="save-amt" label="Saving" value={save.amount} variant="outlined" onChange={e => {updatePercent("save", +e.target.value)}}/>
            </div>
            <div className="mx-2">
                <h3 className="pb-2 font-bold">Spending <span className={getColor("spend")}>{spend.percent}%</span></h3>
                <TextField id="spend-amt" label="Spending" value={spend.amount} variant="outlined" onChange={e => {updatePercent("spend", +e.target.value)}}/>
            </div>
        </div>
        <div className="my-2">
        The Budget Rater is to help you get to the 50/20/30 rule. The goal is your bills are about 50% of your take home pay, while you save 20%, and spend the rest guilt free. 
        </div>
    </div>
  );
}
