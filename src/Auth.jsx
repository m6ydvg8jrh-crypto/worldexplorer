
import { useState } from "react";
import { supabase } from "./supabaseClient";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) throw error;

        setMessageType("success");
        setMessage("Sėkmingai prisijungta!");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setMessageType("success");
        setMessage(
          data.session
            ? "Registracija sėkminga! Esate prisijungę."
            : "Registracija sėkminga! Patikrinkite el. paštą ir patvirtinkite paskyrą."
        );
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Klaida: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  function switchMode(loginMode) {
    if (loading) return;

    setIsLogin(loginMode);
    setMessage("");
    setPassword("");
    setShowPassword(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-heading">
        <div className="auth-heading-icon" aria-hidden="true">
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="M12 14v3" />
          </svg>
        </div>

        <span className="auth-eyebrow">
          WORLDEXPLORER
        </span>

        <h2>
          {isLogin
            ? "Sveiki sugrįžę"
            : "Pradėkite savo kelionę"}
        </h2>

        <p>
          {isLogin
            ? "Prisijunkite prie savo kelionių pasaulio."
            : "Susikurkite paskyrą ir išsaugokite savo kelionių planus."}
        </p>
      </div>

      <div
        className="auth-tabs"
        role="group"
        aria-label="Prisijungimo arba registracijos pasirinkimas"
      >
        <button
          type="button"
          className={`auth-tab ${isLogin ? "active" : ""}`}
          onClick={() => switchMode(true)}
          aria-pressed={isLogin}
          disabled={loading}
        >
          Prisijungti
        </button>

        <button
          type="button"
          className={`auth-tab ${!isLogin ? "active" : ""}`}
          onClick={() => switchMode(false)}
          aria-pressed={!isLogin}
          disabled={loading}
        >
          Registruotis
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="auth-email">
            El. paštas
          </label>

          <input
            id="auth-email"
            type="email"
            placeholder="vardas@pastas.lt"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            autoComplete="email"
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="auth-password">
            Slaptažodis
          </label>

          <div className="auth-password-wrapper">
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              placeholder="Mažiausiai 6 simboliai"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete={
                isLogin
                  ? "current-password"
                  : "new-password"
              }
              minLength={6}
              required
            />

            <button
              className="auth-password-toggle"
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              aria-label={
                showPassword
                  ? "Slėpti slaptažodį"
                  : "Rodyti slaptažodį"
              }
              aria-pressed={showPassword}
            >
              {showPassword ? "Slėpti" : "Rodyti"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={loading}
        >
          {loading
            ? "Palaukite..."
            : isLogin
              ? "Prisijungti →"
              : "Sukurti paskyrą →"}
        </button>
      </form>

      {message && (
        <p
          className={`auth-message ${messageType}`}
          role="status"
        >
          {message}
        </p>
      )}

      <div className="auth-footer">
        <span>
          {isLogin
            ? "Dar neturite paskyros?"
            : "Jau turite paskyrą?"}
        </span>

        <button
          type="button"
          className="auth-switch"
          onClick={() => switchMode(!isLogin)}
          disabled={loading}
        >
          {isLogin
            ? "Registruokitės"
            : "Prisijunkite"}
        </button>
      </div>
    </div>
  );
}
