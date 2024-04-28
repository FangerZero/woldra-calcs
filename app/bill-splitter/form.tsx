"use client"

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function from() {
  const blankTennent = {name: "", startDate: new Date(), endDate: new Date(), bill: 0, dayPercent: 0};
  const [tennentList, setTennentList] = useState([blankTennent]);
  const [bill, setBill] = useState({amount: 0.00, startDate: new Date(), endDate: new Date()});

  const splitBill = () => {
    const billDays = dateDeltaAddOne(bill.startDate, bill.endDate);
    const newTennentList = tennentList.map(tennent => {return {...tennent, bill: 0, dayPercent: datePercentOfStay(tennent.startDate, tennent.endDate, billDays)}});
    const sumOfTennentsPercent = newTennentList.reduce((accumulator, tennent) => accumulator + tennent.dayPercent, 0);
    let finalTennentList = newTennentList.map(tennent => {return {...tennent, bill: getTennentPayment(tennent.dayPercent, sumOfTennentsPercent, bill.amount)}});
    const billTotal = roundToHundredth(finalTennentList.reduce((accumulator, tennent) => accumulator + tennent.bill, 0));

    if (billTotal !== bill.amount) {
      let sortedTennentList = finalTennentList.toSorted(compareDesc);
      let leftOverPennies = roundToHundredth(bill.amount - billTotal) * 100;
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

  const getTennentPayment = (tenPercent, sumOfTennentsPercent, billAmount) => {
    //  Tennent Pay = Tennent % * (billAmount / (Sum of Tennent %))
    return roundToHundredth(tenPercent * (billAmount / sumOfTennentsPercent));
  }


  //============================
  // Utilities
  //============================
  function roundToHundredth(number) {
    return Math.round(number * 100) / 100;
  }

  function compareDesc(a, b) {
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

  const datePercentOfStay = (tenStart, tenEnd, fullDays) => {
    return dateDeltaAddOne(tenStart, tenEnd)/fullDays;
  }

  const dateDelta = (startDate, endDate) =>  {
    return Math.round((endDate - startDate) / day);
  }
  
  const dateDeltaAddOne = (startDate, endDate) =>  {
    return dateDelta(startDate, endDate) + 1;
  }

  //============================
  // Tennents
  //============================
  const addTennent = () => {
    setTennentList([...tennentList, blankTennent]);
  }

  const updateTennent = (index, val, type) => {
    let newTennentList = tennentList;
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
    // console.log('newTennentList: ', newTennentList);
    setTennentList([...newTennentList]);
  }

  const removeTennent = (index) => {
    let newTennentList = [...tennentList];
    newTennentList.splice(index, 1);
    setTennentList(newTennentList);
  }

  return (
    <div className="from">
        <div className="pb-4 px-1">      
            <TextField id="bill-amt" label="Bill Amount" value={bill.amount} variant="outlined" onChange={e => {setBill({...bill, amount: e.target.value})}}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="px-1" label="Start Date" defaultValue={dayjs(new Date())} value={dayjs(bill.startDate)} onChange={newVal => setBill({...bill, startDate: newVal})} />
                <DatePicker className="px-1" label="End Date" defaultValue={dayjs(new Date())} value={dayjs(bill.endDate)} onChange={newVal => setBill({...bill, endDate: newVal})} />
            </LocalizationProvider>
        </div>
      {tennentList.map((tennent, index) => {
        return (
          <div key={index} className="py-1">
            <TextField id="tennent-name" label="Name" value={tennent.name} variant="outlined" onChange={e => updateTennent(index, e.target.value, "name")}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className="px-1" label="Start Date" defaultValue={dayjs(new Date())} value={dayjs(tennent.startDate)} onChange={newVal => updateTennent(index, newVal, "startDate")} />
              <DatePicker className="px-1" label="End Date" defaultValue={dayjs(new Date())} value={dayjs(tennent.endDate)} onChange={newVal => updateTennent(index, newVal, "endDate")} />
            </LocalizationProvider>
            <TextField disabled id="tennent-bill" className="px-1" label="bill" value={tennent.bill} variant="outlined" />
            {tennentList.length > 1 && <RemoveCircleOutline onClick={() => removeTennent(index)} />}
            {index === (tennentList.length - 1) && <AddCircleOutline onClick={addTennent} />}
        </div>
        );
      })}
      <button onClick={splitBill} className="rounded border-black border-2 p-2 m-1">Submit</button>
    </div>
  );
}

export default from;