import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { sortData } from "../utils";
import { useData } from "hooks/useData";
import { CityArray } from "./ui/cityArray";

export function List() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<"alphabetical" | "valor">("alphabetical");
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner />;
  if (isError || !data) return <>Ocorreu um erro ao buscar os dados.</>;

  const sortedData = sortData(data, sortType, searchTerm);

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
            setSortType(e.target.value as "alphabetical" | "valor")
          }
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        >
          <option value="alphabetical">Ordem Alfabética</option>
          <option value="valor">Valor Total Gasto</option>
        </select>
      </div>

      <CityArray data={sortedData}/>
    </div>
  );
}
