-- Academy learning, assessment, and retrieval foundation.
-- Additive migration for PostgreSQL. It does not drop or reset existing data.

CREATE TABLE IF NOT EXISTS learning_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url text NOT NULL,
  title text NOT NULL,
  chunk_number integer NOT NULL CHECK (chunk_number > 0),
  content text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  embedding jsonb,
  embedding_model text,
  content_hash text NOT NULL,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_url, chunk_number, content_hash)
);
CREATE INDEX IF NOT EXISTS learning_documents_search_idx ON learning_documents USING gin (to_tsvector('english', title || ' ' || content));
CREATE INDEX IF NOT EXISTS learning_documents_metadata_idx ON learning_documents USING gin (metadata);

CREATE TABLE IF NOT EXISTS practice_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  level text NOT NULL CHECK (level IN ('Foundation','Developer','Advanced')),
  description text NOT NULL,
  independent_disclaimer text NOT NULL,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS practice_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid NOT NULL REFERENCES practice_tests(id) ON DELETE CASCADE,
  question_order integer NOT NULL CHECK (question_order > 0),
  prompt text NOT NULL,
  choices jsonb NOT NULL,
  answer_index integer NOT NULL CHECK (answer_index >= 0),
  explanation text NOT NULL,
  UNIQUE (test_id, question_order)
);
CREATE TABLE IF NOT EXISTS practice_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid NOT NULL REFERENCES practice_tests(id),
  learner_id uuid REFERENCES learners(id),
  score integer NOT NULL CHECK (score >= 0),
  question_count integer NOT NULL CHECK (question_count > 0),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE learning_documents IS 'RAG source chunks; embeddings are optional until an approved embedding pipeline is configured.';
COMMENT ON TABLE practice_tests IS 'Independent HybridGenAI study practice; never represented as an official provider exam.';
