import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ib-blocks-badge.svg"
            alt="Ask Zappy logo"
            width={48}
            height={48}
          />
          <span className="text-[15px] font-semibold tracking-tight">
            Ask Zappy
          </span>
        </Link>

        <nav className="ml-6 hidden md:flex items-center gap-6 text-[15px]">
          {["IB", "Subjects", "Educators", "Students"].map((label) => (
            <button
              key={label}
              className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900"
            >
              {label}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="m6 9 6 6 6-6" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            className="p-2 rounded-lg hover:bg-slate-100"
            aria-label="Account"
          >
            <svg
              className="w-5 h-5 text-slate-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                d="M16 19a4 4 0 0 0-8 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              />
            </svg>
          </button>
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-violet-600 px-4 py-2 text-white text-sm font-semibold hover:bg-violet-700 transition"
          >
            Try Premium
          </a>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            aria-label="Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
