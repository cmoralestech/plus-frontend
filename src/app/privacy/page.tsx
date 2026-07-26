import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Plus",
  description: "What data Plus collects, how we use it, and your rights. We don't sell your information. Ever.",
  alternates: { canonical: "https://meetyourplus.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mt-6 mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted mb-4">Last updated: June 2026</p>
        <p className="text-sm text-foreground/80 leading-relaxed mb-8">
          At Plus, privacy is not a legal obligation we grudgingly fulfill — it is a core
          product value. Many of our members are professionals, executives, and public figures
          who need absolute discretion. This policy explains in plain language what data we collect,
          why we collect it, how we protect it, and what controls you have over your information.
          We do not sell your personal data to advertisers, data brokers, or any third party. We
          never will.
        </p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p><strong>Account information:</strong> Email address, password, date of birth, gender, user type.</p>
            <p><strong>Profile information:</strong> Display name, photos, bio, occupation, education, location, interests, arrangement preferences, and other profile fields you choose to provide.</p>
            <p><strong>Usage data:</strong> How you interact with the Service, including profiles viewed, likes, matches, messages sent, and features used.</p>
            <p><strong>Device data:</strong> IP address, browser type, operating system, and device identifiers.</p>
            <p><strong>Location data:</strong> City and coordinates if you grant location permission or set a travel destination.</p>
            <p><strong>Payment data:</strong> Processed securely by Stripe. We do not store credit card numbers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide and improve the Service</li>
              <li>Match you with other users based on preferences</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send notifications about matches, messages, and account activity</li>
              <li>Enforce our Terms of Service and protect user safety</li>
              <li>Analyze usage patterns to improve the product</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Information Sharing</h2>
            <p>We do not sell your personal information. We share data only in these cases:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Other users:</strong> Your profile information is visible to other users according to your privacy settings</li>
              <li><strong>Service providers:</strong> Payment processing (Stripe), hosting, analytics</li>
              <li><strong>Legal requirements:</strong> When required by law, court order, or to protect safety</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Your Privacy Controls</h2>
            <p>You can control your privacy through Settings:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hide your profile from discovery</li>
              <li>Blur photos for non-matches (Premium)</li>
              <li>Hide income information (Premium)</li>
              <li>Hide online status and last seen</li>
              <li>Enable private browsing (Diamond)</li>
              <li>Control email and push notification preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Data Retention</h2>
            <p>We retain your data while your account is active. When you deactivate your account, your profile is hidden but data is retained for 30 days in case you reactivate. After 30 days, we begin permanent deletion of your personal information, including profile data, photos, messages, and match history. Some data may be retained longer for legal compliance, fraud prevention, or to enforce our Terms of Service — for example, records of banned accounts are kept to prevent repeat offenders from creating new accounts.</p>
            <p className="mt-2">Income verification documents are processed by our verification team and then deleted from our systems within 7 days of the verification decision. We retain only the verification result (verified/not verified) and the date of verification — not the underlying financial documents themselves. This minimizes our data footprint while maintaining the integrity of the verification system.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data (&quot;right to be forgotten&quot;)</li>
              <li>Export your data in a portable format</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:privacy@meetyourplus.com" className="text-accent hover:underline">privacy@meetyourplus.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Security</h2>
            <p>We implement industry-standard security measures including encryption in transit (TLS 1.3), hashed passwords (bcrypt with salt), and strict role-based access controls. All data at rest is encrypted. Our infrastructure runs on isolated, SOC 2-compliant cloud providers with regular security audits. Payment processing is handled entirely by Stripe, which maintains PCI DSS Level 1 certification — the highest level of payment security compliance available.</p>
            <p className="mt-2">We recognize that privacy in the dating space carries heightened importance. Beyond technical security, we implement operational practices designed for discretion: support staff access to user data is logged and auditable, billing statements use a discreet company name rather than &quot;Plus&quot; or anything dating-related, and we never contact members through channels other than their registered email or in-app notifications. No system is 100% secure, but we invest significantly in protecting your information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Cookies &amp; Tracking Technologies</h2>
            <p>We use essential cookies for authentication and session management. In addition, we use the following third-party tracking technologies to understand how visitors use our site and to measure the effectiveness of our marketing:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Google Analytics 4 (GA4):</strong> Collects anonymized usage data such as pages visited, session duration, and traffic sources. GA4 uses first-party cookies and IP anonymization to help us understand how visitors interact with our site so we can improve the experience.</li>
              <li><strong>Microsoft Clarity:</strong> Records anonymized session replays and generates heatmaps showing how visitors click, scroll, and navigate. This helps us identify usability issues and improve page layouts. Clarity does not collect personally identifiable information.</li>
              <li><strong>Meta Pixel (Facebook):</strong> Tracks conversions from our Meta advertising campaigns and enables remarketing to visitors who have interacted with our site. This pixel may set third-party cookies and share browsing data with Meta for ad targeting purposes.</li>
              <li><strong>Google Ads:</strong> Tracks conversions from our Google advertising campaigns and enables remarketing to visitors across the Google Display Network. This tag may set third-party cookies and share browsing data with Google for ad targeting purposes.</li>
            </ul>
            <p className="mt-2">When you first visit our site, non-essential tracking scripts (Meta Pixel, Microsoft Clarity, and Google Ads) are not loaded until you accept cookies via the consent banner. GA4 loads with analytics storage denied by default and only begins full tracking after you consent.</p>
            <p className="mt-2"><strong>How to opt out:</strong> You can decline non-essential cookies via the consent banner shown on your first visit. You can also opt out at any time by clearing your browser&apos;s localStorage (remove the &quot;cookie_consent&quot; key) and refreshing the page. Additionally, you can install browser extensions like Google Analytics Opt-out or adjust your browser&apos;s cookie settings to block third-party cookies. To request that we stop processing your data for advertising purposes, contact <a href="mailto:privacy@meetyourplus.com" className="text-accent hover:underline">privacy@meetyourplus.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">9. Children&apos;s Privacy</h2>
            <p>Plus is not intended for anyone under 18. We do not knowingly collect information from minors. If we learn a minor has created an account, we will terminate it immediately.</p>
          </section>

          <section id="ccpa">
            <h2 className="text-lg font-semibold text-foreground">10. California Privacy Rights (CCPA/CPRA)</h2>
            <p>If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) provide you with additional rights regarding your personal information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Right to know:</strong> You can request details about the categories and specific pieces of personal information we have collected about you, the sources of that information, and the purposes for which it is used.</li>
              <li><strong>Right to delete:</strong> You can request deletion of personal information we have collected from you, subject to certain legal exceptions.</li>
              <li><strong>Right to opt out of sale/sharing:</strong> We do not sell your personal information in the traditional sense. However, certain uses of advertising cookies (such as Meta Pixel and Google Ads remarketing tags) may constitute &quot;sharing&quot; of personal information under California law. You can opt out of this sharing by declining cookies via our consent banner, or by contacting us at the email below.</li>
              <li><strong>Right to non-discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights.</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, contact <a href="mailto:privacy@meetyourplus.com" className="text-accent hover:underline">privacy@meetyourplus.com</a> with the subject line &quot;CCPA Request.&quot; We will respond within 45 days as required by law.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">11. Changes</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of material changes via email or in-app notification.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">12. Contact</h2>
            <p>Privacy questions? Contact our Data Protection Officer at <a href="mailto:privacy@meetyourplus.com" className="text-accent hover:underline">privacy@meetyourplus.com</a></p>
          </section>
        </div>

      </div>
      <PublicFooter />
    </div>
  );
}
