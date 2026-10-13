
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCountry() {
      try {
        const { data, error } =
          await supabase.functions.invoke("get-countries", {
            method: "GET",
          });

        if (error) throw error;

        console.log("API atsakymas:", data);
        setCountry(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCountry();
  }, []);

  if (loading) return <p>Kraunami duomenys...</p>;
  if (error) return <p>Klaida: {error}</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>WorldExplorer</h1>
      <h2>Supabase API testas</h2>

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(country, null, 2)}
      </pre>
    </div>
  );
}

export default App;
