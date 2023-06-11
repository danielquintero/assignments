export const upperLowerDigitSymbol = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
export const email = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
export const uuid =
  '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}';
export const token = 'eyJ0[A-Za-z0-9-_.+=]+|ZBT.[A-Za-z0-9-_.+=]*';
