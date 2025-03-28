import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CityData, PurchaseRecord } from "src/types/PurchaseRecord";

export function useData() {
  const processData = (data: PurchaseRecord[]) => {
    const citiesMap: Record<string, number> = {};

    data.forEach((record) => {
      if (record.Municipio) {
        citiesMap[record.Municipio] =
          (citiesMap[record.Municipio] || 0) + record.ValorTotalCompra;
      }
    });

    return Object.keys(citiesMap).map((municipio) => ({
      Nome: municipio,
      ValorTotalEmCompras: citiesMap[municipio],
    }));
  };

  return useQuery<CityData[]>({
    queryKey: ["comprasDiretasEstado"],
    queryFn: async () => {
      const response = await axios.get<{ Compras: PurchaseRecord[] }>(
        import.meta.env.VITE_BACKEND_URL,
      );
      return processData(response.data.Compras);
    },
    staleTime: Infinity,
  });
}
