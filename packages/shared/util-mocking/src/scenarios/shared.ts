import { Server } from 'miragejs';
import { AppRegistry } from '../shared-util-mock-server';

export function sharedScenario(server: Server<AppRegistry>) {
  // create test users
  server.create('user', {
    firstName: 'admin',
    lastName: '01',
    email: `admin.01@email.com`,
    password: 'S#p3Rs3CR3tp4Ssw0rD',
  });
}
