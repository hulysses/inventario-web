import { Login } from "./pages/login";
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClientTable } from "@/pages/clientTables";
import { AppSidebar } from "@/components/ui/appSidebar"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <Router>
          {/* Conteúdo fixo entre páginas */}

          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="clientTable" element={<ClientTable />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}