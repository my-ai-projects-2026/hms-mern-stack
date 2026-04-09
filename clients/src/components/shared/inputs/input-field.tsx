import React, { type ReactNode } from "react";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface InputFieldProps<TFieldValues extends FieldValues>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name" | "defaultValue"
  > {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  labelRight?: ReactNode;
  icon?: ReactNode;
  wrapperClassName?: string;
}

export function InputField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  labelRight,
  icon,
  wrapperClassName,
  className,
  id,
  required,
  ...props
}: InputFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  // Generate a unique ID if none is provided
  const inputId =
    id ||
    (label
      ? label.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")
      : name);

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {(label || labelRight) && (
        <div className="flex justify-between items-center ml-1">
          {label && (
            <Label
              className="text-slate-200 font-semibold"
              htmlFor={inputId}
            >
              {label}{" "}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </Label>
          )}
          {labelRight && <div>{labelRight}</div>}
        </div>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <Input
          id={inputId}
          required={required}
          className={cn(
            "h-11 bg-[#1A1D24] border-white/10 rounded-xl text-white placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 focus-visible:ring-offset-0 transition-colors",
            icon && "pl-10",
            error && "border-red-500/50 focus-visible:ring-red-500/50",
            className
          )}
          {...props}
          {...field}
        />
      </div>
      {error && (
        <p className="text-[13px] text-red-400 font-medium ml-1 mt-1 rise-in">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default InputField;