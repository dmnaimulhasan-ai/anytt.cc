-- Fix linter findings by removing overly-permissive client policies and ensuring every RLS-enabled table has explicit policies.

-- ad_analytics: remove anonymous read/write access, keep explicit deny policies for client roles
DROP POLICY IF EXISTS "Allow anonymous ad analytics inserts" ON public.ad_analytics;
DROP POLICY IF EXISTS "Allow anonymous ad analytics reads" ON public.ad_analytics;

DROP POLICY IF EXISTS "Deny public read ad analytics" ON public.ad_analytics;
CREATE POLICY "Deny public read ad analytics"
ON public.ad_analytics
FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Deny client writes ad analytics" ON public.ad_analytics;
CREATE POLICY "Deny client writes ad analytics"
ON public.ad_analytics
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- download_stats: add explicit deny policies (backend can still write using service role)
ALTER TABLE public.download_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Deny public read download stats" ON public.download_stats;
CREATE POLICY "Deny public read download stats"
ON public.download_stats
FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Deny client writes download stats" ON public.download_stats;
CREATE POLICY "Deny client writes download stats"
ON public.download_stats
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);
