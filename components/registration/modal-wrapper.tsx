"use client";

import React, { useEffect } from "react";
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
import { storage } from "@/utils/useStorage";
interface ModalProps {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  setFieldValue: Function;
  values: any;
}
export default function ModalWrapper({
  isEdit,
  isOpen,
  onClose,
  children,
  setFieldValue,
  values,
}: ModalProps) {
  const loadCachedData = () => {
    const cachedData = storage.getItem("formData");

    if (cachedData && typeof cachedData === "object") {
      Object.entries(cachedData).forEach(([key, value]) => {
        setFieldValue(key, value);
      });
    }
  };
  useEffect(() => {
    storage.setItem("isPaused", true);
  }, []);

  return (
    <>
      {isEdit ? (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            x={false}
            className="lg:max-w-[80%] h-[90%] overflow-auto px-10 lg:px-20"
            onInteractOutside={(event) => event.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter className="">
              <Button
                variant={"outline"}
                className="outline outline-1"
                type="button"
                onClick={() => {
                  onClose(), loadCachedData();
                }}
              >
                <X />
                Close
              </Button>
              <Button
                type="button"
                className="mb-2"
                onClick={() => {
                  onClose(),
                    storage.setItem("isPaused", false),
                    storage.setItem("formData", JSON.stringify(values));
                }}
              >
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
