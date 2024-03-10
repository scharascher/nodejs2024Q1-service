export const SWAGGER_API_PROPERTY_ID = {
  description: 'uuid v4',
  example: 'e65344dc-bd95-4736-956f-6d63003f3c89',
};
export const SWAGGER_API_PARAM_ID = {
  ...SWAGGER_API_PROPERTY_ID,
  name: 'id',
  required: true,
  type: 'string',
  format: 'uuid',
};
