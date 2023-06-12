export const environment = {
  production: false,
};

import('@challenges/shared-util-mocking').then((module) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Cypress
    ? module.setCypressServerHandler()
    : module.makeServer();
});
