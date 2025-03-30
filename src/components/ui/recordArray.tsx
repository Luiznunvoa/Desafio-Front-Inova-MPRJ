import { PurchaseRecord } from "src/types/PurchaseRecord";

export function RecordArray({ data }: { data: PurchaseRecord[] }) {
  return (
    <div className="grid overflow-y-scroll grid-cols-1 gap-6 h-96 text-sm md:grid-cols-2 lg:grid-cols-3 max-w-[1920px] sm:text-md">
      {data &&
        data.map((compra, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-4 max-h-96 bg-white rounded-lg shadow max-w-[500px]"
          >
            <p>
              <strong>Unidade:</strong> {compra.Unidade}
            </p>
            <p>
              <strong>Objeto:</strong> {compra.Objeto}
            </p>
            <p>
              <strong>Ano do Processo:</strong> {compra.AnoProcesso}
            </p>
            <p>
              <strong>Data do Processo:</strong>{" "}
              {new Date(compra.DataProcesso).toLocaleDateString()}
            </p>
            <p>
              <strong>Valor Total:</strong>{" "}
              {compra.ValorTotalCompra.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p>
              <strong>Fornecedor:</strong> {compra.Fornecedor}
            </p>
            <p>
              <strong>CNPJ do Fornecedor:</strong> {compra.CPFCNPJFornecedor}
            </p>
            <p>
              <strong>Enquadramento Legal:</strong> {compra.EnquadramentoLegal}
            </p>
          </div>
        ))}
    </div>
  );
}
