"use client";

import { FormikProps } from "formik";
import { ContactFormValues } from "../hooks/use-contact-form";
import FormField from "./form-field";
import ProjectDetailsField from "./project-details-field";
import SubmitButton from "./submit-button";

interface ContactFormProps {
  formik: FormikProps<ContactFormValues>;
  isFormValid: boolean;
  submitError: string | null;
}

export default function ContactForm({
  formik,
  isFormValid,
  submitError,
}: ContactFormProps) {
  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 flex flex-col gap-6">
      <FormField
        id="fullName"
        name="fullName"
        label="Full name"
        placeholder="Enter full name"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.fullName ? formik.errors.fullName : undefined}
      />

      <FormField
        id="email"
        name="email"
        label="Email address"
        type="email"
        placeholder="example@mail.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email ? formik.errors.email : undefined}
      />

      <ProjectDetailsField
        value={formik.values.projectDetails}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.projectDetails
            ? formik.errors.projectDetails
            : undefined
        }
      />

      <FormField
        id="budget"
        name="budget"
        label="Budget"
        placeholder="Enter amount or range"
        value={formik.values.budget ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.budget ? formik.errors.budget : undefined}
        optional
      />

      <FormField
        id="timeline"
        name="timeline"
        label="Timeline"
        placeholder="Enter amount or range"
        value={formik.values.timeline ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.timeline ? formik.errors.timeline : undefined}
        optional
      />

      {submitError && (
        <div className="-mt-2 text-[13px] font-medium text-[#FF5F57]">
          {submitError}
        </div>
      )}

      <div className="flex justify-end lg:justify-normal">
        <SubmitButton
          isSubmitting={formik.isSubmitting}
          isFormValid={isFormValid}
        />
      </div>
    </form>
  );
}
