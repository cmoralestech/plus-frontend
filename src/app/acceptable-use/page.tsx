import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Plus",
  description:
    "What is and isn't allowed on Plus: minimum age, prohibited content and conduct, and how we enforce it. Applies to every member.",
  alternates: { canonical: "https://meetyourplus.com/acceptable-use" },
  openGraph: {
    title: "Acceptable Use Policy | Plus",
    description:
      "Age requirements, prohibited content and conduct, reporting, and enforcement on Plus.",
    url: "https://meetyourplus.com/acceptable-use",
    type: "website",
  },
};

const gold = "#C87F6E";
const dark1 = "#F5EDE4";
const cream = "#1A1A1A";
const creamMuted = "#8A7E76";
const line = "#E8DDD2";

const LAST_UPDATED = "2 August 2026";

/**
 * Sections map onto the categories payment processors and app stores ask a
 * dating platform to address explicitly. Keep them named plainly; a policy
 * that requires interpretation isn't much of a policy.
 */
const sections: { title: string; body: string[] }[] = [
  {
    title: "1. You must be 18 or older",
    body: [
      "Plus is strictly for adults. You must be at least 18 years old to create an account, and you must be old enough to form a binding contract where you live if that age is higher.",
      "We verify date of birth at registration and may ask for government-issued identification at any time. Accounts we believe belong to a minor are removed immediately and permanently, without appeal.",
      "If you believe a minor is using Plus, report the profile or email support@meetyourplus.com. We treat these reports as our highest priority.",
    ],
  },
  {
    title: "2. Child sexual exploitation and abuse — zero tolerance",
    body: [
      "We prohibit any content, conduct, or communication that sexualises a minor. This includes imagery, text, solicitation, grooming, and any attempt to arrange contact with a minor.",
      "There is no warning and no appeal for this category. Accounts are removed permanently, and we report to the National Center for Missing & Exploited Children (NCMEC) and to law enforcement as required by law. We preserve relevant records for those investigations.",
    ],
  },
  {
    title: "3. No sexually explicit profile content",
    body: [
      "Profile photos, headlines, bios, prompt answers, and public fields must not contain nudity, sexual acts, genitalia, or sexually explicit descriptions. Profiles are a public surface and are held to that standard.",
      "Content that violates this is removed. Repeat violations lead to suspension and then permanent removal.",
    ],
  },
  {
    title: "4. No sexual violence, coercion, or non-consensual content",
    body: [
      "We prohibit content or conduct that depicts, threatens, promotes, or trivialises sexual violence, coercion, or non-consensual sexual activity.",
      "Sharing intimate images of another person without their consent — including images shared with you privately — is prohibited and may be a criminal offence. So is threatening to do so.",
      "Consent is required for every interaction on and off the platform. Pressuring, threatening, or manipulating another member into contact of any kind is grounds for removal.",
    ],
  },
  {
    title: "5. No commercial sexual services, trafficking, or exploitation",
    body: [
      "Plus is not an escort service and must not be used as one. We prohibit offering, soliciting, or arranging sexual acts in exchange for money, goods, or other consideration.",
      "We prohibit any facilitation of human trafficking or sex trafficking, including recruiting, advertising, harbouring, transporting, or profiting from another person's commercial sexual activity.",
      "This applies regardless of how it is worded. Coded language, indirect references, and off-platform redirection are treated the same as explicit solicitation.",
      "We report suspected trafficking to law enforcement and cooperate fully with investigations.",
    ],
  },
  {
    title: "6. No scams, fraud, or financial exploitation",
    body: [
      "We prohibit any attempt to defraud another member. That includes romance scams, advance-fee requests, fake emergencies, cryptocurrency or investment solicitation, phishing, and requests for banking credentials, gift cards, or remote access to devices.",
      "Impersonating another person, using another person's photographs, or misrepresenting your identity, age, or circumstances is prohibited.",
      "Never send money or financial information to someone you have not met. Report anyone who asks.",
    ],
  },
  {
    title: "7. No illegal activity",
    body: [
      "You may not use Plus to commit, arrange, promote, or facilitate any illegal act, including the sale or distribution of controlled substances, weapons, stolen goods, or counterfeit items.",
      "You are responsible for complying with the laws that apply where you live and where you travel.",
    ],
  },
  {
    title: "8. No harassment, hate, or threats",
    body: [
      "We prohibit harassment, stalking, threats of violence, and the deliberate targeting of a member after they have disengaged.",
      "We prohibit content attacking people on the basis of race, ethnicity, national origin, religion, disability, disease, age, sex, gender identity, or sexual orientation.",
      "Declining someone is always allowed. Punishing them for declining you is not.",
    ],
  },
  {
    title: "9. Your account is yours alone",
    body: [
      "Do not share, sell, or transfer your account. Do not create accounts on behalf of others, operate multiple accounts to evade enforcement, or use automation to interact with members.",
      "Do not scrape the platform or collect member information for use elsewhere.",
    ],
  },
];

export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen" style={{ background: dark1, color: cream }}>
      <PublicNav />

      <article className="px-6 md:px-12 pt-10 md:pt-16 pb-20 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: gold }}>
          Policy
        </p>
        <h1
          className="text-3xl md:text-4xl font-normal leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Acceptable Use Policy
        </h1>
        <p className="text-base leading-relaxed" style={{ color: creamMuted }}>
          This policy sets out what is and isn&apos;t allowed on Plus. It applies to
          every member, everywhere on the platform — profiles, photos, messages,
          and any conduct connected to your use of the service. Breaking it can
          cost you your account.
        </p>
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
              Reporting and enforcement
            </h2>
            <p className="text-[15px] leading-relaxed mb-3" style={{ color: creamMuted }}>
              Every profile and conversation can be reported from within the app.
              Reports are reviewed by a person, not only by automated tooling. You
              can also email{" "}
              <a href="mailto:support@meetyourplus.com" style={{ color: gold }}>
                support@meetyourplus.com
              </a>
              .
            </p>
            <p className="text-[15px] leading-relaxed mb-3" style={{ color: creamMuted }}>
              Depending on severity we may remove content, restrict features,
              suspend an account, or remove it permanently. Child sexual
              exploitation, trafficking, and credible threats of violence result in
              immediate permanent removal and a report to law enforcement.
            </p>
            <p className="text-[15px] leading-relaxed" style={{ color: creamMuted }}>
              Most enforcement decisions can be appealed and are answered by a human
              — see{" "}
              <Link href="/moderation" style={{ color: gold }}>
                how moderation works
              </Link>
              . The categories above that carry no appeal are named as such.
            </p>
          </section>

          <section style={{ borderTop: `1px solid ${line}`, paddingTop: "2rem" }}>
            <h2
              className="text-lg md:text-xl font-medium mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Related
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: creamMuted }}>
              <Link href="/terms" style={{ color: gold }}>Terms of Service</Link>
              {" · "}
              <Link href="/privacy" style={{ color: gold }}>Privacy Policy</Link>
              {" · "}
              <Link href="/safety" style={{ color: gold }}>Safety</Link>
              {" · "}
              <Link href="/moderation" style={{ color: gold }}>Moderation</Link>
            </p>
          </section>
        </div>
      </article>

      <PublicFooter />
    </div>
  );
}
