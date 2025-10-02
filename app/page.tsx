import Image from "next/image";
import { NavbarH } from "./components/Navbar";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";

export default function Home() {
  return (
   
    <BackgroundBeamsWithCollision>
      <main>
        <NavbarH />
      </main>
    </BackgroundBeamsWithCollision>
  );
}
