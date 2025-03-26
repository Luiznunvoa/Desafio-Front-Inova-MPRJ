import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10 items-center py-10 w-full w-ful max-w-[1920px] bg-back1">
      <h1 className="m-5 w-5/6 font-bold">
        Interface de Análise de Compras Diretas por Município
      </h1>
      <p className="w-5/6 text-secundary">
        Levantamento e processamento de aquisições de bens pelo poder público
        realizadas sem um processo licitatório formal. Compras Diretas aceleram
        o processo de contratação, mas podem aumentar o risco de irregularidades
        no uso dos recursos públicos. Desta forma, compras diretas devem ser
        analisadas de maneira minuciosa, garantindo o uso adequado do dinheiro
        público
      </p>
      <div className="w-5/6">
        <button 
          onClick={() => navigate("/dashboard")}
          className="py-3 px-6 text-white rounded-lg transition bg-primary hover:bg-primary-dark"
        >
          Acessar Dashboard
        </button>
      </div>

      <h1 className="m-5 w-5/6 font-bold">
        Dados Gerais da Análise
      </h1>
    </div>
  );
}
