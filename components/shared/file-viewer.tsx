import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { View } from "lucide-react";
export default function FileViewer({ url }: any) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild className="hover:cursor-pointer">
          <View size={15}></View>
        </DialogTrigger>
        <DialogContent className="h-[80vh] overflow-auto ">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="h-[80vh]">
            <iframe src={url} className="w-full h-full" />
          </div>
          <DialogFooter>
            <DialogClose asChild className="w-full">
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
