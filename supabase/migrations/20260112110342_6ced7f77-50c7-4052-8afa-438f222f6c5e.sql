-- Create table for tracking ad performance
CREATE TABLE public.ad_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('load', 'failure', 'timeout', 'click')),
  ad_component TEXT NOT NULL,
  ad_position TEXT,
  error_reason TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ad_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for tracking
CREATE POLICY "Allow anonymous ad analytics inserts"
ON public.ad_analytics
FOR INSERT
WITH CHECK (true);

-- Allow reads for analytics (you may want to restrict this later)
CREATE POLICY "Allow anonymous ad analytics reads"
ON public.ad_analytics
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_ad_analytics_event_type ON public.ad_analytics(event_type);
CREATE INDEX idx_ad_analytics_created_at ON public.ad_analytics(created_at DESC);
CREATE INDEX idx_ad_analytics_component ON public.ad_analytics(ad_component);