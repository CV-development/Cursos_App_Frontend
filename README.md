# 📌 UserContext - Gestión de Autenticación con Context API

## 📖 Descripción
El `UserContext` es el encargado de manejar el estado global de la autenticación en la aplicación. Utiliza `Context API` para proporcionar funciones de autenticación como:

✅ Registro de usuario
✅ Inicio de sesión
✅ Cierre de sesión
✅ Persistencia de sesión con `localStorage`

---

## 🚀 **Uso del Contexto**

### **1️⃣ Envolver la Aplicación con el `UserProvider`**
Para que todos los componentes puedan acceder al estado del usuario, la app debe estar envuelta en `UserProvider` en el `AppProvider.jsx` o directamente en `main.jsx`:

```jsx
import { UserProvider } from "./context/UserContext";

<UserProvider>
  <App />
</UserProvider>
```

---

### **2️⃣ Funcionalidades de `UserContext`**

#### 📌 **Registrar Usuario**
```jsx
const { registerUser } = useContext(UserContext);
registerUser(nombre, email, contraseña);
```
✅ Guarda los datos en `localStorage` y redirige a `/perfil`.

#### 📌 **Iniciar Sesión**
```jsx
const { loginUser } = useContext(UserContext);
const result = loginUser(email, contraseña);
if (!result.success) {
  console.log(result.message); // Muestra errores si existen
}
```
✅ Valida credenciales y actualiza el estado global.

#### 📌 **Cerrar Sesión**
```jsx
const { logoutUser } = useContext(UserContext);
logoutUser();
```
✅ Elimina los datos del usuario y lo redirige a la página principal.

---

## 📌 **Manejo de Persistencia de Sesión**
El `UserContext` recupera el usuario de `localStorage` cuando la app se recarga:

```jsx
useEffect(() => {
  const storedUser = getUserFromStorage();
  if (storedUser) setUser(storedUser);
}, []);
```

Esto asegura que el usuario **permanezca logueado** incluso tras recargar la página.

---

## 📌 **Ejemplo Completo de Implementación**
```jsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Perfil() {
  const { user, logoutUser } = useContext(UserContext);
  
  return (
    <div>
      <h2>Bienvenido, {user?.name} 👋</h2>
      <button onClick={logoutUser}>Cerrar Sesión</button>
    </div>
  );
}

export default Perfil;
```

---

## 📌 **Conclusión**
El `UserContext` facilita la gestión de autenticación en toda la app sin necesidad de pasar `props` manualmente. Al utilizar `localStorage`, también garantiza persistencia de sesión entre recargas. 🚀
