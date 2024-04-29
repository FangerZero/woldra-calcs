"use client"
import TextField from '@mui/material/TextField';

import { useState } from 'react';

export default function from() {
    const [income, setIncome] = useState(0.00);
    const [bill, setBill] = useState({amount: 0.00, percent: 0});
    const [save, setSave] = useState({amount: 0.00, percent: 0});
    const [spend, setSpend] = useState({amount: 0.00, percent: 0});

    const getColor = (type: string) => {
        let color = "text-green-600";

        switch(type) {
            case "bill":
                if (bill.percent > 80) {
                    color = "text-red-600";
                } else if (bill.percent > 60) {
                    color = "text-orange-400";
                }
                break;
            case "save":
                if (save.percent < 10) {
                    color = "text-red-600";
                } else if (save.percent < 20) {
                    color = "text-orange-400";
                }
                break;
            case "spend":
                if ((spend.percent + save.percent + bill.percent) > 100 ) {
                    color = "text-pink-600";
                } else if (spend.percent < 10) {
                    color = "text-orange-400";
                }
                break;
        }
        return color;
    }

  return (
    <div className="from">
        <TextField id="income-amt" className="m-2" label="Income" value={income} variant="outlined"/>
        <div className="my-2 flex">
            <div className="mx-2">
                <h3 className="pb-2 font-bold">Bills <span className={getColor("bill")}>{bill.percent}%</span></h3>
                <TextField id="bill-amt" label="Bills" value={bill.amount} variant="outlined"/>
            </div>
            <div className="mx-2">
                <h3 className="pb-2 font-bold">Saving <span className={getColor("save")}>{save.percent}%</span></h3>
                <TextField id="save-amt" className="mx-2" label="Saving" value={save.amount} variant="outlined"/>
            </div>
            <div className="mx-2">
                <h3 className="pb-2 font-bold">Spending <span className={getColor("spend")}>{spend.percent}%</span></h3>
                <TextField id="spend-amt" className="mx-2" label="Spending" value={spend.amount} variant="outlined"/>
            </div>
        </div>
    </div>
  );
}
