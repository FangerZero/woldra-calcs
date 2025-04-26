'use client'
import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import BillDocument from "./BillDocument";

export default function Viewer({data}: any) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? (
    <PDFViewer width={500} height={725}>
        <BillDocument data={data} />
    </PDFViewer>) : (<div>Is Loading...</div>)
};