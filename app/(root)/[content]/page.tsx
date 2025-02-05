"use client";
import { Card, CardContent } from "@/components/ui/card";
import AddClient from "@/components/shared/add-client";
import { Button } from "@/components/ui/button";
import { Check, Copy, Plus } from "lucide-react";
import React, { useState } from "react";
import { m } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page({ params }: { params: { content: string } }) {
  const { content } = params;
  const [addClientDialog, setAddClientDialog] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex w-full p-8">
      {content == "request" && (
        <div className="w-full max-w-3xl mx-auto h-min space-y-4 m-16">
          <div className="flex justify-between">
            <h1 className="main-title">Request List</h1>
            <Button onClick={() => setAddClientDialog(true)}>
              <Plus /> <p className="uppercase">add client</p>
            </Button>
          </div>
          <Card>
            <CardContent>
              {" "}
              <Table className="">
                <TableHeader className="border-b">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Library Name</TableHead>
                    <TableHead>Api Key</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice} className="border-b">
                      <TableCell className="font-medium">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell>{invoice.totalAmount}</TableCell>
                      <TableCell>
                        <CopyText text={invoice.invoice} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
      <AddClient
        isopen={addClientDialog}
        setIsOpen={() => setAddClientDialog(false)}
      />
    </div>
  );
}

const CopyText = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 5000);
    } catch (error) {
      console.error("Failed to copy text:", error);
      alert("Failed to copy text.");
    }
  };
  return (
    <TooltipProvider delayDuration={75}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => copyToClipboard(text)}
            className="p-1 cursor-pointer rounded-sm transition-all duration-300 text-slate-800 pt-2 hover:text-blue-500"
          >
            {copied == text ? (
              <Check size={15} className="text-green-400" />
            ) : (
              <Copy size={15} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>Copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
