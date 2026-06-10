export default function Button({
  text,
  bgColor = "bg-black",
  textColor = "text-white",
  hoverColor = "hover:bg-gray-800",
}) {
  return (
    <button
      className={`
        ${bgColor}
        ${textColor}
        ${hoverColor}
        w-full
        px-6
        py-3
        rounded-lg
        text-lg
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        shadow-md
        hover:shadow-xl
      `}
    >
      {text}
    </button>
  )
}