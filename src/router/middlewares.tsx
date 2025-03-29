import { ReactNode } from "react";
import { Spinner } from "components/ui/spinner";
import { useData } from "hooks/useData";

export function SecureData({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner />;
  if (isError || !data) return <>Ocorreu um erro ao buscar os dados.</>;

  
  console.log(data);
  return <>{children}</>;
}

