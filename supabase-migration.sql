-- Run this in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/vkbunngptdaglmlspfof/sql

CREATE TABLE IF NOT EXISTS page_views (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  page          TEXT        NOT NULL,
  ip_address    TEXT,
  country       TEXT,
  region        TEXT,
  city          TEXT,
  user_agent    TEXT,
  browser       TEXT,
  os            TEXT,
  device_type   TEXT,        -- 'mobile' | 'tablet' | 'desktop'
  referrer      TEXT,
  screen_width  INTEGER,
  screen_height INTEGER,
  session_id    TEXT
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page       ON page_views (page);
CREATE INDEX IF NOT EXISTS idx_page_views_country    ON page_views (country);

-- Disable RLS so the service-role key can insert freely from the API route
-- (The anon key cannot write to this table from the browser — only your server can)
ALTER TABLE page_views DISABLE ROW LEVEL SECURITY;
