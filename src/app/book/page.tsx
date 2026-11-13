'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Check, Clock, Download, Loader2, Send, Video, X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fadeUp } from '@/lib/motion';
import { groupSlotsByZone, type SlotDay } from '@/lib/slot-time';

interface Slot { start: string; end: string }
interface Day { date: string; slots: Slot[] }
interface Availability {
  timeZone: string;
  durationMinutes: number;
  minLeadHours: number;
  guestWindow?: { startHour: number; endHour: number };
  days: Day[];
}
interface StatusPayload {
  id: string;
  status: 'pending' | 'confirmed' | 'declined' | 'cancelled' | 'expired';
  slotStart: string;
  durationMinutes: number;
  timeZone: string;
  callLink: string | null;
  meetLink: string | null;
}

const COPY = {
  en: {
    eyebrow: 'Availability',
    title: 'Book a call',
    intro: 'Pick a slot and tell me what we are solving. You get a Google Meet link and a calendar invite once I confirm.',
    pickDay: 'Choose a day',
    pickTime: 'Choose a time',
    details: 'Your details',
    name: 'Name',
    email: 'Email',
    telegram: 'Telegram handle (optional)',
    topic: 'What do you want to discuss?',
    topicHint: '10 characters minimum — the more context, the better the call.',
    submit: 'Request this slot',
    submitting: 'Sending request…',
    empty: 'No open slots in the next weeks. Message me on Telegram instead.',
    retryLater: 'Booking is temporarily unavailable. Ping me on Telegram.',
    pendingTitle: 'Request sent',
    pendingBody: 'I review every request personally. Keep this page open — the call link appears here once confirmed.',
    confirmedTitle: 'Confirmed',
    confirmedBody:
      'The calendar invitation is in your inbox. Join from here, or straight from the calendar event.',
    confirmedBodyRoom: 'Your call link is ready. Open it in Telegram, then tap “Join video chat” in the room.',
    join: 'Join Google Meet',
    joinRoom: 'Open call room',
    calendar: 'Add to calendar',
    cancel: 'Cancel request',
    cancelled: 'Request cancelled.',
    declined: 'I could not take this slot. Try another time.',
    expired: 'This request expired before it was confirmed.',
    back: 'Back to details',
    newRequest: 'Request another slot',
    timezone: 'Times shown in',
    comfortOnly: 'Comfortable hours only',
    showAllTimes: 'All times',
    noneInWindow: 'Nothing left inside comfortable hours for your timezone.',
    showMyTime: 'Show my time',
    showAzzarTime: "Show Azzar's time",
    duration: 'minute call',
    errName: 'Enter your name.',
    errEmail: 'Enter a valid email.',
    errTopic: 'Add at least 10 characters.',
  },
  id: {
    eyebrow: 'Ketersediaan',
    title: 'Jadwalkan panggilan',
    intro: 'Pilih slot dan ceritakan apa yang ingin dibahas. Tautan Google Meet dan undangan kalender dikirim begitu saya konfirmasi.',
    pickDay: 'Pilih hari',
    pickTime: 'Pilih jam',
    details: 'Data kamu',
    name: 'Nama',
    email: 'Email',
    telegram: 'Username Telegram (opsional)',
    topic: 'Mau bahas apa?',
    topicHint: 'Minimal 10 karakter — makin jelas, makin efektif panggilannya.',
    submit: 'Ajukan slot ini',
    submitting: 'Mengirim permintaan…',
    empty: 'Belum ada slot terbuka beberapa minggu ke depan. Hubungi saya lewat Telegram.',
    retryLater: 'Pemesanan sedang tidak tersedia. Hubungi saya lewat Telegram.',
    pendingTitle: 'Permintaan terkirim',
    pendingBody: 'Setiap permintaan saya tinjau sendiri. Biarkan halaman ini terbuka — tautan panggilan muncul setelah dikonfirmasi.',
    confirmedTitle: 'Terkonfirmasi',
    confirmedBody: 'Undangan kalender sudah masuk ke email kamu. Gabung dari sini, atau langsung dari acara di kalender.',
    confirmedBodyRoom: 'Tautan panggilan sudah siap. Buka di Telegram, lalu ketuk “Gabung panggilan video” di ruangan.',
    join: 'Gabung Google Meet',
    joinRoom: 'Buka ruang panggilan',
    calendar: 'Tambah ke kalender',
    cancel: 'Batalkan permintaan',
    cancelled: 'Permintaan dibatalkan.',
    declined: 'Slot ini tidak bisa saya ambil. Coba waktu lain.',
    expired: 'Permintaan kedaluwarsa sebelum dikonfirmasi.',
    back: 'Kembali ke data',
    newRequest: 'Ajukan slot lain',
    timezone: 'Waktu ditampilkan dalam',
    comfortOnly: 'Hanya jam wajar',
    showAllTimes: 'Semua jam',
    noneInWindow: 'Tidak ada slot di jam wajar untuk zona waktumu.',
    showMyTime: 'Tampilkan waktu saya',
    showAzzarTime: 'Tampilkan waktu Azzar',
    duration: 'menit',
    errName: 'Isi nama kamu.',
    errEmail: 'Email tidak valid.',
    errTopic: 'Isi minimal 10 karakter.',
  },
} as const;

