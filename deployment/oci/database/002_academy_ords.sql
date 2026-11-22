-- ORDS read-only endpoints for the Academy retrieval boundary.
-- Run as the Academy schema after ORDS is enabled for the Autonomous Database.
-- This exposes search and test metadata only; no learner, lead, or secret tables.

BEGIN
  ORDS.DEFINE_MODULE(
    p_module_name => 'academy.public.v1',
    p_base_path => '/academy/v1/',
    p_items_per_page => 25,
    p_status => 'PUBLISHED',
    p_comments => 'Read-only Academy resources and RAG retrieval boundary'
  );
  ORDS.DEFINE_TEMPLATE(p_module_name => 'academy.public.v1', p_pattern => 'practice-tests/');
  ORDS.DEFINE_HANDLER(
    p_module_name => 'academy.public.v1', p_pattern => 'practice-tests/', p_method => 'GET', p_source_type => ORDS.source_type_collection_feed,
    p_source => 'SELECT RAWTOHEX(id) id, slug, title, level_name, description FROM academy_practice_tests WHERE published = 1 ORDER BY title'
  );
  ORDS.DEFINE_TEMPLATE(p_module_name => 'academy.public.v1', p_pattern => 'search/');
  ORDS.DEFINE_HANDLER(
    p_module_name => 'academy.public.v1', p_pattern => 'search/', p_method => 'GET', p_source_type => ORDS.source_type_collection_feed,
    p_source => 'SELECT RAWTOHEX(id) id, title, source_url, DBMS_LOB.SUBSTR(content, 1200, 1) excerpt FROM academy_documents WHERE LOWER(content) LIKE ''%'' || LOWER(:q) || ''%'' FETCH FIRST 10 ROWS ONLY'
  );
  COMMIT;
END;
/
