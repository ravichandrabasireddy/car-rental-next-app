'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthScreen from "@/features/auth/components/auth-screen";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSession, signOut } from "next-auth/react";

type UserMenuProps = {
    currentUser: any | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authFlow, setAuthFlow] = useState<"signIn" | "signUp" | "adminSignUp">("signIn");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data : session, status } = useSession();



  const handleSignUp = () => {
    setAuthFlow("signUp");
    setIsAuthOpen(true);
  };

  const handleLogIn = () => {
    setAuthFlow("signIn");
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
  };

//   const handleLogOut = async () => {
//     await signOut({ redirect: false });
//     router.push('/');
//   };

  const handleProfile = () => {
    router.push('/profile');
    setIsProfileOpen(true);
  };

  const handleReservations = () => {
    router.push('/reservations');
  };

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleAdmin = () => {
    router.push('/admin');
  };

  return ( 
    <div className="text-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {session && session.user ? (
              <>
                <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleReservations}>Reservations</DropdownMenuItem>
                {session.user.role === 'ADMIN'? <DropdownMenuItem onClick={handleAdmin}>Admin</DropdownMenuItem> : null}
                
                <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={handleSignUp}>Sign Up</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogIn}>Log In</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTitle>
                
            </DialogTitle>
          <DialogContent>
            <AuthScreen initialFlow={authFlow} onAuthSuccess={handleAuthSuccess} />
          </DialogContent>
        </Dialog>
    </div>
   );
}
 
export default UserMenu;