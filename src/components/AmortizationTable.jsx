import Icons from "../assets/Icons";

const formatCurrency = (n) => `RD$ ${n.toFixed(2)}`;

export default function AmortizationTable({ schedule, show, plazo }) {
  if (!show) return null;

  const highlightRows = 3;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800">
        <Icons icon="calendar" />
        Tabla de Amortización
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-200 text-slate-700 uppercase text-xs">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-right">Cuota</th>
              <th className="py-3 px-6 text-right">Capital</th>
              <th className="py-3 px-6 text-right">Interés</th>
              <th className="py-3 px-6 text-right">Saldo</th>
            </tr>
          </thead>

          <tbody className="text-slate-700 text-sm">
            {schedule.map((i, idx) => {
              const isLastRows = i.mes > plazo - highlightRows;

              return (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 ? "bg-slate-50" : "bg-white"
                  } border-b hover:bg-slate-100 ${
                    isLastRows ? "bg-yellow-100 font-semibold border-yellow-400" : ""
                  }`}
                >
                  <td className="py-3 px-6">{i.mes}</td>
                  <td className="py-3 px-6 text-right">{formatCurrency(i.cuota)}</td>
                  <td className="py-3 px-6 text-right text-green-700">
                    {formatCurrency(i.capital)}
                  </td>
                  <td className="py-3 px-6 text-right text-red-700">
                    {formatCurrency(i.interes)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatCurrency(i.saldo)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
