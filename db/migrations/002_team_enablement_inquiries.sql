-- Additive fields for qualifying proposed team-enablement inquiries.
-- Existing leads remain valid and no private learner or organization portal is created.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS program_interest text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS team_size text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS timeline text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS desired_outcome text;

COMMENT ON COLUMN leads.program_interest IS 'Optional proposed HybridGenAI team-enablement program of interest.';
COMMENT ON COLUMN leads.team_size IS 'Optional self-reported team-size range from an inquiry form.';
COMMENT ON COLUMN leads.timeline IS 'Optional requested delivery timeframe; not a booking or commitment.';
COMMENT ON COLUMN leads.desired_outcome IS 'Optional outcome requested by the inquirer.';
