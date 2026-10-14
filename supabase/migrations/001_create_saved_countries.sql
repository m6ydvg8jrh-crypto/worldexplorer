
-- WorldExplorer
-- Pradinė duomenų bazės struktūra naujam projektui.
-- Kiekvienas prisijungęs vartotojas mato tik savo valstybes.
--
-- SVARBU:
-- Šis failas skirtas naujai duomenų bazei.
-- Esamoje Supabase duomenų bazėje jo nevykdyti.

CREATE TABLE public.saved_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  country_code TEXT NOT NULL,

  status TEXT NOT NULL
    CHECK (status IN ('visited', 'wishlist')),

  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT saved_countries_user_country_unique
    UNIQUE (user_id, country_code)
);

-- Įjungiame Row Level Security.
ALTER TABLE public.saved_countries
ENABLE ROW LEVEL SECURITY;

-- Vartotojas gali matyti tik savo valstybes.
CREATE POLICY "Users can view own countries"
ON public.saved_countries
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Vartotojas gali pridėti valstybes tik sau.
CREATE POLICY "Users can insert own countries"
ON public.saved_countries
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Vartotojas gali atnaujinti tik savo valstybes.
CREATE POLICY "Users can update own countries"
ON public.saved_countries
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Vartotojas gali pašalinti tik savo valstybes.
CREATE POLICY "Users can delete own countries"
ON public.saved_countries
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
