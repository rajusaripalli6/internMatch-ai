import Input from "../common/Input"

export default function FormField({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-5">

      <label
        htmlFor={id}
        className="block mb-2 font-medium text-gray-700"
      >
        {label}
      </label>

      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

    </div>
  )
}