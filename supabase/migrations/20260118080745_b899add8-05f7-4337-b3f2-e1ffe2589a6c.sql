-- Lock down tracking tables so they are not publicly readable

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

-- Explicitly deny direct reads for all normal client roles
DROP POLICY IF EXISTS "Deny public read rate limits" ON public.rate_limits;
CREATE POLICY "Deny public read rate limits"
ON public.rate_limits
FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Deny public read visitor stats" ON public.visitor_stats;
CREATE POLICY "Deny public read visitor stats"
ON public.visitor_stats
FOR SELECT
TO anon, authenticated
USING (false);

-- (Optional hardening) also deny client writes directly; backend service role will still work
DROP POLICY IF EXISTS "Deny client writes rate limits" ON public.rate_limits;
CREATE POLICY "Deny client writes rate limits"
ON public.rate_limits
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Deny client writes visitor stats" ON public.visitor_stats;
CREATE POLICY "Deny client writes visitor stats"
ON public.visitor_stats
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);