const STORAGE_KEY = 'memabook:last';

export default function BookPage() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.en;

  const [availability, setAvailability] = useState<Availability | null>(null);
  const [visitorTz, setVisitorTz] = useState<string | null>(null);
  const [showOwnerTz, setShowOwnerTz] = useState(false);
  const [showAllTimes, setShowAllTimes] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', telegram: '', topic: '' });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [record, setRecord] = useState<{ id: string; token: string } | null>(null);
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone || null);
    } catch {
      setVisitorTz(null);
    }
  }, []);

  const loadAvailability = useCallback(async () => {
    try {
      const response = await fetch('/api/call/availability', { cache: 'no-store' });
      if (!response.ok) throw new Error('unavailable');
      setAvailability((await response.json()) as Availability);
      setLoadError(null);
    } catch {
      setLoadError(copy.retryLater);
    }
  }, [copy.retryLater]);

  useEffect(() => {
    void loadAvailability();
  }, [loadAvailability]);

  useEffect(() => {
    if (record) return;
    const timer = setInterval(() => void loadAvailability(), 60_000);
    return () => clearInterval(timer);
  }, [record, loadAvailability]);

  const refreshStatus = useCallback(
    async (target: { id: string; token: string }) => {
      const response = await fetch(`/api/call/bookings/${target.id}?token=${target.token}`, { cache: 'no-store' });
      if (response.status === 404) {
        localStorage.removeItem(STORAGE_KEY);
        setRecord(null);
        return;
      }
      if (response.ok) setStatus((await response.json()) as StatusPayload);
    },
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkedId = params.get('b');
    const linkedToken = params.get('t');
    if (linkedId && linkedToken) {
      const linked = { id: linkedId, token: linkedToken };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(linked));
      setRecord(linked);
      void refreshStatus(linked);
      window.history.replaceState({}, '', '/book');
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { id: string; token: string };
      setRecord(parsed);
      void refreshStatus(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [refreshStatus]);

  useEffect(() => {
    if (!record) return;
    if (status && status.status !== 'pending') return;
    const timer = setInterval(() => void refreshStatus(record), 8000);
    return () => clearInterval(timer);
  }, [record, status, refreshStatus]);

  useEffect(() => {
    if (record) statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [record]);

  const ownerTz = availability?.timeZone;
  const displayTz = showOwnerTz ? ownerTz : visitorTz || ownerTz;

  const days = useMemo<SlotDay[]>(() => {
    if (!availability) return [];
    const zone = displayTz || availability.timeZone;
    return groupSlotsByZone(
      availability.days.flatMap((day) => day.slots),
      zone,
    );
  }, [availability, displayTz]);

  const guestWindow = availability?.guestWindow;

  const visibleDays = useMemo(() => {
    if (!guestWindow || showAllTimes) return days;
    const hourOf = new Intl.DateTimeFormat('en-GB', {
      timeZone: displayTz,
      hour: '2-digit',
      hour12: false,
    });
    return days
      .map((day) => ({
        ...day,
        slots: day.slots.filter((entry) => {
          const hour = Number(hourOf.format(new Date(entry.start))) % 24;
          return hour >= guestWindow.startHour && hour < guestWindow.endHour;
        }),
      }))
      .filter((day) => day.slots.length > 0);
  }, [days, guestWindow, showAllTimes, displayTz]);

  const hiddenByWindow = days.reduce((total, day) => total + day.slots.length, 0) -
    visibleDays.reduce((total, day) => total + day.slots.length, 0);

  const activeDay = visibleDays[Math.min(dayIndex, visibleDays.length - 1)];

  useEffect(() => {
    setDayIndex(0);
    setSlot(null);
  }, [displayTz]);

  const formatTime = useMemo(
    () => (iso: string) =>
      new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-GB', {
        timeZone: displayTz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date(iso)),
    [displayTz, language],
  );

  const formatDay = useMemo(
    () => (instant: string) =>
      new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: displayTz,
      }).format(new Date(instant)),
    [displayTz, language],
  );

  const formatZoneLabel = useMemo(
    () => (zone: string) =>
      new Intl.DateTimeFormat('en-GB', { timeZone: zone, timeZoneName: 'short' })
        .formatToParts(new Date())
        .find((part) => part.type === 'timeZoneName')?.value ?? zone,
    [],
  );

  const formatFull = useMemo(
    () => (iso: string) =>
      new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-GB', {
        timeZone: displayTz,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date(iso)),
    [displayTz, language],
  );

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!slot) return;
    if (form.name.trim().length < 2) return setError(copy.errName);
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(form.email.trim())) return setError(copy.errEmail);
    if (form.topic.trim().length < 10) return setError(copy.errTopic);

    setBusy(true);
    setError(null);
    try {
      const response = await fetch('/api/call/bookings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          telegram: form.telegram,
          topic: form.topic,
          slotStart: slot,
          timeZone: visitorTz || undefined,
        }),
      });
      const payload = (await response.json()) as { id?: string; token?: string; error?: string };
      if (!response.ok || !payload.id || !payload.token) {
        setError(payload.error || copy.retryLater);
        if (response.status === 409) {
          setSlot(null);
          await loadAvailability();
        }
        return;
      }
      const next = { id: payload.id, token: payload.token };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setRecord(next);
      await refreshStatus(next);
    } catch {
      setError(copy.retryLater);
    } finally {
      setBusy(false);
    }
  }

  async function cancelRequest() {
    if (!record) return;
    setBusy(true);
    await fetch(`/api/call/bookings/${record.id}/cancel`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token: record.token }),
    }).catch(() => null);
    await refreshStatus(record);
    setBusy(false);
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    setRecord(null);
    setStatus(null);
    setSlot(null);
    void loadAvailability();
  }

  return (
    <main className="page-container section-spacing">
      <motion.section initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
        <span className="section-label">{copy.eyebrow}</span>
        <h1 className="heading-xl mt-4">{copy.title}</h1>
        {availability && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="mono-meta">
              {availability.durationMinutes} {copy.duration} · {copy.timezone}{' '}
              {displayTz} ({formatZoneLabel(displayTz || availability.timeZone)})
            </p>
            <button
              type="button"
              onClick={() => setShowOwnerTz((value) => !value)}
              className="chip !py-1"
            >
              {showOwnerTz ? copy.showMyTime : copy.showAzzarTime}
            </button>
            {guestWindow && (
              <button
                type="button"
                onClick={() => setShowAllTimes((value) => !value)}
                className={`chip !py-1 ${showAllTimes ? '' : 'border-accent text-accent'}`}
              >
                {showAllTimes
                  ? copy.comfortOnly
                  : `${copy.showAllTimes} (${guestWindow.startHour}:00–${guestWindow.endHour}:00)`}
              </button>
            )}
          </div>
        )}
        <p className="text-body mt-6 max-w-xl">{copy.intro}</p>
      </motion.section>

      {record && status ? (
        <motion.section initial="hidden" animate="visible" variants={fadeUp} className="max-w-xl mt-14">
          <div ref={statusRef} className="card-surface p-8 space-y-5 scroll-mt-28">
            <div className="flex items-center gap-3">
              {status.status === 'confirmed' ? (
                <Check size={18} className="text-accent" />
              ) : status.status === 'pending' ? (
                <Loader2 size={18} className="text-accent animate-spin" />
              ) : (
                <X size={18} className="text-accent" />
              )}
              <h2 className="heading-md">
                {status.status === 'pending' && copy.pendingTitle}
                {status.status === 'confirmed' && copy.confirmedTitle}
                {status.status === 'cancelled' && copy.cancelled}
                {status.status === 'declined' && copy.declined}
                {status.status === 'expired' && copy.expired}
              </h2>
            </div>

            <div className="flex items-center gap-2.5 mono-meta">
              <Calendar size={13} className="text-accent" />
              {formatFull(status.slotStart)}
              {ownerTz && displayTz && ownerTz !== displayTz && (
                <span className="text-text-2">
                  ({new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-GB', {
                    timeZone: ownerTz,
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }).format(new Date(status.slotStart))} Azzar)
                </span>
              )}
            </div>

            {status.status === 'pending' && <p className="text-sm-body">{copy.pendingBody}</p>}

            {status.status === 'confirmed' && status.callLink && (
              <div className="space-y-4">
                <p className="text-sm-body">
                  {status.meetLink ? copy.confirmedBody : copy.confirmedBodyRoom}
                </p>
                <a href={status.callLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-between !py-4">
                  <span className="flex items-center gap-3">
                    <Video size={16} /> {status.meetLink ? copy.join : copy.joinRoom}
                  </span>
                  <Send size={16} />
                </a>
                <a
                  href={`/api/call/bookings/${record.id}/ics?token=${record.token}`}
                  className="btn-ghost w-full justify-between !py-4"
                >
                  <span className="flex items-center gap-3"><Download size={16} /> {copy.calendar}</span>
                </a>
              </div>
            )}

            {(status.status === 'pending' || status.status === 'confirmed') && (
              <button onClick={cancelRequest} disabled={busy} className="btn-ghost w-full justify-center !py-3 disabled:opacity-50">
                {copy.cancel}
              </button>
            )}

            {status.status !== 'pending' && status.status !== 'confirmed' && (
              <button onClick={reset} className="btn-primary w-full justify-center !py-3">
                {copy.newRequest}
              </button>
            )}
          </div>
        </motion.section>
      ) : (
        <section className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div className="card-surface p-6 md:p-8 space-y-6">
            {loadError && <p className="text-sm-body">{loadError}</p>}
            {!availability && !loadError && <p className="mono-meta animate-pulse">…</p>}
            {availability && days.length === 0 && <p className="text-sm-body">{copy.empty}</p>}

            {availability && days.length > 0 && visibleDays.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm-body">{copy.noneInWindow}</p>
                <button type="button" onClick={() => setShowAllTimes(true)} className="chip border-accent text-accent">
                  {copy.showAllTimes}
                </button>
              </div>
            )}
            {visibleDays.length > 0 && (
              <>
                <div className="space-y-3">
                  <span className="mono-meta">{copy.pickDay}</span>
                  <div className="flex flex-wrap gap-2">
                    {visibleDays.map((day, index) => (
                      <button
                        key={day.date}
                        type="button"
                        onClick={() => {
                          setDayIndex(index);
                          setSlot(null);
                        }}
                        className={`chip ${index === dayIndex ? 'border-accent text-accent' : ''}`}
                      >
                        {formatDay(day.first)}
                      </button>
                    ))}
                  </div>
                </div>

                {activeDay && (
                  <div className="space-y-3">
                    <span className="mono-meta">{copy.pickTime}</span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {activeDay.slots.map((option) => (
                        <button
                          key={option.start}
                          type="button"
                          onClick={() => setSlot(option.start)}
                          className={`input-field text-center !py-2 font-mono text-xs transition-colors ${
                            slot === option.start ? 'border-accent text-accent' : 'hover:border-accent/50'
                          }`}
                        >
                          {formatTime(option.start)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-border flex items-center gap-2.5">
                  <Clock size={14} className="text-accent" />
                  <span className="mono-meta">
                    {availability?.minLeadHours}h notice · {activeDay ? `${activeDay.slots.length} slots` : ''}
                  </span>
                </div>
              </>
            )}
          </div>

          <form onSubmit={submit} className="card-surface p-6 md:p-8 space-y-4">
            <h2 className="heading-md">{copy.details}</h2>

            <label className="block space-y-2">
              <span className="mono-meta">{copy.name}</span>
              <input
                className="input-field w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="mono-meta">{copy.email}</span>
              <input
                className="input-field w-full"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="mono-meta">{copy.telegram}</span>
              <input
                className="input-field w-full"
                value={form.telegram}
                onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                placeholder="@username"
              />
            </label>

            <label className="block space-y-2">
              <span className="mono-meta">{copy.topic}</span>
              <textarea
                className="input-field w-full min-h-28 resize-y"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                required
              />
              <span className="mono-meta block">{copy.topicHint}</span>
            </label>

            {error && <p className="text-xs text-accent">{error}</p>}

            <button type="submit" disabled={!slot || busy} className="btn-primary w-full justify-between !py-4 disabled:opacity-40">
              <span>{busy ? copy.submitting : copy.submit}</span>
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
