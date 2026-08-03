import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Law Enforcement Guidelines | Plus",
  description:
    "How law enforcement can request records from Plus: legal process required, emergency disclosure, preservation requests, and where to serve.",
  alternates: { canonical: "https://meetyourplus.com/law-enforcement" },
  openGraph: {
    title: "Law Enforcement Guidelines | Plus",
    description:
      "Legal process, emergency disclosure requests, preservation, and service of process for Plus.",
    url: "https://meetyourplus.com/law-enforcement",
    type: "website",
  },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

const LAST_UPDATED = "2 August 2026";
const LE_EMAIL = "legal@meetyourplus.com";

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who these guidelines are for",
    body: [
      "This page is for law enforcement officers and government agencies seeking records from Plus. It explains what legal process we require, how to reach us, and what to expect.",
      "It is not legal advice, and it does not waive or limit any objection we may raise — including objections on grounds of jurisdiction, scope, or the rights of our members.",
      "If you are a member with a safety concern rather than an officer making a formal request, please use our safety and reporting channels instead.",
    ],
  },
  {
    title: "How to submit a request",
    body: [
      `Send requests to ${LE_EMAIL} from an official government email address. Attach the signed legal process as a PDF and include the requesting agency, officer name and badge or ID number, a direct callback number, and a response deadline.`,
      "Identify the account precisely. The registered email address is the most reliable identifier. A display name alone is usually not enough to identify an account with confidence.",
      "Requests may also be served by mail to: Plus, PO Box 911711, Houston, TX 77291, United States. Email is considerably faster.",
      "We acknowledge properly submitted requests, ordinarily within five business days. Emergency requests are handled far more quickly — see below.",
    ],
  },
  {
    title: "Legal process we require",
    body: [
      "We disclose member records only where we are legally required to, and only in response to process that is valid and properly served. As a United States provider we apply the Stored Communications Act (18 U.S.C. § 2701 et seq.).",
      "Basic subscriber information — such as the account email address, registration date, and recent IP addresses — requires a valid subpoena.",
      "Non-content records — such as account activity metadata and transaction logs — require a court order under 18 U.S.C. § 2703(d), or a search warrant.",
      "Content of communications — including private messages and photographs — requires a search warrant issued on probable cause by a court of competent jurisdiction.",
      "We do not accept requests informally, and we do not disclose records on the basis of a phone call, an email without process, or an assertion of urgency that does not meet the emergency standard below.",
    ],
  },
  {
    title: "Emergency disclosure requests",
    body: [
      "Where we believe in good faith that an emergency involving danger of death or serious physical injury requires disclosure without delay, we may disclose the information reasonably necessary to address that emergency, as permitted by 18 U.S.C. § 2702(b)(8) and § 2702(c)(4).",
      `Send emergency requests to ${LE_EMAIL} with "EMERGENCY DISCLOSURE REQUEST" in the subject line. Describe the nature of the emergency, the specific danger, the person at risk, and why the information sought will help address it.`,
      "We review emergency requests as a priority. Overuse of the emergency channel for non-emergencies delays genuine ones.",
    ],
  },
  {
    title: "Preservation requests",
    body: [
      "We will preserve records pending service of valid legal process, as provided by 18 U.S.C. § 2703(f). Preservation holds records as they exist at the time of the request; it does not disclose them.",
      "Preservation lasts 90 days and may be extended once for a further 90 days on request. If valid legal process is not served before the period ends, the preservation lapses.",
    ],
  },
  {
    title: "Records we may hold",
    body: [
      "Depending on the account, we may hold: the registered email address and account creation date; profile information the member entered; photographs uploaded to the account; messages exchanged on the platform; reports made by or about the account; and technical logs including IP addresses and timestamps.",
      "Payments are processed by Stripe. We do not store full card numbers or bank details, so requests for those records should be directed to the payment processor.",
      "Identity and financial verification is performed by third-party providers. We retain the outcome of a check, not the underlying documents, so we generally cannot produce a government ID or a bank statement.",
      "We do not retain records indefinitely. Data associated with a deleted account is removed, and once removed it cannot be produced.",
    ],
  },
  {
    title: "Notice to members",
    body: [
      "Our policy is to notify members of requests for their information before disclosure, so that they may seek to protect their rights, unless we are prohibited from doing so by law or court order, or unless we believe in good faith that notice would create a risk of injury to someone, or relates to child exploitation.",
      "If your request should be accompanied by a non-disclosure order, please include it. We will not withhold notice merely because a request asks us to.",
    ],
  },
  {
    title: "Child safety",
    body: [
      "We report apparent child sexual abuse material and apparent child sexual exploitation to the National Center for Missing & Exploited Children (NCMEC), as required by 18 U.S.C. § 2258A, and preserve the associated records for the resulting investigation.",
      "Investigators following up on a NCMEC CyberTipline report should reference the report number when contacting us.",
    ],
  },
  {
    title: "Requests from outside the United States",
    body: [
      "Plus is operated from the United States. Requests from authorities outside the US are ordinarily served through a Mutual Legal Assistance Treaty, letter rogatory, or another recognised mechanism of international cooperation.",
      "We may respond voluntarily to non-US requests for basic subscriber information where doing so is consistent with US law and our members' rights, but we are not obliged to.",
    ],
  },
  {
    title: "Costs and testimony",
    body: [
      "We may seek reimbursement for the costs of responding, as permitted by law, particularly for voluminous or burdensome requests.",
      "We do not provide expert testimony. Where a records custodian declaration is needed to authenticate a production, ask for one when you serve the request.",
    ],
  },
];

export default function LawEnforcementPage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      <article className="px-6 md:px-12 pt-10 md:pt-16 pb-20 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>
          Legal
        </p>
        <h1
          className="text-3xl md:text-4xl font-normal leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Law Enforcement Guidelines
        </h1>
        <p className="text-base leading-relaxed" style={{ color: creamMuted }}>
          How law enforcement and government agencies can request records from
          Plus, what legal process each type of record requires, and how to reach
          us in an emergency.
        </p>

        <div
          className="mt-6 p-4 rounded-lg text-sm leading-relaxed"
          style={{ background: "#FFFBF7", color: creamMuted, border: `1px solid ${line}` }}
        >
          <strong style={{ color: cream }}>Requests:</strong>{" "}
          <a href={`mailto:${LE_EMAIL}`} style={{ color: gold }}>
            {LE_EMAIL}
          </a>
          <br />
          <strong style={{ color: cream }}>Emergencies:</strong> same address, with{" "}
          <em>EMERGENCY DISCLOSURE REQUEST</em> in the subject line.
        </div>

        <p className="text-xs mt-4" style={{ color: creamMuted }}>
          Last updated {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-9" style={{ borderTop: `1px solid ${line}`, paddingTop: "2rem" }}>
          {sections.map((s) => (
            <section key={s.title}>
              <h2
                className="text-lg md:text-xl font-medium mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </h2>
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed mb-3"
                  style={{ color: creamMuted }}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section style={{ borderTop: `1px solid ${line}`, paddingTop: "2rem" }}>
            <h2
              className="text-lg md:text-xl font-medium mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Related
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: creamMuted }}>
              <Link href="/acceptable-use" style={{ color: gold }}>Acceptable Use Policy</Link>
              {" · "}
              <Link href="/privacy" style={{ color: gold }}>Privacy Policy</Link>
              {" · "}
              <Link href="/terms" style={{ color: gold }}>Terms of Service</Link>
              {" · "}
              <Link href="/safety" style={{ color: gold }}>Safety</Link>
            </p>
          </section>
        </div>
      </article>

      <PublicFooter />
    </div>
  );
}
