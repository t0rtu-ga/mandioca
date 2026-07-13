import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-negro-500 px-6 py-4 text-records-primary">
      <Link href="/">
        <Image 
          src="/logos/mark-records-yellow.svg"
          alt="Mandioca Records"
          width={65}
          height={36}
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/services">Servicios</Link>
          </li>
          <li>
            <Link href="/portfolio">Portafolio</Link>
          </li>
          <li>
            <Link href="/freebies">Freebies</Link>
          </li>
          <li>
            <Link href="/contact">Charla con nosotros</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
