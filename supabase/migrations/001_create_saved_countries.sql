
-- WorldExplorer duomenų bazės struktūra

CREATE TABLE public.saved_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  country_code TEXT NOT NULL UNIQUE,

  status TEXT NOT NULL
    CHECK (status IN ('visited', 'wishlist')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Įjungiame Row Level Security
ALTER TABLE public.saved_countries
ENABLE ROW LEVEL SECURITY;

-- Leidžiame viešai skaityti demonstracinius įrašus
CREATE POLICY "Allow public read access"
ON public.saved_countries
FOR SELECT
TO anon
USING (true);
