import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Terms of Service | Plus",
  description: "Terms of Service for Plus. What you agree to when you use the platform, including FOSTA/SESTA compliance and community guidelines.",
  alternates: { canonical: "https://meetyourplus.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mt-6 mb-2">Terms of Service</h1>
        <p className="text-sm text-muted mb-8">Last updated: June 7, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By creating an account or using Plus (&quot;the Service&quot;), operated by Plus LLC (&quot;we,&quot; &quot;us,&quot; or &quot;the Company&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Eligibility</h2>
            <p>You must be at least 18 years old to use Plus. By using the Service, you represent and warrant that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are at least 18 years of age</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You are not a person barred from using the Service under the laws of the United States or any other applicable jurisdiction</li>
              <li>You are not required to register as a sex offender in any jurisdiction</li>
              <li>You have not been previously removed from the Service by us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Nature of the Service</h2>
            <p>Plus is an online dating platform that facilitates introductions between consenting adults. <strong>Plus is not an escort service and does not facilitate, promote, or tolerate commercial sexual services, sex trafficking, or any form of exploitation.</strong></p>
            <p>The Service is designed for people seeking genuine dating relationships where expectations about lifestyle and finances are communicated openly. Any connection formed through the Service is between the individuals involved and is their sole responsibility.</p>
            <p>We do not guarantee any specific outcome, match, or connection. We are not a party to any agreement between users.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Account Registration</h2>
            <p>You agree to provide accurate, current, and complete information during registration. You are responsible for safeguarding your password and for all activities under your account. You must notify us immediately of any unauthorized use.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. User Conduct</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Engage in, solicit, promote, or facilitate any illegal activity</li>
              <li><strong>Offer, solicit, or engage in commercial sexual services or escort services</strong></li>
              <li><strong>Engage in, facilitate, or promote human trafficking, sexual exploitation, or the exploitation of minors in any form</strong></li>
              <li>Harass, abuse, stalk, or threaten other users</li>
              <li>Post false, misleading, or fraudulent information</li>
              <li>Solicit money from other users through deception or fraud</li>
              <li>Create multiple accounts or impersonate another person</li>
              <li>Upload content that is illegal, harmful, or violates third-party rights</li>
              <li>Use automated systems (bots, scrapers) to access the Service</li>
              <li>Attempt to circumvent any security or access controls</li>
              <li>Use the Service if you are under 18 years old</li>
            </ul>
            <p>Violation of these rules will result in immediate account termination and may be reported to law enforcement.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. FOSTA/SESTA Compliance</h2>
            <p>In accordance with the Allow States and Victims to Fight Online Sex Trafficking Act (FOSTA) and the Stop Enabling Sex Traffickers Act (SESTA), Plus has zero tolerance for any content or activity that facilitates sex trafficking or commercial sexual exploitation.</p>
            <p>We actively monitor the platform for prohibited activity and cooperate fully with law enforcement investigations. If you believe someone is being trafficked or exploited on this platform, please:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Report the profile immediately using our in-app reporting tools</li>
              <li>Contact the National Human Trafficking Hotline: <strong>1-888-373-7888</strong></li>
              <li>Contact the FBI at <strong>tips.fbi.gov</strong></li>
              <li>Email us directly at <span className="text-accent">safety@meetyourplus.com</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Content</h2>
            <p>You retain ownership of content you post. By posting content, you grant Plus a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute your content in connection with the Service.</p>
            <p>You are solely responsible for the content you post and represent that you have the right to post it. We may remove content that violates these Terms without notice.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. DMCA / Copyright</h2>
            <p>If you believe content on Plus infringes your copyright, send a written notice to our designated DMCA agent at <a href="mailto:legal@meetyourplus.com" className="text-accent hover:underline">legal@meetyourplus.com</a> with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Identification of the copyrighted work</li>
              <li>Identification of the infringing material and its location on the Service</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief that the use is not authorized</li>
              <li>A statement under penalty of perjury that the information is accurate</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">9. Subscriptions and Payments</h2>
            <p>Plus offers free and paid subscription tiers. Paid subscriptions auto-renew unless cancelled before the renewal date. You may cancel at any time through your account settings or the applicable payment processor.</p>
            <p>Refunds are handled according to the applicable payment processor policies. Prices may change with 30 days notice. All fees are in US dollars unless otherwise stated.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">10. Safety and Assumption of Risk</h2>
            <p>Plus is not responsible for the conduct of users on or off the platform. <strong>You are solely responsible for your interactions with other users.</strong> We do not conduct criminal background checks on users.</p>
            <p>We strongly recommend:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Meeting in public places for initial dates</li>
              <li>Informing someone you trust about your plans</li>
              <li>Never sharing banking information with other users</li>
              <li>Reporting any suspicious or threatening behavior</li>
            </ul>
            <p>By using the Service, you acknowledge and assume the risks associated with meeting people online.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">11. Termination</h2>
            <p>We may suspend or terminate your account at any time for violations of these Terms, without prior notice or liability. You may delete your account at any time through the Settings page. Upon termination, your right to use the Service ceases immediately.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">12. Disclaimers</h2>
            <p>THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE MATCHES, CONNECTIONS, OR OUTCOMES.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">13. Limitation of Liability</h2>
            <p>TO THE FULLEST EXTENT PERMITTED BY LAW, PLUS LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING FROM YOUR USE OF THE SERVICE.</p>
            <p>OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">14. Dispute Resolution and Arbitration</h2>
            <p>Any dispute arising from these Terms or your use of the Service shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. Arbitration shall take place in the state of Florida.</p>
            <p><strong>You agree to resolve disputes individually and waive any right to bring claims as a class action, class arbitration, or representative action.</strong></p>
            <p>Either party may seek injunctive relief in a court of competent jurisdiction to prevent irreparable harm pending arbitration.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">15. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of the State of Florida, United States, without regard to conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">16. Changes to Terms</h2>
            <p>We may update these Terms from time to time. We will notify you of material changes via email or in-app notification at least 30 days before they take effect. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">17. Severability</h2>
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">18. Contact</h2>
            <p>Questions about these Terms? Contact us at:</p>
            <p><a href="mailto:legal@meetyourplus.com" className="text-accent hover:underline">legal@meetyourplus.com</a></p>
          </section>
        </div>

      </div>
      <PublicFooter />
    </div>
  );
}
