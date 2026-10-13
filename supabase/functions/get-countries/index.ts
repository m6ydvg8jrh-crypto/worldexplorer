
const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };
  
  Deno.serve(async (req) => {
    // Naršyklės CORS patikrinimas
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }
  
    try {
      // Gauname valstybės pavadinimą
      const url = new URL(req.url);
  
      const countryName =
        url.searchParams.get("name")?.trim() || "Lithuania";
  
      // Tikriname įvesties ilgį
      if (countryName.length > 100) {
        return Response.json(
          { error: "Valstybės pavadinimas per ilgas" },
          { status: 400, headers: corsHeaders }
        );
      }
  
      // Gauname API raktą iš Supabase Secrets
      const apiKey = Deno.env.get("REST_COUNTRIES_API_KEY");
  
      if (!apiKey) {
        return Response.json(
          { error: "API key not configured" },
          { status: 500, headers: corsHeaders }
        );
      }
  
      // Gauname valstybės informaciją
      const response = await fetch(
        `https://api.restcountries.com/countries/v5/names.common/${encodeURIComponent(countryName)}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      const data = await response.json();
  
      return Response.json(data, {
        status: response.status,
        headers: corsHeaders,
      });
    } catch (error) {
      return Response.json(
        { error: String(error) },
        { status: 500, headers: corsHeaders }
      );
    }
  });
  