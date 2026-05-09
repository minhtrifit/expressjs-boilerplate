export const RegisterSchema = {
  type: 'object',

  properties: {
    email: {
      type: 'string'
    },
    fullName: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
};

export const LoginSchema = {
  type: 'object',

  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
};
