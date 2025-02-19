import { UserProvider } from '../context/UserContext';
import CursosProvider from '../context/CursosContext';

export default function AppProvider({ children }) {
  return (
    <UserProvider>
      <CursosProvider>
        {children}
      </CursosProvider>
    </UserProvider>
  );
}
