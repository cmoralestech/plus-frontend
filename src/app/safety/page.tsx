import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Safety & Verification: How Plus Protects You",
  description: "Verified profiles, real moderation, and privacy controls that actually work. How Plus keeps you safe, plus tips for meeting someone new.",
  alternates: { canonical: "https://meetyourplus.com/safety" },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const dark2 = "#FFFBF7";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

export default function SafetyPage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      <section className="px-6 md:px-12 pt-12 md:pt-20 pb-16 max-w-4xl">
        <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>Safety</p>
        <h1 className="text-4xl md:text-5xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Your safety is non-negotiable.
        </h1>
        <div className="space-y-4 text-base leading-relaxed" style={{ color: creamMuted }}>
          <p>
            Plus is built with safety at its core. Here&apos;s how we protect our community and how you can protect yourself.
          </p>
          <p>
            Sugar dating requires a higher standard of trust than conventional dating apps.
            You are meeting people you don&apos;t know, often in contexts that involve financial
            expectations and personal vulnerability. We take that responsibility seriously.
            Every feature on this platform — from verification to privacy controls to our
            moderation protocols — exists because someone in our community needed it to feel safe.
          </p>
          <p>
            Unlike platforms that treat safety as a checkbox or marketing feature, we invested
            in real infrastructure: a dedicated trust and safety team that reviews reports within
            hours, automated scanning for known exploitation patterns, cooperation protocols with
            law enforcement, and privacy tools that give you control over exactly who sees your
            profile, your photos, and your activity. Safety on Plus is not optional — it is
            the foundation everything else is built on.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-4xl">
        <div className="space-y-16">
          <div>
            <h2 className="text-2xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>Platform safety features</h2>
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: creamMuted }}>
              <div>
                <h3 className="text-base font-medium mb-2" style={{ color: cream }}>Verification</h3>
                <p>We require photo verification and income verification to confirm that members are who they say they are. Photo verification uses a live selfie matched against your profile photos through AI-powered facial recognition — no stock photos, no stolen images, no catfishing. Income verification requires successful members to submit financial documents that are reviewed by a human team member, confirming their stated earnings are accurate. Verified badges are displayed prominently on profiles so you can see at a glance who has been confirmed. This dual verification system means the person you are talking to is real, looks like their photos, and has the financial means they claim.</p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2" style={{ color: cream }}>Block & report</h3>
                <p>You can block any member at any time. Blocked members cannot see your profile, message you, or interact with you in any way. Reports are reviewed by our team within 24 hours.</p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2" style={{ color: cream }}>Privacy controls</h3>
                <p>Hide your profile from search, blur your photos for non-matches, hide your income details, and enable private browsing. You control exactly who sees what.</p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2" style={{ color: cream }}>Message controls</h3>
                <p>You decide who you engage with. Block any member instantly, and they lose all access to your profile and messages. Our moderation team reviews every report within 24 hours.</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>Safety tips for meeting in person</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
              <p><strong style={{ color: cream }}>Meet in public.</strong> For your first meeting, always choose a public place, a restaurant, hotel lobby, or coffee shop. Never go to a private location for a first date.</p>
              <p><strong style={{ color: cream }}>Tell someone.</strong> Let a trusted friend or family member know where you&apos;re going, who you&apos;re meeting, and when you expect to be back. Share your live location if possible.</p>
              <p><strong style={{ color: cream }}>Arrange your own transportation.</strong> Drive yourself or use a rideshare. Don&apos;t rely on your date for transportation, especially for the first meeting.</p>
              <p><strong style={{ color: cream }}>Trust your instincts.</strong> If something feels off, leave. You don&apos;t owe anyone an explanation. Your safety is more important than being polite.</p>
              <p><strong style={{ color: cream }}>Protect your finances.</strong> Never send money to someone you haven&apos;t met in person. Legitimate connections don&apos;t require financial deposits, fees, or upfront payments.</p>
              <p><strong style={{ color: cream }}>Video chat first.</strong> Consider a video call before meeting in person. It helps verify identity and builds comfort before committing to an in-person date.</p>
              <p><strong style={{ color: cream }}>Keep personal details private.</strong> Don&apos;t share your home address, workplace, or financial details until you&apos;ve built trust over multiple meetings.</p>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-6" style={{ fontFamily: "var(--font-display)" }}>Community guidelines</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: creamMuted }}>
              <p>Plus is a community for consenting adults to form mutually beneficial relationships. We do not tolerate:</p>
              <ul className="space-y-2 ml-4">
                <li>Harassment, threats, or abusive behavior</li>
                <li>Solicitation of prostitution or escort services</li>
                <li>Fraud, scams, or financial exploitation</li>
                <li>Fake profiles or impersonation</li>
                <li>Sharing explicit content without consent</li>
                <li>Minors on the platform (you must be 18+)</li>
                <li>Drug solicitation or illegal activity</li>
              </ul>
              <p>Violations result in immediate account suspension and potential reporting to law enforcement where appropriate. We do not issue warnings for serious violations — accounts engaged in fraud, exploitation, harassment, or illegal activity are terminated permanently on first offense. For less severe guideline violations (such as inappropriate language or minor boundary issues), members receive a warning and education about our policies before any suspension occurs.</p>
              <p>Our moderation team actively monitors the platform — not just responding to reports, but proactively scanning for patterns that indicate scams, exploitation, or coordinated abuse. We use automated systems to flag suspicious behavior (mass messaging identical content, rapid account creation patterns, known fraud indicators) and human reviewers to make final decisions. Every moderation action is logged, reviewed, and subject to appeal.</p>
            </div>
          </div>

          {/* Report Exploitation */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>Report exploitation</h2>
            <p className="text-sm mb-4" style={{ color: creamMuted }}>
              Plus has zero tolerance for human trafficking, sexual exploitation, or any form of abuse.
              If you suspect someone is being trafficked or exploited on this platform, report it immediately:
            </p>
            <ul className="space-y-2 text-sm" style={{ color: creamMuted }}>
              <li className="flex gap-3"><span style={{ color: gold }}>&bull;</span><span><strong style={{ color: cream }}>Emergency:</strong> Call 911</span></li>
              <li className="flex gap-3"><span style={{ color: gold }}>&bull;</span><span><strong style={{ color: cream }}>National Human Trafficking Hotline:</strong> <a href="tel:1-888-373-7888" style={{ color: gold }}>1-888-373-7888</a></span></li>
              <li className="flex gap-3"><span style={{ color: gold }}>&bull;</span><span><strong style={{ color: cream }}>FBI Tips:</strong> <a href="https://tips.fbi.gov" target="_blank" rel="noopener noreferrer" style={{ color: gold }}>tips.fbi.gov</a></span></li>
              <li className="flex gap-3"><span style={{ color: gold }}>&bull;</span><span><strong style={{ color: cream }}>Text:</strong> &quot;HELP&quot; to 233733 (BeFree)</span></li>
              <li className="flex gap-3"><span style={{ color: gold }}>&bull;</span><span><strong style={{ color: cream }}>NCMEC CyberTipline:</strong> <a href="https://www.cybertipline.org" target="_blank" rel="noopener noreferrer" style={{ color: gold }}>CyberTipline.org</a> or <a href="tel:1-800-843-5678" style={{ color: gold }}>1-800-843-5678</a></span></li>
              <li className="flex gap-3"><span style={{ color: gold }}>&bull;</span><span><strong style={{ color: cream }}>Plus Safety Team:</strong> <a href="mailto:safety@meetyourplus.com" style={{ color: gold }}>safety@meetyourplus.com</a></span></li>
            </ul>
          </div>

          {/* FOSTA/SESTA Compliance */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>Our compliance commitment</h2>
            <p className="text-sm mb-3" style={{ color: creamMuted }}>
              Plus complies with the Fight Online Sex Trafficking Act (FOSTA) and Stop Enabling Sex Traffickers Act (SESTA).
              We actively monitor content for prohibited solicitation, flag violations for human review, and cooperate fully with law enforcement investigations.
            </p>
            <p className="text-sm" style={{ color: creamMuted }}>
              Any content that promotes or facilitates sex trafficking, prostitution, escort services, or exploitation is strictly prohibited and will result in immediate account termination and referral to authorities.
            </p>
          </div>

          {/* Need help */}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: "4rem" }}>
            <h2 className="text-2xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>Need help?</h2>
            <p className="text-sm mb-6" style={{ color: creamMuted }}>
              If you feel unsafe or need to report a concern, contact us at{" "}
              <a href="mailto:safety@meetyourplus.com" style={{ color: gold }}>safety@meetyourplus.com</a>.
              In case of emergency, always contact local law enforcement first.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium transition-colors"
              style={{ background: gold, color: dark1 }}
            >
              Contact our team
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
