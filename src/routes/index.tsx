import { Link, createFileRoute } from '@tanstack/react-router'
import { MessageCircle } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-[100svh] flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pt-10 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white" aria-hidden="true">
            <MessageCircle className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold text-white/90 sm:text-base">Nice Chat</span>
        </div>
        <span className="text-xs uppercase tracking-[0.4em] text-violet-200/60">Lab build • 01</span>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 transform flex-col items-center justify-center gap-8 px-6 pb-16 pt-14 text-center sm:-translate-y-8 sm:px-8">
        <div className="flex flex-col items-center gap-5">
          <h1 className="flex items-center gap-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Nice
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white sm:h-10 sm:w-10">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </span>
          </h1>
          <p className="max-w-md text-sm text-slate-300">
            We&apos;re prototyping a chat canvas that lets teams glide from open channels to focused one-on-ones without losing rhythm.
          </p>
        </div>

        <Link
          to="/demo"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
        >
          Launch the interactive demo
        </Link>

        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
          Group & direct threads · Built with React + TanStack Router
        </p>
      </main>
    </div>
  )
}
