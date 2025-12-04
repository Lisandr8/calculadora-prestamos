import Label from "./ui/Label";

export default function Result({ value, text, icon, className = "" }) {
  return (
    <div className={`border p-5 rounded-xl shadow-sm ${className}`}>
      <Label text={text} icon={icon} className="font-semibold" />
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
