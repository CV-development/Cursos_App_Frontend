import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Importamos el icono

function NavBar() {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>Cursos App</Link>

        <div style={styles.links}>
          {/* 🛒 Botón Carro con Icono */}
          <Link to="/cart" style={{ ...styles.button, ...styles.outlineButton }}>
            <FaShoppingCart style={{ marginRight: "8px" }} /> Carro
          </Link>

          {!user ? (
            <>
              <Link to="/login" style={{ ...styles.button, ...styles.outlineButton }}>
                Iniciar Sesión
              </Link>
              <Link to="/register" style={{ ...styles.button, ...styles.primaryButton }}>
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link to="/perfil" style={{ ...styles.button, ...styles.outlineButton }}>
                Perfil
              </Link>
              <button onClick={logoutUser} style={{ ...styles.button, ...styles.dangerButton }}>
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// 🎨 Estilos en Línea
const styles = {
  navbar: {
    backgroundColor: "#ffffff",
    padding: "12px 20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: "1200px",
    alignItems: "center",
  },
  brand: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2C3E50",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "25px",
    fontSize: "15px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none",
  },
  primaryButton: {
    backgroundColor: "#0070F3",
    color: "white",
  },
  outlineButton: {
    border: "2px solid #0070F3",
    color: "#0070F3",
    backgroundColor: "white",
  },
  dangerButton: {
    backgroundColor: "#e74c3c",
    color: "white",
  },
};

// Exportar componente
export default NavBar;