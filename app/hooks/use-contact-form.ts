"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";

export interface ContactFormValues {
  fullName: string;
  email: string;
  projectDetails: string;
  budget?: string;
  timeline?: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  projectDetails: Yup.string()
    .min(10, "Please provide a bit more detail (minimum 10 characters)")
    .required("Project description is required"),
  budget: Yup.string(),
  timeline: Yup.string(),
});

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  projectDetails: "",
  budget: "",
  timeline: "",
};

export function useContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik<ContactFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSubmitError(null);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Something went wrong. Please try again.",
          );
        }

        setSubmittedEmail(values.email);
        setIsSubmitted(true);
        resetForm();
      } catch (error: any) {
        console.error("Error submitting contact form:", error);
        setSubmitError(
          error.message ||
            "An error occurred while sending your message. Please try again later.",
        );
      }
    },
  });

  const isFormValid =
    !formik.errors.fullName &&
    !formik.errors.email &&
    !formik.errors.projectDetails &&
    formik.values.fullName.trim() !== "" &&
    formik.values.email.trim() !== "" &&
    formik.values.projectDetails.trim() !== "";

  return {
    formik,
    isFormValid,
    isSubmitted,
    submittedEmail,
    submitError,
  };
}
