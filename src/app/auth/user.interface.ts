export interface ResponseInterface {
  message: string;
  user: userInterface;
  token: string;
}

interface userInterface {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}
