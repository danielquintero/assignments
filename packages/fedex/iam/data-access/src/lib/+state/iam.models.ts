import { UserProfileDto } from '../dto';

export type UserProfile = UserProfileDto;
export type UserSignUp = Pick<
  UserProfileDto,
  'email' | 'firstName' | 'lastName'
> & {
  password: string;
};
export type UserSignIn = Pick<UserProfileDto, 'email'> & { password: string };

/**
 * Interface for the 'Iam' data
 */
export interface UserEntity {
  id: string | number; // Primary ID
  email: string;
  firstName: string;
  lastName: string;
}
