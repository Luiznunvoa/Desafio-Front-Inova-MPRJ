import { useData } from 'hooks/useData';

export function Dashboard() {
  const { data, isLoading, isError } = useData();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar os dados.</div>;
  }
 
  console.log(data)
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

