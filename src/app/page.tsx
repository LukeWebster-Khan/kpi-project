import Container from "@/components/container";
import Details from "@/components/details";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <main>
      <Container>
        <Sidebar />
        <Details />
      </Container>
    </main>
  );
}
