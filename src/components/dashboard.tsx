import { useParams } from "react-router-dom";
import { useCityStore } from "../stores/cityStore";
import { useState } from "react";
import { RecordArray } from "./ui/recordArray";

export function Dashboard() {
  const { city } = useParams<{ city: string }>();
  const cities = useCityStore((state) => state.cities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFornecedor, setSelectedFornecedor] = useState("");
  const [selectedEnquadramento, setSelectedEnquadramento] = useState("");
  const [selectedUnidade, setSelectedUnidade] = useState("");

  if (!city) return <>Erro inesperado!</>;

  const selectedCity = cities.find((c) => c.Nome === city);
  if (!selectedCity) return <>Cidade não encontrada!</>;

  const matchesSearchTerm = (compra: any) =>
    compra.Objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compra.Fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compra.EnquadramentoLegal.toLowerCase().includes(searchTerm.toLowerCase());

  const dynamicFornecedorOptions = Array.from(
    new Set(
      selectedCity.Compras &&
      selectedCity.Compras.filter((compra) => {
        return (
          matchesSearchTerm(compra) &&
          // Para fornecedor, consideramos os outros filtros (Enquadramento e Unidade)
          (selectedEnquadramento === "" ||
            compra.EnquadramentoLegal === selectedEnquadramento) &&
          (selectedUnidade === "" || compra.Unidade === selectedUnidade)
        );
      }).map((compra) => compra.Fornecedor),
    ),
  );

  const dynamicEnquadramentoOptions = Array.from(
    new Set(
      selectedCity.Compras &&
      selectedCity.Compras.filter((compra) => {
        return (
          matchesSearchTerm(compra) &&
          // Para enquadramento, consideramos os outros filtros (Fornecedor e Unidade)
          (selectedFornecedor === "" ||
            compra.Fornecedor === selectedFornecedor) &&
          (selectedUnidade === "" || compra.Unidade === selectedUnidade)
        );
      }).map((compra) => compra.EnquadramentoLegal),
    ),
  );

  const dynamicUnidadeOptions = Array.from(
    new Set(
      selectedCity.Compras &&
      selectedCity.Compras.filter((compra) => {
        return (
          matchesSearchTerm(compra) &&
          // Para unidade, consideramos os outros filtros (Fornecedor e Enquadramento)
          (selectedFornecedor === "" ||
            compra.Fornecedor === selectedFornecedor) &&
          (selectedEnquadramento === "" ||
            compra.EnquadramentoLegal === selectedEnquadramento)
        );
      }).map((compra) => compra.Unidade),
    ),
  );

  // Filtro final considerando todos os critérios
  const filteredPurchases = selectedCity.Compras?.filter((compra) => {
    const filtroFornecedor =
      selectedFornecedor === "" || compra.Fornecedor === selectedFornecedor;
    const filtroEnquadramento =
      selectedEnquadramento === "" ||
      compra.EnquadramentoLegal === selectedEnquadramento;
    const filtroUnidade =
      selectedUnidade === "" || compra.Unidade === selectedUnidade;

    return (
      matchesSearchTerm(compra) &&
      filtroFornecedor &&
      filtroEnquadramento &&
      filtroUnidade
    );
  });

  return (
    <div className="p-4">
      <h1 className="my-6 text-3xl font-bold">{selectedCity.Nome}</h1>
      <h2 className="mb-4 text-2xl">Registros de Compra:</h2>

      {/* Área de filtros */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar Registro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        />

        {/* Select para filtrar por Fornecedor */}
        <select
          value={selectedFornecedor}
          onChange={(e) => setSelectedFornecedor(e.target.value)}
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        >
          <option value="">Todos os Fornecedores</option>
          {dynamicFornecedorOptions.map((fornecedor, index) => (
            <option key={index} value={fornecedor}>
              {fornecedor}
            </option>
          ))}
        </select>

        {/* Select para filtrar por Enquadramento Legal */}
        <select
          value={selectedEnquadramento}
          onChange={(e) => setSelectedEnquadramento(e.target.value)}
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        >
          <option value="">Todos os Enquadramentos</option>
          {dynamicEnquadramentoOptions.map((enquadramento, index) => (
            <option key={index} value={enquadramento}>
              {enquadramento}
            </option>
          ))}
        </select>

        {/* Select para filtrar por Unidade */}
        <select
          value={selectedUnidade}
          onChange={(e) => setSelectedUnidade(e.target.value)}
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary"
        >
          <option value="">Todas as Unidades</option>
          {dynamicUnidadeOptions.map((unidade, index) => (
            <option key={index} value={unidade}>
              {unidade}
            </option>
          ))}
        </select>
      </div>

      <RecordArray data={filteredPurchases || []} />
    </div>
  );
}
