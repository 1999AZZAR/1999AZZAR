import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Azzar Budiyanto',
  description:
    'Terms covering use of glassgallery.my.id, the call booking feature, and the limits of what is promised.',
  alternates: { canonical: 'https://glassgallery.my.id/terms' },
};

const UPDATED = '13 November 2026';

export default function TermsPage() {
  return (
    <main className="page-container section-spacing">
      <article className="max-w-3xl space-y-8">
        <header className="space-y-4">
          <span className="section-label">Legal</span>
          <h1 className="heading-lg">Terms of Service</h1>
          <p className="mono-meta">Last updated {UPDATED}</p>
        </header>

        <section className="space-y-3">
          <h2 className="heading-md">Agreement</h2>
          <p className="text-body">
            By using <strong>glassgallery.my.id</strong> you agree to these terms. If you do not
            agree, please do not use the site. The operator is Azzar Budiyanto, Indonesia.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">What this site is</h2>
          <p className="text-body">
            A personal portfolio and a way to request a call. Nothing here is an offer of
            employment, a binding quotation, or professional advice. Pricing shown by the estimator
            is indicative and becomes binding only in a written agreement signed separately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Booking a call</h2>
          <ul className="text-body list-disc pl-5 space-y-2">
            <li>A submitted request is not a confirmed appointment until you receive a confirmation.</li>
            <li>Provide accurate details — the confirmation and calendar invitation are sent to the email you enter.</li>
            <li>Slots are offered subject to availability and may be withdrawn.</li>
            <li>You can cancel from your booking page at any time; I may also cancel, and will tell you why.</li>
            <li>Please do not submit requests on behalf of others without their consent.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Acceptable use</h2>
          <p className="text-body">
            Do not attempt to break, overload, scrape at volume, or gain unauthorised access to this
            site or its booking API; do not submit unlawful, abusive, or deceptive content; do not
            use the booking form to send unsolicited mail to third parties. Requests are rate-limited
            and abusive traffic may be blocked.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Calls and recordings</h2>
          <p className="text-body">
            Calls take place on Google Meet and are governed by Google&apos;s terms as well. Calls are
            not recorded unless both sides agree beforehand. Notes may be taken for the purpose of
            the work discussed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Intellectual property</h2>
          <p className="text-body">
            Text, images, and code on this site are mine unless credited otherwise. Client work
            remains governed by its own agreement. You may link to this site and quote short
            excerpts with attribution; do not republish content wholesale.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Availability and warranties</h2>
          <p className="text-body">
            The site is provided &quot;as is&quot;. I aim to keep it online and correct, but I do
            not warrant uninterrupted availability or fitness for a particular purpose. Third-party
            services (Google, Cloudflare, Resend, Netlify, Telegram) can fail independently.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Liability</h2>
          <p className="text-body">
            To the extent permitted by law, I am not liable for indirect or consequential loss
            arising from use of this site or from a call being rescheduled, cancelled, or disrupted.
            Nothing here limits rights you have under applicable consumer law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Privacy</h2>
          <p className="text-body">
            Handling of personal data is described in the{' '}
            <Link className="text-accent" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading-md">Changes and governing law</h2>
          <p className="text-body">
            These terms may be updated; the date above reflects the current version. They are
            governed by the laws of the Republic of Indonesia, with disputes handled in its courts.
          </p>
        </section>
      </article>
    </main>
  );
}
