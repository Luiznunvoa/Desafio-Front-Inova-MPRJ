import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "./router";

const queryClient = new QueryClient();

export function App() {
  return ( 
    <QueryClientProvider client={queryClient}>
      <BrowserRouter />
    </QueryClientProvider>
  ); 
}
