import { UserStatus } from '../../user/type/user-status.enum';
export interface AuthUser {
  id: string;
  status: UserStatus;
}
