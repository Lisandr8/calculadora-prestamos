export default function Input(props) {
  return (
    <input
      type="number"
      className="px-4 py-3 bg-white border border-gray-300 rounded-lg 
                 w-full text-slate-800 font-medium shadow-sm
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 transition"
      {...props}
    />
  );
}
