import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Navbar from './Navbar';

const NavbarServer = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const firstName = user?.given_name ?? 'Guest';
  const lastName = user?.family_name ?? 'Guest';
  const profilePicture = user?.picture ?? 'pfp';
  
  return <Navbar firstName={firstName} lastName={lastName} profilePicture={profilePicture} />;
};

export default NavbarServer;