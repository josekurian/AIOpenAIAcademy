const read = (name: string, fallback: string) => process.env[name]?.trim() || fallback;

export const partnerConfig = {
  displayName: read('PARTNER_DISPLAY_NAME', 'HybridGenAI Academy'),
  domain: read('PARTNER_DOMAIN', 'academy.hybridgenai.local'),
  city: read('PARTNER_CITY', 'Dallas–Fort Worth'),
  operator: read('PARTNER_OPERATOR', 'Hybrid Cloud Services LLC'),
  status: read('PARTNER_STATUS', 'independent academy'),
};

export const partnerIsConfigured = partnerConfig.displayName !== 'HybridGenAI Academy';
