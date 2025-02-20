"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, X } from "lucide-react";
interface ModalProps {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function ModalWrapper({
  isEdit,
  isOpen,
  onClose,
  children,
}: ModalProps) {
  return (
    <>
      {isEdit ? (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            className="lg:max-w-[80%] h-[90%] overflow-auto px-10 lg:px-20"
            onInteractOutside={(event) => event.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter>
              <Button
                variant={"outline"}
                className="outline outline-1"
                type="submit"
                onClick={() => onClose()}
              >
                <X />
                Close
              </Button>
              <Button type="submit">
                <Save /> Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
