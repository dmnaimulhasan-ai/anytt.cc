-- Create table to track download statistics
CREATE TABLE public.download_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL DEFAULT 'tiktok',
  video_id TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table to track unique visitors
CREATE TABLE public.visitor_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL UNIQUE,
  first_visit TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_visit TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.download_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert downloads (public feature)
CREATE POLICY "Anyone can insert downloads"
ON public.download_stats
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read download count
CREATE POLICY "Anyone can read downloads"
ON public.download_stats
FOR SELECT
USING (true);

-- Allow anyone to insert/update visitors
CREATE POLICY "Anyone can insert visitors"
ON public.visitor_stats
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update visitors"
ON public.visitor_stats
FOR UPDATE
USING (true);

-- Allow anyone to read visitor count
CREATE POLICY "Anyone can read visitors"
ON public.visitor_stats
FOR SELECT
USING (true);