import { Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <Twitter />
          </a>
          <a>
            <Youtube />
          </a>
          <a>
            <Facebook />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by XXX
        </p>
      </aside>
    </footer>
  );
}
