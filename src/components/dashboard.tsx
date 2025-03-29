import { useParams } from "react-router-dom";
import { useCityStore } from "../stores/cityStore";

export function Dashboard() {
  const { city } = useParams<{ city: string }>();
  const cities = useCityStore(state => state.cities);

  if (!city) return <>erro inesperado!</>;

  const selectedCity = cities.find(c => c.Nome === city);

  if (!selectedCity) return <>Cidade não encontrada!</>;

  return (
    <div>
      <h1 className="m-10">{selectedCity.Nome}</h1>
      {selectedCity.TotalDeCompras || ""}
    </div>
  );
}

