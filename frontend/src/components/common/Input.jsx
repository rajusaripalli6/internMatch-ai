export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  id,
  name,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        border
        border-gray-300
        rounded-lg
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-black
      "
    />
  )
}