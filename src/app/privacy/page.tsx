import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Azzar Budiyanto',
  description:
    'How glassgallery.my.id handles personal data: what the call booking form collects, where it is stored, who processes it, and how to have it removed.',
  alternates: { canonical: 'https://glassgallery.my.id/privacy' },
};

const UPDATED = '13 November 2026';

export default function PrivacyPage() {
  return (
    <main className="page-container section-spacing">
      <article className="max-w-3xl space-y-8">
        <header className="space-y-4">
          <span className="section-label">Legal</span>
          <h1 className="heading-lg">Privacy Policy</h1>
          <p className="mono-meta">Last updated {UPDATED}</p>
        </header>

        <section className="space-y-3">
          <h2 className="heading-md">Who is responsible</h2>
          <p className="text-body">
            This site, <strong>glassgallery.my.id</strong>, is operated by Azzar Budiyanto, based in
            Indonesia. For anything related to this policy or your data, write to{' '}
            <a className="text-accent" href="mailto:azzar@glassgallery.my.id">
              azzar@glassgallery.my.id
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">What I collect</h2>
          <p className="text-body">
            The only personal data collected on this site comes from the <strong>call booking form</strong>:
          </p>
          <ul className="text-body list-disc pl-5 space-y-2">
            <li>your name;</li>
            <li>your email address;</li>
            <li>your Telegram username, if you choose to provide it;</li>
            <li>the topic you describe, and the time slot you selected;</li>
            <li>a one-way hash of your IP address, used solely to rate-limit abuse.</li>
          </ul>
          <p className="text-body">
            No analytics, advertising, or tracking scripts are loaded. Your browser stores your
            booking identifier in local storage so the confirmation page can find your request
            again; you can clear it at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Why I use it</h2>
          <p className="text-body">
            To schedule, confirm, reschedule, or cancel a call you asked for, and to reply to you
            about it. Nothing else. Your data is not sold, rented, or used for marketing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Where it goes</h2>
          <p className="text-body">
            Bookings are stored in a Cloudflare D1 database operated by Cloudflare, Inc. Delivering
            a confirmed call involves the following processors:
          </p>
          <ul className="text-body list-disc pl-5 space-y-2">
            <li>
              <strong>Google Calendar / Google Meet</strong> — a calendar event is created and an
              invitation is emailed to you. Google receives your name, email address, and the call
              topic.
            </li>
            <li>
              <strong>Resend</strong> — sends the confirmation email from
              <code className="mx-1">mema@glassgallery.my.id</code>.
            </li>
            <li>
              <strong>Telegram</strong> — if you supply a username, it is included in the internal
              notification that reaches me. Messages to you are only sent if you contact that bot
              yourself.
            </li>
            <li>
              <strong>Netlify</strong> — hosts this website.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Google user data</h2>
          <p className="text-body">
            A separate, private integration lets me read my own Google Calendar, Gmail, and Drive
            through Google APIs, strictly to run my own scheduling and correspondence. That access
            is granted by me, for my account, and is never used to access data belonging to visitors
            of this site. This site does not ask you to sign in with Google, and it never receives
            your Google data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">How long it is kept</h2>
          <p className="text-body">
            Booking records are kept while the call is upcoming and for up to 12 months afterwards
            for accounting and reference. Unconfirmed requests expire automatically after 12 hours.
            You can ask for earlier deletion at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Your choices</h2>
          <p className="text-body">
            Write to{' '}
            <a className="text-accent" href="mailto:azzar@glassgallery.my.id">
              azzar@glassgallery.my.id
            </a>{' '}
            to request a copy of your booking data, correction of it, or its deletion. Deletion
            removes the booking record and cancels the calendar event. Requests are handled within
            30 days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Security</h2>
          <p className="text-body">
            Traffic is served over HTTPS. Access to the booking database is limited to a private API
            protected by a bearer token, and administrative actions are signed with an expiry. No
            system is perfect; if you believe data has been exposed, contact me immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Changes</h2>
          <p className="text-body">
            Material changes to this policy will be published on this page with a new date. See also
            the{' '}
            <Link className="text-accent" href="/terms">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
