export const MailSchema = {
  type: 'object',

  properties: {
    to: {
      type: 'string',
      example: 'user_email@gmail.com'
    },
    subject: {
      type: 'string',
      example: 'Welcome'
    },
    html: {
      type: 'string',
      example: '<h1>Hello</h1><p>Welcome to my app</p>'
    }
  }
};

export const MailTemplateSchema = {
  type: 'object',

  properties: {
    to: {
      type: 'string',
      example: 'user_email@gmail.com'
    },
    subject: {
      type: 'string',
      example: 'Welcome'
    },
    name: {
      type: 'string',
      example: 'John Doe'
    }
  }
};
