"use client";

import Container from "@/components/container";
import Details from "@/components/details";
import Sidebar from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KPIContextProvider } from "./contexts/KPIContextProvider";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <KPIContextProvider>
          <Container>
            <Sidebar />
            <Details />
          </Container>
        </KPIContextProvider>
      </QueryClientProvider>
    </main>
  );
}
