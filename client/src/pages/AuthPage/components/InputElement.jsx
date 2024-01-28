// InputElement component definition
function InputElement({ handleChange, values, field }) {
  return (
    // Input element with styling and dynamic properties
    <input
      type={field.type}
      id={field.id}
      className="border border-gray-600 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2 bg-[#111a21cf] placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      placeholder={field.placeholder}
      value={values[field.id]}
      onChange={handleChange}
    />
  );
}

// Exporting the InputElement component as default
export default InputElement;
