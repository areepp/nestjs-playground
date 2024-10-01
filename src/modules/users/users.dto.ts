export class CreateUserDto {
  name: string;
  email: string;
}

export class GetUsersQuery {
  is_subscribed: boolean;
}
