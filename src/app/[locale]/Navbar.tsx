"use client";

// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "../../components/Typography";

const navItems = [
  { name: "홈", href: "/" },
  { name: "TailwindCSS", href: "/tailwind" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4 px-6 py-4 bg-white shadow-md">
      <Link href={"/"} className="text-xl font-semibold">
        <Typography type="strong_01"> NextJS BoilerPlate</Typography>
      </Link>
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              {/* <Button
                variant={pathname === item.href ? "default" : "outline"}
                className="cursor-pointer"
              >
                {item.name}
              </Button> */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
