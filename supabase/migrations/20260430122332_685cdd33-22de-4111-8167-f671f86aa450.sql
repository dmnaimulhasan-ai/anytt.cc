-- Singleton table to track the getUpdates offset
CREATE TABLE public.telegram_bot_state (
  id INT PRIMARY KEY CHECK (id = 1),
  update_offset BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.telegram_bot_state (id, update_offset) VALUES (1, 0);

ALTER TABLE public.telegram_bot_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all client access bot state"
ON public.telegram_bot_state
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Table for storing incoming messages
CREATE TABLE public.telegram_messages (
  update_id BIGINT PRIMARY KEY,
  chat_id BIGINT NOT NULL,
  user_id BIGINT,
  username TEXT,
  text TEXT,
  processed BOOLEAN NOT NULL DEFAULT false,
  processed_at TIMESTAMPTZ,
  raw_update JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_telegram_messages_chat_id ON public.telegram_messages (chat_id);
CREATE INDEX idx_telegram_messages_processed ON public.telegram_messages (processed) WHERE processed = false;

ALTER TABLE public.telegram_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all client access messages"
ON public.telegram_messages
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Per-chat rate limiting table (10 downloads / hour per chat)
CREATE TABLE public.telegram_rate_limits (
  chat_id BIGINT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  request_count INT NOT NULL DEFAULT 1,
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

CREATE INDEX idx_telegram_rate_limits_chat ON public.telegram_rate_limits (chat_id, window_start);

ALTER TABLE public.telegram_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all client access tg rate limits"
ON public.telegram_rate_limits
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);