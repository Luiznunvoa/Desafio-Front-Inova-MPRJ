import { CityData } from "src/types/PurchaseRecord";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function sortData(
  data: CityData[],
  sortType: "alphabetical" | "valor" | "compras",
  searchTerm: string
) {
  let sortedData: CityData[];

  if (sortType === "alphabetical") {
    sortedData = [...data].sort((a, b) => a.Nome.localeCompare(b.Nome));
  } else if (sortType === "valor") {
    sortedData = [...data].sort(
      (a, b) => b.ValorTotalEmCompras - a.ValorTotalEmCompras
    );
  } else if (sortType === "compras") {
    sortedData = [...data].sort(
      (a, b) => (b.TotalDeCompras ?? 0) - (a.TotalDeCompras ?? 0)
    );
  } else {
    sortedData = [...data];
  }

  const filteredCities = sortedData.filter((city) =>
    city.Nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredCities;
}
