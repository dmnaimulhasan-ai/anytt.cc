-- Revoke unnecessary SELECT grants that conflict with RLS deny policies
-- This aligns with deny-by-default security model and prevents data exposure if RLS is accidentally disabled
REVOKE SELECT ON public.download_stats FROM anon;
REVOKE SELECT ON public.visitor_stats FROM anon;

-- Also revoke from authenticated role for consistency
REVOKE SELECT ON public.download_stats FROM authenticated;
REVOKE SELECT ON public.visitor_stats FROM authenticated;

-- Note: public_stats view grant is kept as it only shows aggregated counts (safe for public access)