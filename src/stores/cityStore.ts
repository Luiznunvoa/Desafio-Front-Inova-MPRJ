import { CityData } from 'src/types/PurchaseRecord';
import { create } from 'zustand';

interface CityStore {
  cities: CityData[];
  clearCities: () => void;
  setCities: (cities: CityData[]) => void; // Substitui o array completo
}

export const useCityStore = create<CityStore>((set) => ({
  cities: [],

  clearCities: () => set({ cities: [] }),
  setCities: (cities) => set({ cities }),
}));

