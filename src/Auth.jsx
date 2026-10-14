
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Sėkmingai prisijungta!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Registracija sėkminga!");
      }
    } catch (error) {
      setMessage("Klaida: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Prisijungimas" : "Registracija"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Palaukite..."
            : isLogin
            ? "Prisijungti"
            : "Registruotis"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <p>
        {isLogin ? "Neturite paskyros?" : "Jau turite paskyrą?"}
      </p>

      <button
        type="button"
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
        }}
      >
        {isLogin ? "Sukurti paskyrą" : "Prisijungti"}
      </button>
    </div>
  );
}
