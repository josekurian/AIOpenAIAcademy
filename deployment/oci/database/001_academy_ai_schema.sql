-- Oracle AI Database / Autonomous Database 26ai schema for Academy RAG and practice content.
-- Run as the dedicated AIOPENAIA user after the schema is created. No password is stored here.
-- SQLcl example: sql AIOPENAIAACADEMY@AIDB_LOW @001_academy_ai_schema.sql

BEGIN
  EXECUTE IMMEDIATE 'CREATE TABLE academy_documents (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    source_url VARCHAR2(2000) NOT NULL,
    title VARCHAR2(500) NOT NULL,
    chunk_number NUMBER(10) NOT NULL,
    content CLOB NOT NULL,
    metadata JSON,
    embedding VECTOR(1536, FLOAT32),
    embedding_model VARCHAR2(200),
    content_hash VARCHAR2(128) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT academy_documents_uq UNIQUE (source_url, chunk_number, content_hash)
  )';
EXCEPTION WHEN OTHERS THEN IF SQLCODE != -955 THEN RAISE; END IF;
END;
/

BEGIN
  EXECUTE IMMEDIATE 'CREATE TABLE academy_practice_tests (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    slug VARCHAR2(160) UNIQUE NOT NULL,
    title VARCHAR2(500) NOT NULL,
    level_name VARCHAR2(30) NOT NULL,
    description VARCHAR2(2000) NOT NULL,
    independent_disclaimer VARCHAR2(2000) NOT NULL,
    published NUMBER(1) DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT academy_practice_level_ck CHECK (level_name IN (''Foundation'', ''Developer'', ''Advanced''))
  )';
EXCEPTION WHEN OTHERS THEN IF SQLCODE != -955 THEN RAISE; END IF;
END;
/

BEGIN
  EXECUTE IMMEDIATE 'CREATE TABLE academy_practice_questions (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    test_id RAW(16) NOT NULL REFERENCES academy_practice_tests(id),
    question_order NUMBER(10) NOT NULL,
    prompt VARCHAR2(4000) NOT NULL,
    choices JSON NOT NULL,
    answer_index NUMBER(10) NOT NULL,
    explanation VARCHAR2(4000) NOT NULL,
    CONSTRAINT academy_practice_question_uq UNIQUE (test_id, question_order)
  )';
EXCEPTION WHEN OTHERS THEN IF SQLCODE != -955 THEN RAISE; END IF;
END;
/

CREATE INDEX academy_documents_url_idx ON academy_documents(source_url);
CREATE INDEX academy_documents_metadata_idx ON academy_documents(metadata) INDEXTYPE IS CTXSYS.CONTEXT;

-- Vector index is intentionally created only after embeddings are loaded. Tune the
-- IVF/HNSW parameters against the actual corpus and available free-tier capacity.
-- Example after loading vectors:
-- CREATE VECTOR INDEX academy_documents_vec_idx ON academy_documents(embedding)
-- ORGANIZATION INMEMORY NEIGHBOR GRAPH DISTANCE COSINE;
