import Icons from "../../assets/Icons";

export default function Label({ text, icon, className, children }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2 font-semibold text-lg">
        <Icons icon={icon} className="size-6" />
        {text}
      </div>
      {children}
    </label>
  );
}
