

import Container from "@/components/container";
import Logo from "./logo";
import UserMenu from "./usermenu";
type NavbarProps = {
    currentUser: any | null;
}

export default function Navbar({ currentUser }: NavbarProps) {
    return (
        <div>
             <div className="fixed w-full bg-black z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
         
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  </div>
        </div>
    )
}