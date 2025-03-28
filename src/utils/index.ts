import { CityData } from "src/types/PurchaseRecord";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function sortData(data: CityData[], sortType: "alphabetical" | "valor", searchTerm: string) {
  let sortedData: CityData[]; 
  if (sortType === "alphabetical") {
    sortedData = [...data].sort((a, b) => a.Nome.localeCompare(b.Nome));
  } else {
    sortedData = [...data].sort((a, b) => b.ValorTotalEmCompras - a.ValorTotalEmCompras);
  }

  const filteredCities = sortedData.filter((city) =>
    city.Nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredCities;
}
