import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import {
  AtSign,
  Hash,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Search,
  Send,
  Sparkles,
  Users2,
  Video,
} from 'lucide-react'

export const Route = createFileRoute('/demo')({
  component: RouteComponent,
})

type ThreadType = 'channel' | 'direct'

type Thread = {
  id: string
  label: string
  meta: string
  type: ThreadType
}

type Message = {
  id: string
  author: string
  avatar: string
  timestamp: string
  content: string
  outgoing?: boolean
}

const channelThreads: Thread[] = [
  { id: 'design-drop', label: 'design-drop', meta: 'Design crew', type: 'channel' },
  { id: 'launch-sync', label: 'launch-sync', meta: 'Marketing & Ops', type: 'channel' },
  { id: 'all-hands', label: 'all-hands', meta: 'Announcements', type: 'channel' },
]

const directThreads: Thread[] = [
  { id: 'dm-sam', label: 'Samira Chen', meta: 'Design lead', type: 'direct' },
  { id: 'dm-luca', label: 'Luca Ortiz', meta: 'Full stack', type: 'direct' },
  { id: 'dm-ivy', label: 'Ivy Turner', meta: 'Product ops', type: 'direct' },
]

const initialMessages: Record<string, Message[]> = {
  'design-drop': [
    {
      id: 'm-1',
      author: 'Samira Chen',
      avatar: 'SC',
      timestamp: '08:17',
      content:
        'Dropped the updated thread headers. Shadows are toned down so the focus is on the message contrast.',
    },
    {
      id: 'm-2',
      author: 'Luca Ortiz',
      avatar: 'LO',
      timestamp: '08:19',
      content: 'Pairing the new badge tokens with the compact mode feels right. Shipping the PR now.',
    },
  ],
  'launch-sync': [
    {
      id: 'm-3',
      author: 'Ivy Turner',
      avatar: 'IT',
      timestamp: '09:02',
      content: 'Timeline looks solid. Need a quick video walkthrough for partner success by end of day.',
    },
  ],
  'all-hands': [
    {
      id: 'm-4',
      author: 'Threadline Bot',
      avatar: 'TB',
      timestamp: '07:00',
      content: 'Reminder: company call today at 12:00 with the new workspace preview.',
    },
  ],
  'dm-sam': [
    {
      id: 'm-5',
      author: 'Samira Chen',
      avatar: 'SC',
      timestamp: '09:26',
      content: 'Sending over a motion prototype in a bit. Keen to hear how it feels on mobile.',
    },
  ],
  'dm-luca': [
    {
      id: 'm-6',
      author: 'Luca Ortiz',
      avatar: 'LO',
      timestamp: '09:41',
      content: 'Loader issue is sorted. Can we test the new presence indicators in this branch?',
    },
  ],
  'dm-ivy': [
    {
      id: 'm-7',
      author: 'Ivy Turner',
      avatar: 'IT',
      timestamp: '08:58',
      content: 'Need your call on the onboarding copy. Shorter is probably better for the first pass.',
    },
  ],
}

const viewTabs: ReadonlyArray<{ id: 'channels' | 'direct'; label: string }> = [
  { id: 'channels', label: 'Channels' },
  { id: 'direct', label: 'Direct' },
]

const getInitials = (value: string) =>
  value
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

