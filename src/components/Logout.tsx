import { signOut } from "@auth";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit">Log out</button>
    </form>
  );
};

export default Logout;
