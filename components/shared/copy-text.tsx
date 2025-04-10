"use client";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
interface Props {
  text: string;
}
export const CopyText = ({ text }: Props) => {
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
    <div className="flex w-full items-center gap-1 leading-none  ">
      <h2 className="text-slate-900 line-clamp-1 ">{text}</h2>
      <TooltipProvider delayDuration={75}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => copyToClipboard(text)}
              className="p-1 mb-0.5 cursor-pointer rounded-sm transition-all duration-300 text-slate-700 pt-2 hover:text-blue-500"
            >
              {text && (
                <>
                  {copied == text ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} className="text-slate-400" />
                  )}
                </>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
