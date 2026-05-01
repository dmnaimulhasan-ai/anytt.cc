CREATE TABLE public.telegram_processed_urls (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id bigint NOT NULL,
  url_hash text NOT NULL,
  url text NOT NULL,
  platform text NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chat_id, url_hash)
);

CREATE INDEX idx_telegram_processed_urls_chat_time
  ON public.telegram_processed_urls (chat_id, processed_at DESC);

ALTER TABLE public.telegram_processed_urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all client access processed urls"
  ON public.telegram_processed_urls
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);