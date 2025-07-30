import { auth } from "@auth";
import Navbar from "@components/Navbar";

const NavbarWrapper = async () => {
  const session = await auth();

  return <Navbar session={session} />;
};

export default NavbarWrapper;
