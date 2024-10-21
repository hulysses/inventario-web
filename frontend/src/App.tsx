
import { Login } from "./pages/login";
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClientTable } from "@/pages/clientTables";

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="clientTable" element={<ClientTable />} />
        </Routes>
      </Router>
    </Provider>
  )

}