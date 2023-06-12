import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { WithFactoryMethods } from 'miragejs/-types';

export const UserFactory = Factory.extend({
  firstName() {
    return faker.person.firstName();
  },
  lastName() {
    return faker.person.lastName();
  },
  password() {
    return faker.internet.password();
  },
  age() {
    return Math.floor(Math.random() * (100 - 0 + 1) + 0);
  },
  email() {
    return `${this.firstName}.${this.lastName}@${faker.internet.domainName()}`;
  },
  sex(i: number) {
    const genres = ['male', 'female'];

    return genres[i % genres.length];
  },
} as WithFactoryMethods<{ firstName: string; lastName: string; password: string; age: number; email: string; sex: string }>);
