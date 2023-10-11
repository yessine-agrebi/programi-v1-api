import { User } from 'src/users/entities/user.entity';
import { internet, name } from 'faker';

export function generateUser(): Partial<User> {
  const first_name = name.firstName();
  const last_name = name.lastName();
  const user = {
    email: internet.email(first_name, last_name),
    first_name,
    last_name,
    password: internet.password(),
    height: Math.floor(Math.random() * 250),
    weight: Math.floor(Math.random() * 250),
    age: Math.floor(Math.random() * 50),
  };
  return user;
}
