
import Link from 'next/link'


export default function Page() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-semibold tracking-tight mt-1">IB Resources page</h2>

        <Link href="/ib-math/analysis-and-approaches/question-bank/sl"
          className="inline-flex items-center justify-center mt-6 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">
          Go to IB Math Analysis and Approaches Question Bank
        </Link>

        <Link href="/ib-math/analysis-and-approaches/question-bank/sl/number-and-algebra/all-concepts"
          className="inline-flex items-center justify-center mt-6 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">
          Go to IB Math Analysis and Approaches - Numbers and Algebra - All Concepts - Questions
        </Link>
      </main>
    </>
  )
}