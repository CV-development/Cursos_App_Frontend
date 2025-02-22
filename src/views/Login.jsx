import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginUser(email, password);

    if (result.success) {
      navigate("/perfil");
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
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
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={{ ...styles.button, ...styles.primaryButton }}>
            Iniciar Sesión
          </button>
        </form>

        <p style={styles.text}>
          ¿No tienes una cuenta?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
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
export default Login;