function RouteComponent() {
  const [view, setView] = useState<'channels' | 'direct'>('channels')
  const [threads, setThreads] = useState<Record<string, Message[]>>(() => ({
    ...initialMessages,
  }))
  const [activeThread, setActiveThread] = useState<string>(channelThreads[0]?.id ?? '')
  const [draft, setDraft] = useState('')

  const roster = view === 'channels' ? channelThreads : directThreads

  const activeMessages = useMemo<Message[]>(() => {
    return threads[activeThread] ?? []
  }, [threads, activeThread])

  const currentMeta = useMemo(() => {
    const allThreads = [...channelThreads, ...directThreads]
    return allThreads.find((thread) => thread.id === activeThread)
  }, [activeThread])

  useEffect(() => {
    const pool = view === 'channels' ? channelThreads : directThreads
    if (!pool.length) return
    const exists = pool.some((thread) => thread.id === activeThread)
    if (!exists) {
      setActiveThread(pool[0].id)
    }
  }, [view, activeThread])

  const handleThreadChange = (thread: Thread) => {
    setActiveThread(thread.id)
    setView(thread.type === 'direct' ? 'direct' : 'channels')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed || !activeThread) return

    setThreads((prev) => ({
      ...prev,
      [activeThread]: [
        ...(prev[activeThread] ?? []),
        {
          id: `draft-${Date.now()}`,
          author: 'You',
          avatar: 'YY',
          timestamp: 'now',
          content: trimmed,
          outgoing: true,
        },
      ],
    }))
    setDraft('')
  }

  const conversationTitle = currentMeta
    ? currentMeta.type === 'direct'
      ? currentMeta.label
      : `#${currentMeta.label}`
    : 'Select a space'

  const conversationSubtitle = currentMeta?.meta ?? 'Choose a conversation to load history.'

  const HeaderIcon = currentMeta?.type === 'direct' ? AtSign : Hash

  const presence = useMemo(() => {
    if (!currentMeta) return ['YY']
    if (currentMeta.type === 'direct') {
      return [getInitials(currentMeta.label), 'YY']
    }
    return ['SC', 'LO', 'IT', 'YY']
  }, [currentMeta])

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[-15%] h-[28rem] w-[28rem] rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[35%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-[180px]" />
        <div className="absolute right-[-20%] top-[15%] h-[26rem] w-[26rem] rounded-full bg-pink-500/20 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-6 pb-12 pt-8 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-white shadow-[0_18px_40px_rgba(99,102,241,0.35)] backdrop-blur-xl">
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-violet-200/70">Nice Chat Labs</p>
              <h1 className="text-lg font-semibold text-white sm:text-xl">Interactive workspace preview</h1>
              <p className="text-xs text-slate-300/80">Experimental glass interface for channel + DM flow</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-slate-200 shadow-[0_10px_24px_rgba(15,23,42,0.45)] backdrop-blur-xl transition hover:border-white/40 hover:text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Auto layout prototype
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-br from-white/80 via-white/60 to-white/40 px-4 py-2 text-xs font-semibold text-slate-900 shadow-[0_12px_30px_rgba(148,163,184,0.45)] backdrop-blur-xl transition hover:from-white hover:via-white hover:to-white">
              <Users2 className="h-4 w-4" aria-hidden="true" />
              Invite teammate
            </button>
          </div>
        </header>

        <main className="mt-10 flex flex-1 flex-col gap-6">
          <div className="grid flex-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="flex flex-col gap-5 rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-[0_25px_60px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-200/80">Spaces</p>
                  <p className="text-sm font-semibold text-white/90">Switch between rooms</p>
                </div>
                <button className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-white/40 hover:text-white">
                  New
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1.5 shadow-[0_12px_24px_rgba(15,23,42,0.45)]">
                {viewTabs.map((tab) => {
                  const isActive = view === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setView(tab.id)}
                      aria-pressed={isActive}
                      className={`flex-1 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] transition ${
                        isActive
                          ? 'bg-gradient-to-br from-white via-white/80 to-white/60 text-slate-900 shadow-[0_10px_26px_rgba(148,163,184,0.55)]'
                          : 'text-violet-100/70 hover:text-white/90'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              <label className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-200/70" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search spaces"
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-2 pl-10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </label>

              <div className="flex flex-col gap-3 overflow-hidden">
                <ul className="flex max-h-[340px] flex-col gap-2 overflow-y-auto pr-1 sm:max-h-[420px] lg:max-h-[calc(100vh-320px)]">
                  {roster.map((thread) => {
                    const isActive = thread.id === activeThread
                    const Icon = thread.type === 'channel' ? Hash : AtSign

                    return (
                      <li key={thread.id}>
                        <button
                          type="button"
                          onClick={() => handleThreadChange(thread)}
                          className={`group relative flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                            isActive
                              ? 'border-white/40 bg-white/20 text-white shadow-[0_14px_28px_rgba(99,102,241,0.35)]'
                              : 'border-white/5 bg-white/10 text-slate-200/80 hover:border-white/20 hover:bg-white/15 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/20 text-white backdrop-blur-xl" aria-hidden="true">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-sm font-semibold">{thread.label}</span>
                              <span className="text-xs text-slate-200/70">{thread.meta}</span>
                            </span>
                          </div>
                          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-violet-100/70">
                            {thread.type === 'channel' ? 'Open' : 'DM'}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>

            <section className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_70px_rgba(15,23,42,0.45)] backdrop-blur-3xl">
              <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/20 bg-white/15 text-white backdrop-blur-xl">
                    <HeaderIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{conversationTitle}</p>
                    <p className="text-xs text-slate-200/80">{conversationSubtitle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200/80">
                  <div className="flex -space-x-2 overflow-hidden">
                    {presence.map((initials) => (
                      <span
                        key={initials}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/30 text-[10px] font-semibold text-slate-900"
                      >
                        {initials}
                      </span>
                    ))}
                  </div>
                  <span className="hidden sm:inline">Live sync enabled</span>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-200 transition hover:border-white/40 hover:text-white" type="button">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-200 transition hover:border-white/40 hover:text-white" type="button">
                      <Video className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-200 transition hover:border-white/40 hover:text-white" type="button">
                      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </header>

              <div className="flex flex-1 flex-col gap-4 overflow-hidden">
                <ul className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
                  {activeMessages.length ? (
                    activeMessages.map((message) => (
                      <li
                        key={message.id}
                        className={`flex gap-3 ${message.outgoing ? 'flex-row-reverse text-right' : ''}`}
                      >
                        <span
                          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                            message.outgoing
                              ? 'border-white/70 bg-white text-slate-900 shadow-[0_10px_24px_rgba(148,163,184,0.45)]'
                              : 'border-white/20 bg-white/20 text-white backdrop-blur'
                          }`}
                        >
                          {message.outgoing ? 'YOU' : message.avatar}
                        </span>
                        <div className={`flex max-w-[min(26rem,90vw)] flex-col gap-2 ${message.outgoing ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold text-white">
                              {message.outgoing ? 'You' : message.author}
                            </span>
                            <span className="text-xs text-slate-400">{message.timestamp}</span>
                          </div>
                          <p
                            className={`rounded-3xl border px-4 py-3 text-sm leading-relaxed shadow-lg shadow-slate-950/40 ${
                              message.outgoing
                                ? 'border-transparent bg-gradient-to-br from-white via-white/90 to-white/80 text-slate-900'
                                : 'border-white/15 bg-white/10 text-slate-100 backdrop-blur'
                            }`}
                          >
                            {message.content}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="flex flex-1 flex-col items-center justify-center text-center text-sm text-slate-400">
                      <p>No messages yet.</p>
                      <p className="text-xs text-slate-500">Kick off the first note to start the flow.</p>
                    </li>
                  )}
                </ul>

                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-3 rounded-[999px] border border-white/15 bg-white/10 px-4 py-2 shadow-[0_16px_32px_rgba(15,23,42,0.45)] backdrop-blur-2xl"
                >
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Drop a note to keep the momentum"
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-gradient-to-br from-white via-white/90 to-white/70 text-slate-900 shadow-[0_10px_24px_rgba(148,163,184,0.45)] transition hover:from-white hover:via-white hover:to-white"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
