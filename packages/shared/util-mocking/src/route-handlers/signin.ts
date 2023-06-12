import { Request, Response } from 'miragejs';
import { AppSchema } from '../shared-util-mock-server';

export const signin = (schema: AppSchema, request: Request) => {
  console.log('Request from MirageJs: ', request);
  const attrs = JSON.parse(request.requestBody);
  const user = schema.findBy('user', {
    email: attrs.email,
    password: attrs.password,
  });

  if (user) {
    return user;
  }

  return new Response(
    403,
    { some: 'header' },
    {
      errors: [
        'We could not sign you in. Please try again with the correct email and password combination.',
      ],
    }
  );
};
