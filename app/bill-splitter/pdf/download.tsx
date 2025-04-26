'use client'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import BillDocument from "./BillDocument";
import { PictureAsPdf } from '@mui/icons-material';

export default function Download({data}: any) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? (
    <PDFDownloadLink
    fileName="bill-split.pdf"
    document={<BillDocument data={data}/>}>
        <button className="items-center justify-center rounded border-black border-2 p-2 ml-2">
            <PictureAsPdf className="mx-2"/>PDF Export
        </button>
    </PDFDownloadLink>) : (<div>Is Loading...</div>)
};