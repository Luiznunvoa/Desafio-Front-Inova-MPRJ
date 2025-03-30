import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10 items-center py-10 md:m-20 m-5 max-w-[1920px]">
      <h1 className="m-5 md:w-5/6 w-full">
        Interface de Análise de Compras Diretas por Município
      </h1>
      <p className="w-5/6 text-secundary">
        Levantamento e processamento de aquisições de bens pelo poder público
        realizadas sem um processo licitatório formal. Compras Diretas aceleram
        o processo de contratação, mas podem aumentar o risco de irregularidades
        no uso dos recursos públicos. Desta forma, compras diretas devem ser
        analisadas de maneira minuciosa, garantindo o uso adequado do dinheiro
        público.
      </p>
      <div className="w-5/6">
        <button onClick={() => navigate("/dashboard")}>Acessar Dashboard</button>
      </div>

      <h1 className="m-5 w-5/6">Descrição da Análise</h1>
      <p className="w-5/6 text-secundary">
        Através do consumo da API de
        <a href="https://dados.tcerj.tc.br/api/v1/docs#/">
          {" Dados Abertos do TCE-RJ "}
        </a>
        esse website faz um cruzamento de dados em relação às informações mais
        relevantes obtidas através do endpoint
        <code>{" compras_diretas_estado"}</code>. A análise considera os gastos
        totais realizados, bem como os gastos por município, permitindo
        identificar padrões e discrepâncias no uso dos recursos. Além disso, é
        dada atenção à tendência desses dados ao longo do tempo, possibilitando
        uma visão dinâmica e temporal do comportamento das compras diretas e
        eventuais alterações em suas trajetórias.
      </p>
    </div>
  );
}
