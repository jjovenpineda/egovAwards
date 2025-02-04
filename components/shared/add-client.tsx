"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { apiGet, apiPost } from "@/utils/api";
import { encrypt, setCookie } from "@/utils/utility";
import { toast } from "@/hooks/use-toast";
import router from "next/router";

interface IRequest {
  clientName: string;
  clientSecret: string;
  library: string;
}

export default function AddClient({
  isopen,
  setIsOpen,
}: {
  isopen: boolean;
  setIsOpen: () => void;
}) {
  const [libraries, setLibraries] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const validationSchema = Yup.object().shape({
    clientName: Yup.string().required("This Field is required"),
    clientSecret: Yup.string().required("This Field is required"),
    library: Yup.string().required("This Field is required"),
  });

  const getLibrary = async () => {
    await apiGet("/api/psgc/get")
      .then((res) => {
        console.log("res :", res);
        const { success, message, data } = res;

        if (success) {
          setLibraries(data);
        }
        toast({
          title: "Success",
          description: message,
          duration: 2000,
        });
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        toast({
          title: "Unable to process the request",
          description: "Please check the entered details",
          duration: 3000,
        });
      });
  };
  useEffect(() => {
    getLibrary();
  });
  const handleSubmit = async (
    values: IRequest,
    { setFieldError }: FormikHelpers<IRequest>
  ) => {
    setIsLoading(true);
    console.log("values :", values);

    /*  await apiPost("/api/auth/apiAccess/create", values);
    console.log(values);
     .then((res) => {
        const { success, message, data } = res;
        if (success) {
          setData(data);
        }
        toast({
          title: "Success",
          description: message,
          duration: 2000,
        });
      })
      .catch((e) => {
        console.log(e);
        setFieldError("password", "Please check your credentials");
        setIsLoading(false);
        toast({
          title: "Unable to process the request",
          description: "Please check the entered details",
          duration: 3000,
        }); 
        
      }); */
  };
  return (
    <Formik
      initialValues={{ clientName: "", library: "" }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ isSubmitting, values, setFieldError, setFieldValue }) => (
        <Form>
          <AlertDialog open={isopen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add Client</AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-2 px-6">
                <div>
                  <Label htmlFor={"clientName"} className="font-medium text-sm">
                    Client Name
                  </Label>
                  <Field
                    type="text"
                    id={"clientName"}
                    name={"clientName"}
                    autoComplete="off"
                    placeholder={"John Doe"}
                    as={Input}
                    className="space-y-8 rounded-md bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor={"library"} className="font-medium text-sm">
                    Library
                  </Label>
                  <Select
                    onValueChange={(e) => setFieldValue("library", e)}
                    defaultValue={""}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Library" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel
                  className="uppercase"
                  onClick={() => setIsOpen()}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="uppercasxe"
                  onClick={() =>
                    handleSubmit(values, {
                      setFieldError,
                    } as FormikHelpers<IRequest>)
                  }
                >
                  Generate API Key
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Form>
      )}
    </Formik>
  );
}
