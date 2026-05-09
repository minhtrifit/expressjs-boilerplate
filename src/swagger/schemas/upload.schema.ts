export const SingleSchema = {
  type: 'object',

  properties: {
    file: {
      type: 'string',
      format: 'binary'
    }
  }
};

export const MultiSchema = {
  type: 'object',

  required: ['files'],

  properties: {
    files: {
      type: 'array',

      items: {
        type: 'string',
        format: 'binary'
      }
    }
  }
};
