import { createServer, Registry, Request, Response, Server } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { UserFactory } from './factories/user';
import { UserModel } from './models/user';
import { signin } from './route-handlers/signin';
import { sharedScenario } from './scenarios/shared';

console.log('APARECE SHARED MOCK UTIL');
export type AppRegistry = Registry<
  /* factories can be defined here */
  {
    user: typeof UserModel;
  },
  /* factories can be defined here */
  {
    user: typeof UserFactory;
  }
>;

export type AppSchema = Schema<AppRegistry>;

export function makeServer({
  environment = 'development',
} = {}): Server<AppRegistry> {
  console.log('makeServer env', environment);

  const server = createServer({
    environment,
    models: {
      user: UserModel,
    },
    factories: {
      user: UserFactory,
    },
    seeds(_server: Server<AppRegistry>) {
      sharedScenario(_server);
    },
    routes() {
      this.passthrough('https://demo-api.now.sh/users');

      this.namespace = '/api';
      this.post('/signin', signin);

      this.get('/users', (schema: AppSchema, request: Request) => {
        console.log(request);

        return schema.all('user');
      });
    },
  });

  return server;
}

/**
 * If Cypress boots the application we delegate app's network requests to handleFromCypress available on window.
 * handleFromCypress is registered in the cypress e2e application. (support/index.ts)
 */
type Methods = 'get' | 'put' | 'patch' | 'post' | 'delete';
export function setCypressServerHandler() {
  const server = createServer({
    environment: 'test',
    routes(this) {
      const methods = ['get', 'put', 'patch', 'post', 'delete'];
      methods.forEach((method) => {
        this[method as Methods](
          '/*',
          async (schema: AppSchema, request: Request) => {
            const [
              status,
              headers,
              body,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] = await (window as any).handleFromCypress(request);

            return new Response(status, headers, body);
          }
        );
      });
      this.passthrough('https://demo-api.now.sh/users');
    },
  });
  console.log('setCypressServerHandler server', server);
}
