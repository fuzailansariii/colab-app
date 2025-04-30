import { FieldError, UseFormRegisterReturn } from "react-hook-form";
interface EmailIconProps {
  type?: string;
  InputIcon?: React.ReactNode;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  error?: FieldError;
}

export default function Input({
  type,
  InputIcon,
  placeholder,
  register,
  error,
}: EmailIconProps) {
  return (
    <div>
      <label className="input validator rounded-md w-full">
        {InputIcon}
        <input type={type} placeholder={placeholder} {...register} />
      </label>

      {error?.message && (
        <div className="text-red-500 text-sm mt-1">{error.message}</div>
      )}
    </div>
  );
}
