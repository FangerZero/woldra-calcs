import type { Metadata } from "next";
import Form from "./form";

export const metadata: Metadata = {
    title: "Woldra Calculators - Affordability",
    description: "A mortgage calculatore that is truer to what you should be able to afford.",
  };

export default function BillSplitter() {
    return (
        <main>
            <Form />
        </main>
    )
}