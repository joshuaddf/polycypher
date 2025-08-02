// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import NavDropdownMenu from "./NavDropdownMenu";

// export default async function NavDropdown() {
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();

//     const firstName = user?.given_name ?? 'Guest';
//     const lastName = user?.family_name ?? 'Guest';

//     return <NavDropdownMenu firstName={firstName} lastName={lastName} />;
// }