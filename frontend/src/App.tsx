import { Login } from "./pages/login";
import { Provider } from 'react-redux';
import store from './store/store';

export function App() {
  return (
    <>
      <Provider store={store}>
        <Login />
      </Provider>
    </>
  )
}