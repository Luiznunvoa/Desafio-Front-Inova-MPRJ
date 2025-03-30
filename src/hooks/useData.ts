import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCityStore } from "../stores/cityStore";
import { CityData, PurchaseRecord } from "../types/PurchaseRecord";

export function useData() {
  const processData = (data: PurchaseRecord[]): CityData[] => {
    // Cria um mapa para armazenar os dados de cada cidade
    const citiesMap: Record<
      string,
      { total: number; count: number; purchases: PurchaseRecord[] }
    > = {};

    data.forEach((record) => {
      if (record.Municipio) {
        if (!citiesMap[record.Municipio]) {
          citiesMap[record.Municipio] = { total: 0, count: 0, purchases: [] };
        }
        citiesMap[record.Municipio].total += record.ValorTotalCompra;
        citiesMap[record.Municipio].count += 1;
        citiesMap[record.Municipio].purchases.push(record);
      }
    });

    return Object.keys(citiesMap).map((municipio) => ({
      Nome: municipio,
      ValorTotalEmCompras: citiesMap[municipio].total,
      TotalDeCompras: citiesMap[municipio].count,
      Compras: citiesMap[municipio].purchases,
    }));
  };

  return useQuery<CityData[]>({
    queryKey: ["comprasDiretasEstado"],
    queryFn: async () => {
      const response = await axios.get<{ Compras: PurchaseRecord[] }>(
        import.meta.env.VITE_BACKEND_URL
      );
      const cleanedData = processData(response.data.Compras);

      // Atualiza o store com os dados processados
      useCityStore.getState().setCities(cleanedData);
      return cleanedData;
    },
    staleTime: Infinity,
  });
}
