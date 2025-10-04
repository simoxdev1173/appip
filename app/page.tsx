import Image from "next/image";

import { NavbarH } from "./components/Navbar";
import { HeroHighlight ,Highlight} from "./components/ui/hero-highlight";


export default function Home() {
  return (

       
      <main className="bg-background">
        <header>
          <NavbarH />
        </header>
        
      <section>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
  
        <div className={"md:col-span-1 h-60 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-lg p-4 shadow-sm"}>
            <h1>
                Stats
            </h1>
        </div>
        <div className={"md:col-span-3 h-60 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-lg p-4 shadow-sm"}>

        </div>
      </div> 
      <div>
      </div>
      </section>
      </main>
  

  );
}
