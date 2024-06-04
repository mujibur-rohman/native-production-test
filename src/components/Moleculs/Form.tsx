import * as React from "react";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

// Using FormProvider from react-hook-form as the Form component
const Form = FormProvider;

// Type definition for form field context value
type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName; // The name of the form field
};

// Creating a context for form field with a default value
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

// FormField component that wraps react-hook-form's Controller
const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} /> {/* Using Controller from react-hook-form */}
    </FormFieldContext.Provider>
  );
};

// Custom hook to use form field context
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext); // Accessing form field context
  const itemContext = React.useContext(FormItemContext); // Accessing form item context
  const { getFieldState, formState } = useFormContext(); // Accessing form context

  const fieldState = getFieldState(fieldContext.name, formState); // Getting the state of the field

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>"); // Error if hook is used outside of FormField
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// Type definition for form item context value
type FormItemContextValue = {
  id: string; // The id of the form item
};

// Creating a context for form item with a default value
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

// FormItem component using forwardRef
const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const id = React.useId(); // Generating a unique id

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} /> {/* Wrapper div for form item */}
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem"; // Setting display name for easier debugging

// FormMessage component using forwardRef
const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField(); // Using custom hook to get form field data
  const body = error ? String(error?.message) : children; // Setting the body content based on error message or children

  if (!body) {
    return null; // Return null if there is no content
  }

  return (
    <p ref={ref} id={formMessageId} className={cn("text-xs font-medium text-error", className)} {...props}>
      {/* Error message paragraph */}
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage"; // Setting display name for easier debugging

export { useFormField, Form, FormItem, FormMessage, FormField }; // Exporting components and hook
