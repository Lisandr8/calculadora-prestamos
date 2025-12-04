import Input from "./components/ui/Input";
import Icons from "./assets/Icons";
import Result from "./components/Result";
import Label from "./components/ui/Label";
import AmortizationTable from "./components/AmortizationTable";
import { useMemo, useState } from "react";

function App() {
  const [monto, setMonto] = useState(500000);
  const [tasa, setTasa] = useState(12);
  const [plazo, setPlazo] = useState(24);
  const [showTable, setShowTable] = useState(false);

  const handleChange = ({ target }) => {
    const value = Number(target.value);
    const setters = { monto: setMonto, tasa: setTasa, plazo: setPlazo };
    setters[target.name]?.(value);
  };

  const r = tasa / 12 / 100;
  const n = plazo;

  const cuota =
    r === 0 ? monto / n : monto * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  const totalPagar = cuota * n;
  const intereses = totalPagar - monto;

  const amortizationSchedule = useMemo(() => {
    if (!monto || !n) return [];

    let balance = monto;
    const rows = [];

    for (let mes = 1; mes <= n; mes++) {
      const interes = balance * r;
      let cuotaFinal = cuota;
      let capital = cuota - interes;

      if (mes === n) {
        capital = balance;
        cuotaFinal = capital + interes;
      }

      const nuevoSaldo = Math.max(balance - capital, 0);

      rows.push({
        mes,
        cuota: cuotaFinal,
        capital,
        interes,
        saldo: nuevoSaldo,
      });

      balance = nuevoSaldo;
    }

    return rows;
  }, [monto, tasa, plazo, r, n, cuota]);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">

      {/* Header */}
      <div className="bg-slate-300 rounded-lg p-6 shadow-md">
        <p className="flex items-center justify-center text-2xl font-semibold gap-3 text-slate-800">
          <Icons icon="calculator" />
          Calculadora de Préstamos
        </p>

        {/* Inputs */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <Label text="Monto del Préstamo" icon="dollar">
            <Input name="monto" value={monto} min="1000" onChange={handleChange} />
          </Label>

          <Label text="Tasa Anual (%)" icon="percent">
            <Input name="tasa" value={tasa} min="0" onChange={handleChange} />
          </Label>

          <Label text="Plazo (Meses)" icon="calendar">
            <Input name="plazo" value={plazo} min="1" onChange={handleChange} />
          </Label>

        </form>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Result text="Cuota mensual" value={`RD$ ${cuota.toFixed(2)}`} icon="calculator" className="bg-blue-100 text-blue-700" />
        <Result text="Total a pagar" value={`RD$ ${totalPagar.toFixed(2)}`} icon="dollar" className="bg-green-100 text-green-700" />
        <Result text="Total intereses" value={`RD$ ${intereses.toFixed(2)}`} icon="percent" className="bg-red-100 text-red-700" />
      </div>

      {/* Botón tabla */}
      <button
        onClick={() => setShowTable(!showTable)}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        {showTable ? "Ocultar" : "Mostrar"} Tabla de Amortización
      </button>

      {/* Tabla */}
      <AmortizationTable schedule={amortizationSchedule} show={showTable} plazo={plazo} />
    </div>
  );
}

export default App;
