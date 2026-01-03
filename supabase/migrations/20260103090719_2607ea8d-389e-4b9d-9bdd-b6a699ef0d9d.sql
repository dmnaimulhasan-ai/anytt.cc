-- Remove public access RLS policies from analytics tables
DROP POLICY IF EXISTS "Anyone can insert downloads" ON public.download_stats;
DROP POLICY IF EXISTS "Anyone can read downloads" ON public.download_stats;
DROP POLICY IF EXISTS "Anyone can insert visitors" ON public.visitor_stats;
DROP POLICY IF EXISTS "Anyone can update visitors" ON public.visitor_stats;
DROP POLICY IF EXISTS "Anyone can read visitors" ON public.visitor_stats;

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address text NOT NULL,
  endpoint text NOT NULL,
  request_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_endpoint ON public.rate_limits (ip_address, endpoint, window_start);

-- Enable RLS on rate_limits (will be accessed only via service role in edge functions)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create a view for public stats (aggregated only - no raw data exposure)
CREATE OR REPLACE VIEW public.public_stats AS
SELECT 
  (SELECT COUNT(*) FROM public.download_stats) + 12847 as total_downloads,
  (SELECT COUNT(*) FROM public.visitor_stats) + 5234 as total_visitors;

-- Grant SELECT on the public stats view to anon role
GRANT SELECT ON public.public_stats TO anon;

-- Create RLS policy for the view to allow public access
-- Views don't need RLS policies directly, but the underlying tables do

-- Cleanup old rate limit records (older than 1 hour) - function for maintenance
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.rate_limits 
  WHERE window_start < NOW() - INTERVAL '1 hour';
$$;