import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import api from '../services/api'

function Register() {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await api.post('/api/auth/register', { name, email, password });
      navigate("/perfil"); // Redirige a perfil tras el registro
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario.');
    }
  };

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Registro</h2>

          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />

            <button type="submit" style={{ ...styles.button, ...styles.primaryButton }}>
              Registrarse
            </button>
          </form>

          <p style={styles.text}>
            ¿Ya tienes una cuenta?{" "}
            <span style={styles.link} onClick={() => navigate("/login")}>
              Inicia Sesión aquí
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

// 🎨 Estilos en Línea
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#2C3E50",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none",
  },
  primaryButton: {
    backgroundColor: "#0070F3",
    color: "white",
  },
  text: {
    fontSize: "14px",
    marginTop: "15px",
    color: "#2C3E50",
  },
  link: {
    color: "#0070F3",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

// Exportar componente
export default Register