"use client"

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AddCircleOutline, CalendarMonth, RemoveCircleOutline } from '@mui/icons-material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Form() {
  const blankTennent = {name: "", startDate: new Date(), endDate: new Date(), bill: 0, dayPercent: 0};
  const [tennentList, setTennentList] = useState([blankTennent]);
  const [bill, setBill] = useState({amount: "0.00", startDate: new Date(), endDate: new Date()});

  const splitBill = () => {
    const billDays = dateDeltaAddOne(bill.startDate, bill.endDate);
    const newTennentList = tennentList.map(tennent => {return {...tennent, bill: 0, dayPercent: datePercentOfStay(tennent.startDate, tennent.endDate, billDays, bill.startDate, bill.endDate)}});
    const sumOfTennentsPercent = newTennentList.reduce((accumulator, tennent) => accumulator + tennent.dayPercent, 0);
    let finalTennentList = newTennentList.map(tennent => {return {...tennent, bill: getTennentPayment(tennent.dayPercent, sumOfTennentsPercent, +bill.amount)}});
    const billTotal = roundToHundredth(finalTennentList.reduce((accumulator, tennent) => accumulator + tennent.bill, 0));

    if (billTotal !== +bill.amount) {
      let sortedTennentList = finalTennentList.toSorted(compareDesc);
      let leftOverPennies = roundToHundredth(+bill.amount - billTotal) * 100;
      const iterator = sortedTennentList.entries();
      let currentTennent = iterator.next().value;
      while(currentTennent !== undefined) {
        if (leftOverPennies === 0) {
          break;
        }
        const foundIndex = finalTennentList.findIndex(tennent => tennent.name === currentTennent[1].name)
        if (leftOverPennies > 0) {
          finalTennentList[foundIndex] = {...currentTennent[1], bill: currentTennent[1].bill + .01};
          leftOverPennies--;
        } else if (leftOverPennies < 0) {
          finalTennentList[foundIndex] = {...currentTennent[1], bill: currentTennent[1].bill - .01};
          leftOverPennies++;
        }
        currentTennent = iterator.next().value;
      } 
      
    }
    setTennentList(finalTennentList);
  }

  const getTennentPayment = (tenPercent: number, sumOfTennentsPercent: number, billAmount: number) => {
    //  Tennent Pay = Tennent % * (billAmount / (Sum of Tennent %))
    return roundToHundredth(tenPercent * (billAmount / sumOfTennentsPercent));
  }

  const formatPayment = (payment: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      payment,
    );
  };


  //============================
  // Utilities
  //============================
  function roundToHundredth(num: number) {
    return Math.round(num * 100) / 100;
  }

  function compareDesc(a: any, b: any) {
    if (a.dayPercent > b.dayPercent) {
      return -1;
    } else if (a.dayPercent < b.dayPercent) {
      return 1;
    }
    return 0;
  }
  
  //============================
  // Dates
  //============================
  const day = (1000 * 60 * 60 * 24);

  const datePercentOfStay = (tenStart: Date, tenEnd: Date, fullDays: number, billStart: Date, billEnd: Date) => {
    const start = tenStart < billStart ? billStart : tenStart;
    const end = tenEnd > billEnd ? billEnd : tenEnd;
    return dateDeltaAddOne(start, end)/fullDays;
  }

  const dateDelta = (startDate: any, endDate: any) =>  {
    return Math.round((endDate - startDate) / day);
  }
  
  const dateDeltaAddOne = (startDate: Date, endDate: Date) =>  {
    return dateDelta(+startDate, +endDate) + 1;
  }

  //============================
  // Tennents
  //============================
  const addTennent = () => {
    setTennentList([...tennentList, blankTennent]);
  }

  const updateTennent = (index: number, val: any, type: string) => {
    let newTennentList = tennentList;
    if (index < 2) {
      console.log('tennetList', tennentList);
    }
   
    switch(type.toLowerCase()) {
      case "startdate":
        newTennentList[index] = {...newTennentList[index], startDate: new Date(val)};
        break;
      case "enddate":
        newTennentList[index] = {...newTennentList[index], endDate: new Date(val)};
        break;
      case "name":
        newTennentList[index] = {...newTennentList[index], name: val};
        break; 
      case "bill":
        newTennentList[index] = {...newTennentList[index], bill: val};
        break; 
      default:
    }
    setTennentList([...newTennentList]);
  }

  const updateTennentWithBillDates = (index: number) => {
    updateTennent(index, bill.startDate, "startDate"); 
    updateTennent(index, bill.endDate, "endDate");

  }

  const removeTennent = (index: number) => {
    let newTennentList = [...tennentList];
    newTennentList.splice(index, 1);
    setTennentList(newTennentList);
  }

  return (
    <div>
        <div className="pb-4">      
            <TextField className="my-2 lg:my-0"  id="bill-amt" label="Utility Amount" value={bill.amount} variant="outlined" onChange={e => {setBill({...bill, amount: e.target.value})}}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="my-2 lg:my-0 lg:px-1" label="Start Date" defaultValue={dayjs(new Date())} value={dayjs(bill.startDate)} onChange={newVal => setBill({...bill, startDate: newVal ? newVal.toDate() : new Date()})} />
                <DatePicker className="my-2 lg:my-0 lg:px-1" label="End Date" defaultValue={dayjs(new Date())} value={dayjs(bill.endDate)} onChange={newVal => setBill({...bill, endDate: newVal ? newVal.toDate() : new Date()})} />
            </LocalizationProvider>
        </div>
      {tennentList.map((tennent, index) => {
        return (
          <div key={index} className="my-2 lg:my-0 lg:py-1">
            <CalendarMonth onClick={() => updateTennentWithBillDates(index)} />
            <TextField className="my-2 lg:my-0" id="tennent-name" label="Name" value={tennent.name} variant="outlined" onChange={e => updateTennent(index, e.target.value, "name")}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className="my-2 lg:my-0 lg:px-1" label="Start Date" defaultValue={dayjs(new Date())} value={dayjs(tennent.startDate)} onChange={newVal => updateTennent(index, newVal, "startDate")} />
              <DatePicker className="my-2 lg:my-0 lg:px-1" label="End Date" defaultValue={dayjs(new Date())} value={dayjs(tennent.endDate)} onChange={newVal => updateTennent(index, newVal, "endDate")} />
            </LocalizationProvider>
            <TextField disabled id="tennent-bill" className="my-2 lg:my-0 lg:px-1" label="Bill Amount" value={formatPayment(tennent.bill)} variant="outlined" />
            {tennentList.length > 1 && <RemoveCircleOutline className="my-2 lg:my-0" onClick={() => removeTennent(index)} />}
            {index === (tennentList.length - 1) && <AddCircleOutline className="my-2 lg:my-0" onClick={addTennent} />}
        </div>
        );
      })}
      <div className="m-2 mt-4 flex justify-center px-4 lg:px-24">
        <button onClick={splitBill} className="items-center justify-center rounded border-black border-2 p-2">Submit</button>
      </div>
    </div>
  );
}
