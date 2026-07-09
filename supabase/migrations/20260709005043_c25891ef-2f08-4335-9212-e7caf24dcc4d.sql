DROP VIEW IF EXISTS public.public_stats;
DROP TABLE IF EXISTS public.visitor_stats CASCADE;

CREATE VIEW public.public_stats
WITH (security_invoker = true) AS
SELECT
  (SELECT COUNT(*) FROM public.download_stats) + 12847 AS total_downloads,
  5234 AS total_visitors;

GRANT SELECT ON public.public_stats TO anon;
GRANT SELECT ON public.public_stats TO authenticated;