import { User } from 'src/users/entities/user.entity';
import { internet, name } from 'faker';

export function generateUser(): Partial<User> {
  const firstName = name.firstName();
  const lastName = name.lastName();
  const user = {
    email: internet.email(firstName, lastName),
    firstName,
    lastName,
    password: internet.password(),
    height: Math.floor(Math.random() * 250),
    weight: Math.floor(Math.random() * 250),
    age: Math.floor(Math.random() * 50),
  };
  return user;
}
