export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type UserSession = {
  user: User & { id: string };
};

export type SessionProps = {
  session: {
    user?: User;
  } | null;
};
