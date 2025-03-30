import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils";
import { CityData } from "src/types/PurchaseRecord";

export function CityArray({ data }: { data: CityData[] }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-y-scroll h-96">
      <div className="flex flex-col gap-5">
        {data.length > 0 ? (
          data.map((city) => (
            <div
              key={city.Nome}
              className="p-6 px-10 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold text-primary">{city.Nome}</h2>
              <p>Total de Compras Diretas: <b>{city.TotalDeCompras}</b> </p>
              <div className="flex md:flex-row flex-col justify-between md:items-center gap-10">
                <p className="mt-2 text-lg">
                  {"Gasto Total: "}
                  <span className="font-semibold">
                    {formatCurrency(city.ValorTotalEmCompras)}
                  </span>
                </p>
                <button onClick={() => navigate(`${city.Nome}`)}>
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum município encontrado.</p>
        )}
      </div>
    </div>
  );
}
