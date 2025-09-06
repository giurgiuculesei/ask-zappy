// components/FooterLegal.tsx
import Image from "next/image";

export default function FooterLegal() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 text-center">
        {/* Optional small badge above the disclaimer */}
        <div className="mb-4 flex justify-center">
          {/* Swap the src or remove this <Image> if you don’t want an icon */}
          <Image
            src="/ib-blocks-badge.svg"
            alt=""
            width={36}
            height={36}
            className="opacity-80"
          />
        </div>

        {/* Disclaimer (IB wording) */}
        <div className="mx-auto max-w-3xl text-sm leading-6 text-slate-600">
          <p className="text-sm leading-6 text-slate-600">
            Ask Zappy operates independently of the International Baccalaureate
            Organization.
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            “International Baccalaureate” and “IB” are trademarks owned by the
            IBO.
          </p>
        </div>

        {/* Contact + Copyright */}
        <div className="mt-6 space-y-1">
          <a
            href="mailto:info@ask-zappy.com"
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            <b>info@ask-zappy.com</b>
          </a>
          <p className="text-xs text-slate-500">
            © {year} Ask Zappy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
