-- Drop the SECURITY DEFINER view and recreate as a simple view
DROP VIEW IF EXISTS public.public_stats;

-- Create the view without SECURITY DEFINER (default is SECURITY INVOKER which is safe)
CREATE VIEW public.public_stats 
WITH (security_invoker = true)
AS
SELECT 
  (SELECT COUNT(*) FROM public.download_stats) + 12847 as total_downloads,
  (SELECT COUNT(*) FROM public.visitor_stats) + 5234 as total_visitors;

-- Grant SELECT on the public stats view to anon role  
GRANT SELECT ON public.public_stats TO anon;
GRANT SELECT ON public.download_stats TO anon;
GRANT SELECT ON public.visitor_stats TO anon;