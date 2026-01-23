"use client"

import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AddCircleOutline, CalendarMonth, RemoveCircleOutline } from '@mui/icons-material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Download from './pdf/download';
// import Viewer from './pdf/viewer';

export default function Form() {
  const [submitted, setSubmitted] = useState(false);
  const blankTenant = {name: "", startDate: new Date(), endDate: new Date(), bill: 0, dayPercent: 0};
  const [tenantList, setTenantList] = useState([blankTenant]);
  const [bill, setBill] = useState({amount: "0.00", startDate: new Date(), endDate: new Date()});

  useEffect(() => {
    if (submitted) {
      setSubmitted(false); 
    }
  }, [tenantList]);


  const isValidDate = (date: Date) => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  const splitBill = async () => {
    const billDays = dateDeltaAddOne(bill.startDate, bill.endDate);
    const newTenantList = tenantList.map(tenant => {return {...tenant, bill: 0, dayPercent: datePercentOfStay(tenant.startDate, tenant.endDate, billDays, bill.startDate, bill.endDate)}});
    const sumOfTenantsPercent = newTenantList.reduce((accumulator, tenant) => accumulator + tenant.dayPercent, 0);
    let finalTenantList = newTenantList.map(tenant => {return {...tenant, bill: getTenantPayment(tenant.dayPercent, sumOfTenantsPercent, +bill.amount)}});
    const billTotal = roundToHundredth(finalTenantList.reduce((accumulator, tenant) => accumulator + tenant.bill, 0));
    let invalidDate = false;

    if (billTotal !== +bill.amount) {
      let sortedTenantList = finalTenantList.toSorted(compareDesc);
      let leftOverPennies = roundToHundredth(+bill.amount - billTotal) * 100;
      const iterator = sortedTenantList.entries();
      let currentTenant = iterator.next().value;
      
      while(currentTenant !== undefined) {
        if(!isValidDate(currentTenant[1].startDate) || !isValidDate(currentTenant[1].startDate)) {
          invalidDate = true;
        }
        if (leftOverPennies === 0) {
          break;
        }
        const currentTenantName = currentTenant[1].name ? currentTenant[1].name : undefined;
        const foundIndex = finalTenantList.findIndex(tenant => tenant.name === currentTenantName)
        if (leftOverPennies > 0) {
          finalTenantList[foundIndex] = {...currentTenant[1], bill: currentTenant[1].bill + .01};
          leftOverPennies--;
        } else if (leftOverPennies < 0) {
          finalTenantList[foundIndex] = {...currentTenant[1], bill: currentTenant[1].bill - .01};
          leftOverPennies++;
        }
        currentTenant = iterator.next().value;
      } 
    }
    if (invalidDate) {
      return;
    }
    await setTenantList(finalTenantList);
    setSubmitted(true); // Must be last because of useEffect()
  }

  const getTenantPayment = (tenPercent: number, sumOfTenantsPercent: number, billAmount: number) => {
    //  Tenant Pay = Tenant % * (billAmount / (Sum of Tenant %))
    return roundToHundredth(tenPercent * (billAmount / sumOfTenantsPercent));
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
  // Tenants
  //============================
  const addTenant = () => {
    setTenantList([...tenantList, {...blankTenant, startDate: bill.startDate, endDate: bill.endDate}]);
  }

  const updateTenant = (index: number, val: any, type: string) => {
    let newTenantList = tenantList;
       
    switch(type.toLowerCase()) {
      case "startdate":
        newTenantList[index] = {...newTenantList[index], startDate: new Date(val)};
        break;
      case "enddate":
        newTenantList[index] = {...newTenantList[index], endDate: new Date(val)};
        break;
      case "name":
        newTenantList[index] = {...newTenantList[index], name: val};
        break; 
      case "bill":
        newTenantList[index] = {...newTenantList[index], bill: val};
        break; 
      default:
    }
    setTenantList([...newTenantList]);
  }

  const updateTenantWithBillDates = (index: number) => {
    updateTenant(index, bill.startDate, "startDate"); 
    updateTenant(index, bill.endDate, "endDate");

  }

  const removeTenant = (index: number) => {
    let newTenantList = [...tenantList];
    newTenantList.splice(index, 1);
    setTenantList(newTenantList);
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
      {tenantList.map((tenant, index) => {
        return (
          <div key={index} className="my-2 lg:my-0 lg:py-1">
            <CalendarMonth onClick={() => updateTenantWithBillDates(index)} />
            <TextField className="my-2 lg:my-0" id="tenant-name" label="Name" value={tenant.name} variant="outlined" onChange={e => updateTenant(index, e.target.value, "name")}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className="my-2 lg:my-0 lg:px-1" label="Start Date" defaultValue={dayjs(new Date())} value={dayjs(tenant.startDate)} onChange={newVal => updateTenant(index, newVal, "startDate")} />
              <DatePicker className="my-2 lg:my-0 lg:px-1" label="End Date" defaultValue={dayjs(new Date())} value={dayjs(tenant.endDate)} onChange={newVal => updateTenant(index, newVal, "endDate")} />
            </LocalizationProvider>
            <TextField disabled id="tenant-bill" className="my-2 lg:my-0 lg:px-1" label="Bill Amount" value={formatPayment(tenant.bill)} variant="outlined" />
            {tenantList.length > 1 && <RemoveCircleOutline className="my-2 lg:my-0" onClick={() => removeTenant(index)} />}
            {index === (tenantList.length - 1) && <AddCircleOutline className="my-2 lg:my-0" onClick={addTenant} />}
        </div>
        );
      })}
      <div className="m-2 mt-4 flex justify-center px-4 lg:px-24">
        <button onClick={splitBill} className="items-center justify-center rounded border-black border-2 p-2">Submit</button>
        {submitted && <Download data={{bill, tenantList}} />}
      </div>
    </div>
  );
}
/*

      <div className="m-2 mt-4 flex justify-center px-4 lg:px-24">
        <Viewer data={{bill, tenantList}} />
      </div>
*/
