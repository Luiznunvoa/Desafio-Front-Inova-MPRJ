export type PurchaseRecord = {
  AnoProcesso: string;
  Municipio: string;
  Unidade: string;
  Processo?: string | null;
  DataProcesso: string;
  ValorTotalCompra: number;
  Objeto: string;
  EnquadramentoLegal: string;
  Fundamentacao: string;
  TipoFornecedor?: string | null;
  Afastamento: string;
  DataAprovacao: string;
  FornecedorVencedor: string;
  CPFCNPJFornecedor: string;
  Fornecedor: string;
}; 

export type CityData = {
  Nome: string;
  ValorTotalEmCompras: number;
  TotalDeCompras?: number;
  Compras?: PurchaseRecord[];
}
