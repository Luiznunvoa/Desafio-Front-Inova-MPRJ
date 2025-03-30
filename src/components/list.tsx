import { useState } from "react";
import { sortData } from "../utils";
import { CityArray } from "./ui/cityArray";
import { useCityStore } from "../stores/cityStore";

export function List() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState< "alphabetical" | "valor" | "compras" >("alphabetical");
  const cities = useCityStore((state) => state.cities);
  const sortedData = sortData(cities, sortType, searchTerm);

  return (
    <div className="p-4">
      <h1 className="m-10">Selecione um Município</h1>

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
            setSortType(e.target.value as "alphabetical" | "valor" | "compras")
          }
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        >
          <option value="alphabetical">Ordem Alfabética</option>
          <option value="valor">Valor Total Gasto</option>
          <option value="compras">Número Total de Compras</option>
        </select>
      </div>

      <CityArray data={sortedData} />
    </div>
  );
}
