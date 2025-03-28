import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { formatCurrency, sortData } from "../utils";
import { useData } from "hooks/useData";

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<"alphabetical" | "valor">("alphabetical");
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner />;
  if (isError || !data) return <>Ocorreu um erro ao buscar os dados.</>;

  const sortedData = sortData(data, sortType, searchTerm);

  return (
    <div className="p-4">
      <h1 className="m-10">Selecione um Município</h1>

      {/* Barra de Pesquisa e Filtro de Ordenação */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar município..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        />
        <select
          value={sortType}
          onChange={(e) =>
            setSortType(e.target.value as "alphabetical" | "valor")
          }
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        >
          <option value="alphabetical">Ordem Alfabética</option>
          <option value="valor">Valor Total Gasto</option>
        </select>
      </div>

      {/* Container com tamanho fixo e scroll */}
      <div className="overflow-y-scroll h-96">
        <div className="flex flex-col gap-5">
          {sortedData.length > 0 ? (
            sortedData.map((city) => (
              <div
                key={city.Nome}
                className="p-6 px-10 bg-white rounded-lg shadow-md transition-shadow cursor-pointer hover:shadow-lg"
              >
                <h2 className="text-2xl font-bold text-primary">{city.Nome}</h2>
                <p className="mt-2 text-lg">
                  {" Gasto total: "}
                  <span className="font-semibold">
                    {formatCurrency(city.ValorTotalEmCompras)}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>Nenhum município encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
