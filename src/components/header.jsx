import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  const { user } = useUser();
  const isAuthenticated = Boolean(user?.id);

  if (!isAuthenticated || location.pathname.includes("public")) return <></>;

  return (
    <header className="p-4 flex justify-end border-b border-b-zinc-700">
      <SignedIn>
        <UserButton afterSignOutUrl="" />
      </SignedIn>
    </header>
  );
};

export default Header;
