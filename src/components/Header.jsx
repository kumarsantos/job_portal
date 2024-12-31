import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };

  const handleSignIn = () => {
    setShowSignIn(true);
    setSearch("");
  };

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  return (
    <>
      <nav className="py-4 flex justify-between items-center ">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-20" />
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={handleSignIn}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" /> Post a job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    style: {
                      borderRadius: "w-10 h-10",
                    },
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpFallbackRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
