
const allowedOrigins = [
  "http://localhost:5173",
  "https://worldexplorer-three.vercel.app",
  "https://worldexplorer-c3f533h14-codeacademy1.vercel.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin");

  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Vary": "Origin",
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "GET") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const url = new URL(req.url);

    const countryName =
      url.searchParams.get("name")?.trim() || "Lithuania";

    if (countryName.length > 100) {
      return Response.json(
        { error: "Valstybės pavadinimas per ilgas" },
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = Deno.env.get("REST_COUNTRIES_API_KEY");

    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500, headers: corsHeaders }
      );
    }

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
