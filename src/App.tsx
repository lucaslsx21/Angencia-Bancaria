import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Adjust the path as needed
import { ClientesList } from "./pages/ClienteListagem"; // Adjust the path as needed
import { ClienteDetails } from "./pages/ClienteDetalhes"; // Adjust the path as needed

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ClientesList />} />
            <Route path="/cliente/:id" element={<ClienteDetails />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App;