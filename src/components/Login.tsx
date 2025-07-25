import { signIn } from "@auth";

const Login = () => {
  const handleLogin = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <form action={handleLogin}>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
