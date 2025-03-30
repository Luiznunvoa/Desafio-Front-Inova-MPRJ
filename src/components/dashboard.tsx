import { useNavigate, useParams } from "react-router-dom";
import { useCityStore } from "../stores/cityStore";
import { useState } from "react";
import { RecordArray } from "./ui/recordArray";

export function Dashboard() {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const cities = useCityStore((state) => state.cities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFornecedor, setSelectedFornecedor] = useState("");
  const [selectedEnquadramento, setSelectedEnquadramento] = useState("");
  const [selectedUnidade, setSelectedUnidade] = useState("");

  if (!city) return <>Erro inesperado!</>;
  const selectedCity = cities.find((c) => c.Nome === city);
  if (!selectedCity) return <>Cidade não encontrada!</>;

  // Função que verifica se a compra corresponde ao termo de busca
  const matchesSearchTerm = (compra: any) =>
    compra.Objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compra.Fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compra.EnquadramentoLegal.toLowerCase().includes(searchTerm.toLowerCase());

  // Função que verifica os filtros (além do termo de busca)
  const matchesFilters = (compra: any) =>
    matchesSearchTerm(compra) &&
    (selectedFornecedor === "" || compra.Fornecedor === selectedFornecedor) &&
    (selectedEnquadramento === "" || compra.EnquadramentoLegal === selectedEnquadramento) &&
    (selectedUnidade === "" || compra.Unidade === selectedUnidade);

  // Função genérica para gerar as opções dinâmicas de filtro
  // field: nome da propriedade que queremos extrair (ex.: "Fornecedor")
  // extraFilters: array de objetos com { key, value } dos filtros que devem ser aplicados, exceto o filtro em foco
  const getDynamicOptions = (
    field: string,
    extraFilters: { key: string; value: string }[]
  ) => {
    return Array.from(
      new Set(
        selectedCity.Compras?.filter((compra: any) => {
          if (!matchesSearchTerm(compra)) return false;
          // Aplica os filtros extras
          return extraFilters.every(
            ({ key, value }) => value === "" || compra[key] === value
          );
        }).map((compra: any) => compra[field])
      )
    );
  };

  // Gerando as opções dinâmicas para cada filtro
  const dynamicFornecedorOptions = getDynamicOptions("Fornecedor", [
    { key: "EnquadramentoLegal", value: selectedEnquadramento },
    { key: "Unidade", value: selectedUnidade },
  ]);

  const dynamicEnquadramentoOptions = getDynamicOptions("EnquadramentoLegal", [
    { key: "Fornecedor", value: selectedFornecedor },
    { key: "Unidade", value: selectedUnidade },
  ]);

  const dynamicUnidadeOptions = getDynamicOptions("Unidade", [
    { key: "Fornecedor", value: selectedFornecedor },
    { key: "EnquadramentoLegal", value: selectedEnquadramento },
  ]);

  // Filtrando as compras com todos os critérios
  const filteredPurchases = selectedCity.Compras?.filter(matchesFilters);  

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="my-6 text-3xl font-bold">{selectedCity.Nome}</h1>
        <h2 className="mb-4 text-2xl cursor-pointer" onClick={() => navigate("/dashboard")}>Voltar</h2>
      </div>
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
