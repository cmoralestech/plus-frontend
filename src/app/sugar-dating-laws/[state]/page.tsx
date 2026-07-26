import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

/* ─── State data ──────────────────────────────────────────────── */

interface StateData {
  name: string;
  slug: string;
  summary: string;
  prostitutionLaw: string;
  giftTaxNote: string;
  ageOfConsent: number;
  notablePoints: string[];
  faqs: { question: string; answer: string }[];
}

const STATES: Record<string, StateData> = {
  alabama: {
    name: "Alabama",
    slug: "alabama",
    summary: "Sugar dating is legal in Alabama. Consensual relationships between adults that involve gifts or financial support are not prohibited under Alabama law. The key distinction is between dating with generosity and prostitution, which Alabama defines as exchanging sex for a fee.",
    prostitutionLaw: "Alabama classifies prostitution as a Class A misdemeanor under Code of Alabama Section 13A-12-121. A first offense carries up to one year in jail and fines up to $6,000. Promoting prostitution is a Class B felony. Sugar dating is distinct because it involves a genuine relationship rather than a direct exchange of sex for payment.",
    giftTaxNote: "Alabama has no state gift tax. The federal gift tax exclusion of $19,000 per recipient per year (2026) applies. Gifts within a sugar dating relationship below this threshold require no reporting. Amounts above may require the giver to file a gift tax return, though no tax is typically owed until the lifetime exemption is exceeded.",
    ageOfConsent: 16,
    notablePoints: [
      "Alabama has no specific laws addressing sugar dating — it falls under normal consensual adult relationships",
      "The state distinguishes between companionship arrangements and prostitution based on whether there is an explicit exchange of sex for money",
      "Alabama's age of consent is 16, but Plus requires all members to be 18+",
      "Cohabitation between unmarried persons was decriminalized in Alabama in 2016"
    ],
    faqs: [
      { question: "Is sugar dating legal in Alabama?", answer: "Yes. Sugar dating is completely legal in Alabama. It is a consensual relationship between adults involving mutual benefits such as companionship, mentorship, and financial generosity. Alabama law does not prohibit adults from giving or receiving gifts within a dating relationship." },
      { question: "What is the difference between sugar dating and prostitution in Alabama?", answer: "The legal distinction is clear: prostitution involves an explicit agreement to exchange sexual acts for money. Sugar dating is a relationship that may include financial support, gifts, and mentorship alongside genuine companionship and connection. There is no quid pro quo exchange of sex for payment." },
      { question: "Can sugar daddy gifts be taxed in Alabama?", answer: "Alabama has no state gift tax. Federally, the giver may need to file a gift tax return for gifts exceeding $19,000 per year per recipient (2026 exclusion), but no tax is typically owed until the lifetime exemption of $13.99 million is exceeded. Recipients never owe tax on gifts received." },
      { question: "What is the age of consent in Alabama?", answer: "Alabama's age of consent is 16. However, Plus requires all members to be at least 18 years old, and we strongly recommend that all sugar dating participants be legal adults (18+) regardless of state age of consent laws." },
      { question: "Do I need a lawyer before sugar dating in Alabama?", answer: "While legal advice is always helpful, sugar dating in Alabama does not require legal counsel. As long as your relationship is between consenting adults and does not involve an explicit exchange of sex for money, you are operating within the law." }
    ],
  },
  alaska: {
    name: "Alaska",
    slug: "alaska",
    summary: "Sugar dating is legal in Alaska. Adults are free to engage in consensual relationships that include financial generosity and gifts. Alaska treats prostitution as a misdemeanor, but genuine dating relationships with financial elements are not subject to prosecution.",
    prostitutionLaw: "Alaska classifies prostitution as a Class B misdemeanor under Alaska Statute 11.66.100, carrying up to 90 days in jail and a $2,000 fine. Sex trafficking is a Class A felony. Sugar dating is legally distinct because it involves an ongoing relationship rather than a transactional exchange of sex for payment.",
    giftTaxNote: "Alaska has no state income tax and no state gift tax. Only the federal gift tax exclusion of $19,000 per recipient per year (2026) applies. Alaska's lack of state income tax means financial support received in a sugar dating relationship carries no state tax obligation for either party.",
    ageOfConsent: 16,
    notablePoints: [
      "Alaska has no state income tax, making financial arrangements simpler from a tax perspective",
      "The state's prostitution statute requires proof of an explicit exchange of sex for money — dating with generosity does not meet this threshold",
      "Alaska's small population means privacy is especially important; Plus's hidden profile features are valuable here",
      "Military bases in Alaska create a unique dating demographic with steady, verifiable incomes"
    ],
    faqs: [
      { question: "Is sugar dating legal in Alaska?", answer: "Yes. Sugar dating is legal in Alaska. Consensual relationships between adults that involve gifts, financial support, and mentorship are perfectly lawful. Alaska law only prohibits the explicit exchange of sexual acts for payment." },
      { question: "How does Alaska law define prostitution?", answer: "Under Alaska Statute 11.66.100, prostitution means engaging in or offering sexual conduct in return for a fee. Sugar dating does not meet this definition because it involves a genuine relationship, not a direct transactional exchange." },
      { question: "Are there tax benefits to sugar dating in Alaska?", answer: "Alaska has no state income tax, which means financial support received within a relationship has no state tax implications. Federal gift tax rules still apply — gifts over $19,000 per year per recipient may require the giver to file a return, but tax is rarely owed." },
      { question: "Is sugar dating common in Alaska?", answer: "While Alaska's population is smaller, sugar dating is active — particularly around Anchorage, Fairbanks, and among military personnel stationed at bases like JBER and Eielson. The oil and fishing industries also create high-earning individuals seeking connections." },
      { question: "What age do I need to be to sugar date in Alaska?", answer: "While Alaska's age of consent is 16, Plus requires all members to be at least 18. We strongly recommend all sugar dating participants be 18 or older regardless of state consent laws." }
    ],
  },
  arizona: {
    name: "Arizona",
    slug: "arizona",
    summary: "Sugar dating is legal in Arizona. Consensual adult relationships involving financial generosity are not prohibited under Arizona law. Arizona takes prostitution seriously with felony-level charges possible, making it important to understand the distinction between dating and illegal activity.",
    prostitutionLaw: "Arizona classifies prostitution as a Class 1 misdemeanor for a first offense under ARS 13-3214, carrying up to 6 months in jail. However, repeat offenses escalate to Class 5 and Class 4 felonies. Solicitation is also a Class 1 misdemeanor. Sugar dating remains legal because it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "Arizona has no state gift tax or estate tax. The federal gift tax exclusion of $19,000 per recipient per year (2026) applies. Arizona residents benefit from relatively low state income tax rates (2.5% flat rate), though gifts received are not considered taxable income at either the state or federal level.",
    ageOfConsent: 18,
    notablePoints: [
      "Arizona is one of the states where the age of consent is 18, aligning with Plus's membership requirement",
      "Repeat prostitution offenses in Arizona escalate to felonies — the clear distinction between dating and prostitution is especially important here",
      "Arizona's growing tech sector in Phoenix and Scottsdale has expanded the sugar dating market significantly",
      "The state's large retiree population in areas like Scottsdale and Paradise Valley includes many high-net-worth individuals"
    ],
    faqs: [
      { question: "Is sugar dating legal in Arizona?", answer: "Yes. Sugar dating is legal in Arizona. Consensual relationships between adults that include financial support, gifts, and companionship are lawful. Arizona law only prohibits explicit exchanges of sex for money." },
      { question: "Why is the prostitution distinction important in Arizona?", answer: "Arizona escalates prostitution charges to felonies for repeat offenses. This makes the distinction important: sugar dating is a genuine relationship with financial elements, not a transactional exchange of sex for money. As long as your arrangement is a real relationship, you are protected." },
      { question: "What is the age of consent in Arizona?", answer: "Arizona's age of consent is 18, one of the highest in the country. This aligns with Plus's requirement that all members be at least 18 years old." },
      { question: "Where is sugar dating most active in Arizona?", answer: "Scottsdale and Paradise Valley are the most active markets due to the concentration of wealth. Phoenix's growing tech and finance sectors, along with Tucson's university community, also contribute to an active scene." },
      { question: "Do sugar dating gifts count as income in Arizona?", answer: "No. Gifts are not taxable income for the recipient at either the federal or Arizona state level. Arizona has no gift tax. The giver may need to file a federal gift tax return for amounts over $19,000 per recipient per year, but typically owes no tax." }
    ],
  },
  arkansas: {
    name: "Arkansas",
    slug: "arkansas",
    summary: "Sugar dating is legal in Arkansas. Adults may freely engage in relationships that include financial generosity and gifts. Arkansas treats prostitution as a misdemeanor, and the law clearly distinguishes between genuine dating relationships and commercial sex work.",
    prostitutionLaw: "Arkansas classifies prostitution as a Class B misdemeanor under Arkansas Code 5-70-102, carrying up to 90 days in jail and a $1,000 fine. Promoting prostitution is a Class D felony. Sugar dating is distinct because it involves a consensual relationship, not an explicit agreement to exchange sex for money.",
    giftTaxNote: "Arkansas has no state gift tax. The state does have an income tax with rates up to 4.4%, but gifts received are not considered taxable income. The federal gift tax exclusion of $19,000 per recipient per year (2026) applies to the giver.",
    ageOfConsent: 16,
    notablePoints: [
      "Arkansas prostitution laws require proof of an explicit sex-for-money agreement — relationship-based arrangements are not covered",
      "The Walton family fortune (Walmart) has created significant wealth concentration in Northwest Arkansas",
      "Little Rock and Bentonville are the primary markets for sugar dating in the state",
      "Arkansas has no state gift tax, simplifying the financial aspects of generous dating"
    ],
    faqs: [
      { question: "Is sugar dating legal in Arkansas?", answer: "Yes. Sugar dating is fully legal in Arkansas. Relationships between consenting adults that include financial support, gifts, and mentorship are lawful. Only explicit exchanges of sex for money violate Arkansas law." },
      { question: "How does Arkansas define prostitution?", answer: "Under Arkansas Code 5-70-102, prostitution means engaging in or offering to engage in sexual activity for a fee. Sugar dating involves genuine companionship and connection — not a transactional exchange — so it does not fall under this statute." },
      { question: "Is there a gift tax in Arkansas?", answer: "Arkansas has no state gift tax. Federal rules apply: gifts over $19,000 per recipient per year (2026) may require the giver to file a return, but recipients never owe tax on gifts. Most sugar dating financial support falls comfortably within these limits." },
      { question: "What is the age of consent in Arkansas?", answer: "Arkansas's age of consent is 16. However, Plus requires all members to be at least 18 years old, and we recommend all sugar dating participants be 18+ regardless of state law." },
      { question: "Where is sugar dating popular in Arkansas?", answer: "Northwest Arkansas (Bentonville, Fayetteville) has the highest concentration of wealth thanks to Walmart, Tyson, and J.B. Hunt headquarters. Little Rock is the next most active market." }
    ],
  },
  california: {
    name: "California",
    slug: "california",
    summary: "Sugar dating is legal in California. As the nation's most populous state with enormous wealth concentration in tech, entertainment, and finance, California has one of the most active sugar dating markets in the country. The state's prostitution laws are clear, and genuine dating relationships are fully protected.",
    prostitutionLaw: "California classifies prostitution and solicitation as misdemeanors under Penal Code Section 647(b), carrying up to 6 months in jail and a $1,000 fine. California notably passed a law in 2019 (SB 233) providing immunity for sex workers reporting crimes. Sugar dating is distinct because it involves genuine relationships, not explicit sex-for-money transactions.",
    giftTaxNote: "California has no state gift tax, but has the highest state income tax rate (up to 13.3%). Gifts are not taxable income for recipients at either state or federal level. Regular financial support that resembles compensation (rather than gifts) could theoretically be scrutinized, so maintaining the genuine relationship nature of arrangements is important.",
    ageOfConsent: 18,
    notablePoints: [
      "California's age of consent is 18, matching Plus's membership requirement",
      "The state has the largest sugar dating market in the US, concentrated in LA, SF, San Diego, and Orange County",
      "California's progressive approach to sex work (SB 233) reflects evolving attitudes, though prostitution remains a misdemeanor",
      "Tech wealth in Silicon Valley and entertainment wealth in LA create two distinct but equally active sugar dating markets"
    ],
    faqs: [
      { question: "Is sugar dating legal in California?", answer: "Yes. Sugar dating is completely legal in California. Consensual relationships between adults involving gifts, financial support, and companionship are protected. California only prohibits the explicit exchange of sexual acts for money under Penal Code 647(b)." },
      { question: "How is sugar dating different from prostitution in California?", answer: "Prostitution under California law requires an explicit agreement to exchange sex for money. Sugar dating is a genuine relationship where financial generosity coexists with companionship, emotional connection, and dating. There is no direct quid pro quo exchange." },
      { question: "Where is sugar dating most popular in California?", answer: "Los Angeles and San Francisco are the two largest markets, followed by San Diego, Orange County, and Sacramento. The concentration of tech wealth in the Bay Area and entertainment/real estate wealth in LA make these natural hubs." },
      { question: "What about California income tax on sugar dating gifts?", answer: "Gifts are not taxable income in California despite the state's high income tax rates. The recipient owes no state or federal tax on genuine gifts. Only the giver may need to file a federal gift tax return for amounts over $19,000 per recipient per year." },
      { question: "What is the age of consent in California?", answer: "California's age of consent is 18 with no close-in-age exceptions for adults. This is one of the strictest in the nation and aligns perfectly with Plus's requirement that all members be 18+." }
    ],
  },
  colorado: {
    name: "Colorado",
    slug: "colorado",
    summary: "Sugar dating is legal in Colorado. The state has a relatively progressive legal framework, and consensual adult relationships involving financial generosity are fully protected. Colorado's prostitution statute requires a specific exchange agreement, which genuine dating relationships do not involve.",
    prostitutionLaw: "Colorado classifies prostitution as a Class 3 misdemeanor under CRS 18-7-201, carrying a fine of $50 to $750. This is notably one of the lightest penalties in the nation. Patronizing a prostitute is a Class 1 misdemeanor. Sugar dating is distinct because it involves real relationships rather than explicit payment for sex.",
    giftTaxNote: "Colorado has no state gift tax. The state income tax is a flat 4.4%. Gifts received in a sugar dating relationship are not taxable income at either state or federal level. The federal $19,000 annual exclusion (2026) applies to the giver.",
    ageOfConsent: 17,
    notablePoints: [
      "Colorado has some of the lightest prostitution penalties in the nation (Class 3 misdemeanor), reflecting a more progressive approach",
      "Denver and Boulder's tech scenes have created a new wave of young, wealthy professionals active in sugar dating",
      "Colorado's age of consent is 17 — Plus requires all members to be 18+",
      "The state's ski resort towns (Aspen, Vail) attract seasonal high-net-worth visitors who participate in sugar dating"
    ],
    faqs: [
      { question: "Is sugar dating legal in Colorado?", answer: "Yes. Sugar dating is legal in Colorado. The state permits consensual adult relationships that include financial generosity, gifts, and mentorship. Only explicit exchanges of sex for money violate Colorado law." },
      { question: "What are Colorado's prostitution penalties?", answer: "Prostitution in Colorado is a Class 3 misdemeanor with a maximum fine of $750 — one of the lightest in the nation. However, sugar dating is entirely separate from prostitution because it involves genuine relationships, not transactional exchanges." },
      { question: "Is the sugar dating scene active in Colorado?", answer: "Very active. Denver's growing tech and finance sectors, Boulder's entrepreneurial community, and the wealthy resort communities of Aspen and Vail all contribute to a robust sugar dating market." },
      { question: "Are sugar dating gifts taxable in Colorado?", answer: "No. Colorado has no gift tax, and gifts are not considered income under state or federal law. Recipients owe no tax on gifts received. The giver may need to file a federal return for gifts over $19,000 per recipient per year." },
      { question: "What is the age of consent in Colorado?", answer: "Colorado's age of consent is 17. Plus requires all members to be 18 or older, and we recommend this as the minimum for any sugar dating participation." }
    ],
  },
  connecticut: {
    name: "Connecticut",
    slug: "connecticut",
    summary: "Sugar dating is legal in Connecticut. As one of the wealthiest states per capita with significant concentrations of hedge fund managers and finance executives in Fairfield County, Connecticut has an active sugar dating scene. The state treats prostitution as a misdemeanor.",
    prostitutionLaw: "Connecticut classifies prostitution as a Class A misdemeanor under CGS Section 53a-82, carrying up to one year in jail and a $2,000 fine. Patronizing a prostitute is also a Class A misdemeanor. Sugar dating is legally distinct because it involves genuine dating relationships rather than explicit agreements to exchange sex for money.",
    giftTaxNote: "Connecticut is one of few states with its own gift tax, with rates up to 12% on gifts exceeding $13.99 million lifetime (matching the federal exemption as of 2026). For most sugar dating arrangements, this has no practical impact since the threshold is extremely high. There is no state tax on receiving gifts.",
    ageOfConsent: 16,
    notablePoints: [
      "Connecticut is one of few states with its own gift tax, though the threshold ($13.99M lifetime) affects almost no one",
      "Fairfield County (Greenwich, Stamford, Westport) has one of the highest concentrations of hedge fund wealth in the world",
      "The state's proximity to New York City means many wealthy Connecticut residents also participate in the NYC sugar dating market",
      "Connecticut's age of consent is 16 — Plus requires all members to be 18+"
    ],
    faqs: [
      { question: "Is sugar dating legal in Connecticut?", answer: "Yes. Sugar dating is fully legal in Connecticut. Consensual relationships between adults that include financial generosity are lawful. The state's prostitution statute only applies to explicit sex-for-money exchanges." },
      { question: "Does Connecticut have a gift tax?", answer: "Connecticut does have a state gift tax, but it only applies to lifetime giving above $13.99 million. For virtually all sugar dating arrangements, this has zero practical impact. Recipients never owe tax on gifts received." },
      { question: "Where is sugar dating most active in Connecticut?", answer: "Fairfield County — particularly Greenwich, Stamford, and Westport — is by far the most active due to the concentration of hedge fund and finance wealth. Hartford and New Haven also have active scenes." },
      { question: "What is the age of consent in Connecticut?", answer: "Connecticut's age of consent is 16. Plus requires all members to be at least 18 years old." },
      { question: "How does Connecticut's proximity to NYC affect sugar dating?", answer: "Many wealthy Connecticut residents commute to NYC and participate in both markets. Plus's location features let you connect with members across both areas seamlessly." }
    ],
  },
  delaware: {
    name: "Delaware",
    slug: "delaware",
    summary: "Sugar dating is legal in Delaware. The state's business-friendly environment and concentration of corporate wealth create an active dating scene. Delaware treats prostitution as a misdemeanor, and genuine adult relationships with financial components are fully legal.",
    prostitutionLaw: "Delaware classifies prostitution as an unclassified misdemeanor under Title 11 Section 1342, carrying up to 30 days in jail for a first offense. Subsequent offenses can carry up to one year. Patronizing a prostitute is also a misdemeanor. Sugar dating is legally distinct as it involves genuine relationships rather than transactional sex.",
    giftTaxNote: "Delaware has no state gift tax and no state sales tax. The state income tax tops out at 6.6%. Gifts received within a sugar dating relationship are not taxable income. The federal gift tax exclusion of $19,000 per recipient per year (2026) applies to the giver.",
    ageOfConsent: 18,
    notablePoints: [
      "Delaware's age of consent is 18, matching Plus's membership requirement",
      "Over 60% of Fortune 500 companies are incorporated in Delaware, creating a concentration of corporate executives",
      "The state's small size means the sugar dating market extends into Philadelphia and the broader tri-state area",
      "Delaware has no sales tax, making gift-giving and luxury experiences marginally more affordable"
    ],
    faqs: [
      { question: "Is sugar dating legal in Delaware?", answer: "Yes. Sugar dating is legal in Delaware. Consensual relationships between adults involving gifts and financial support are fully lawful. Delaware law only prohibits the explicit exchange of sexual acts for payment." },
      { question: "What is the age of consent in Delaware?", answer: "Delaware's age of consent is 18, one of the highest in the nation. This aligns with Plus's requirement that all members be at least 18 years old." },
      { question: "How does Delaware's corporate environment affect sugar dating?", answer: "With over 60% of Fortune 500 companies incorporated here, Delaware attracts corporate executives and legal professionals with significant disposable income. Wilmington's financial district is the primary hub." },
      { question: "Are gifts taxed in Delaware?", answer: "Delaware has no state gift tax and no sales tax. Recipients owe no tax on gifts received. The federal gift tax exclusion applies to the giver for amounts over $19,000 per recipient per year." },
      { question: "Is the sugar dating scene active in Delaware?", answer: "While Delaware is small, its proximity to Philadelphia and the concentration of corporate wealth in Wilmington create an active scene. Many Delaware members also connect with matches in Philadelphia and the greater DC area." }
    ],
  },
  florida: {
    name: "Florida",
    slug: "florida",
    summary: "Sugar dating is legal in Florida. As one of the most popular states for sugar dating due to its concentration of wealth, year-round warm weather, and vibrant social scene, Florida has a thriving market. The state treats prostitution as a misdemeanor for first offenses but escalates for repeats.",
    prostitutionLaw: "Florida classifies prostitution as a second-degree misdemeanor for a first offense under Florida Statute 796.07, carrying up to 60 days in jail and a $500 fine. A second offense is a first-degree misdemeanor (up to 1 year), and a third becomes a third-degree felony (up to 5 years). Sugar dating is distinct because it is a genuine relationship, not an explicit exchange of sex for payment.",
    giftTaxNote: "Florida has no state income tax and no state gift tax. Only the federal gift tax exclusion of $19,000 per recipient per year (2026) applies. Florida's tax-friendly environment is one reason many wealthy individuals relocate here, making it an ideal state for sugar dating from a financial perspective.",
    ageOfConsent: 18,
    notablePoints: [
      "Florida's age of consent is 18, matching Plus's membership requirement",
      "No state income tax makes Florida particularly attractive for both givers and receivers in sugar dating arrangements",
      "Miami, Tampa, Orlando, and Palm Beach are the most active markets in the state",
      "Florida's repeat-offense escalation (misdemeanor to felony) underscores the importance of maintaining genuine relationship elements"
    ],
    faqs: [
      { question: "Is sugar dating legal in Florida?", answer: "Yes. Sugar dating is completely legal in Florida. It is a consensual relationship between adults involving companionship, financial generosity, and mutual benefit. Florida law only targets explicit sex-for-money exchanges." },
      { question: "What are Florida's prostitution penalties?", answer: "A first offense is a second-degree misdemeanor (up to 60 days, $500 fine). Second offense is a first-degree misdemeanor (up to 1 year). Third offense becomes a felony. Sugar dating is entirely separate — it's relationship-based, not transactional." },
      { question: "Why is Florida popular for sugar dating?", answer: "No state income tax, year-round warm weather, vibrant nightlife, and massive wealth concentration (especially in Miami, Palm Beach, and Naples) make Florida one of the top 3 states for sugar dating activity." },
      { question: "What is the age of consent in Florida?", answer: "Florida's age of consent is 18. This is one of the strictest in the nation and aligns with Plus's membership requirement." },
      { question: "Are sugar dating gifts taxed in Florida?", answer: "Florida has no income tax and no gift tax. Recipients owe nothing on gifts received. Givers may need to file a federal gift tax return for amounts over $19,000 per recipient per year, but rarely owe actual tax." }
    ],
  },
  georgia: {
    name: "Georgia",
    slug: "georgia",
    summary: "Sugar dating is legal in Georgia. The state has a growing economy centered on Atlanta, with significant wealth in entertainment, tech, logistics, and real estate. Georgia treats prostitution as a misdemeanor, and genuine dating relationships with financial elements are protected.",
    prostitutionLaw: "Georgia classifies prostitution as a misdemeanor under OCGA 16-6-9, carrying up to 1 year in jail and a $1,000 fine. A person with a prior conviction within 5 years faces a mandatory minimum of 72 hours. Keeping a place of prostitution is a felony. Sugar dating is legally distinct as it involves genuine romantic or companionship relationships.",
    giftTaxNote: "Georgia has no state gift tax. The state income tax has a flat rate of 5.49% (as of 2026). Gifts received in a sugar dating relationship are not taxable income at either the state or federal level. The federal $19,000 exclusion (2026) applies to the giver.",
    ageOfConsent: 16,
    notablePoints: [
      "Atlanta is the primary sugar dating hub in the Southeast, with wealth concentrated in entertainment, tech, and logistics",
      "Georgia's film and music industry boom has created a new class of high-earning individuals",
      "The state's age of consent is 16, but Plus requires all members to be 18+",
      "Georgia has mandatory minimums for repeat prostitution offenses — maintaining genuine relationship elements is important"
    ],
    faqs: [
      { question: "Is sugar dating legal in Georgia?", answer: "Yes. Sugar dating is legal in Georgia. Consensual relationships between adults involving financial generosity, gifts, and companionship are fully lawful. Georgia law only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating most active in Georgia?", answer: "Atlanta dominates the Georgia sugar dating market, particularly in Buckhead, Midtown, and the affluent northern suburbs. Savannah also has a smaller but active scene." },
      { question: "How does Georgia law distinguish sugar dating from prostitution?", answer: "Prostitution under Georgia law requires engaging in sex for money. Sugar dating involves a genuine relationship — companionship, emotional connection, mentorship — with financial generosity as one component. There is no quid pro quo." },
      { question: "Are sugar dating gifts taxable in Georgia?", answer: "No. Georgia has no gift tax, and gifts are not income under state or federal law. Recipients owe no tax. Givers may file a federal return for gifts over $19,000 per recipient per year." },
      { question: "What is the age of consent in Georgia?", answer: "Georgia's age of consent is 16. Plus requires all members to be at least 18 years old, regardless of state consent laws." }
    ],
  },
  hawaii: {
    name: "Hawaii",
    slug: "hawaii",
    summary: "Sugar dating is legal in Hawaii. The islands' tourism economy and high cost of living create a unique sugar dating dynamic. Hawaii treats prostitution as a petty misdemeanor, and consensual adult relationships with financial components are fully protected.",
    prostitutionLaw: "Hawaii classifies prostitution as a petty misdemeanor under HRS Section 712-1200, carrying up to 30 days in jail and a $1,000 fine. Promoting prostitution in the first degree is a Class A felony. Sugar dating is distinct because it involves genuine relationships rather than commercial sex transactions.",
    giftTaxNote: "Hawaii has no state gift tax but does have a state income tax up to 11%. Gifts received are not taxable income. Hawaii's high cost of living means allowances in the state tend to be higher to account for expensive housing, food, and transportation.",
    ageOfConsent: 16,
    notablePoints: [
      "Hawaii's tourism industry brings a rotating pool of wealthy visitors who engage in sugar dating while on the islands",
      "The extremely high cost of living means local sugar dating allowances tend to be above national averages",
      "Military bases on Oahu contribute to the sugar dating demographic",
      "Hawaii's prostitution penalties are among the lightest in the nation (petty misdemeanor)"
    ],
    faqs: [
      { question: "Is sugar dating legal in Hawaii?", answer: "Yes. Sugar dating is legal in Hawaii. Consensual adult relationships that include financial generosity and gifts are lawful. Hawaii's prostitution statute only targets explicit sex-for-money exchanges." },
      { question: "How does Hawaii's tourism affect sugar dating?", answer: "Hawaii attracts wealthy tourists year-round who are interested in companionship during their stay. Plus's travel mode lets members connect with visitors before they arrive, making Hawaii a unique market." },
      { question: "What are sugar dating allowances like in Hawaii?", answer: "Hawaii's extremely high cost of living (highest in the US for many categories) means allowances tend to be higher than mainland averages to account for expensive housing, food, and transportation." },
      { question: "What is the age of consent in Hawaii?", answer: "Hawaii's age of consent is 16. Plus requires all members to be at least 18 years old." },
      { question: "Are gifts taxable in Hawaii?", answer: "Hawaii has no gift tax, and gifts are not taxable income despite the state's high income tax rates (up to 11%). Recipients owe nothing on gifts received within a dating relationship." }
    ],
  },
  idaho: {
    name: "Idaho",
    slug: "idaho",
    summary: "Sugar dating is legal in Idaho. The state permits consensual adult relationships that include financial generosity. Idaho treats prostitution as a misdemeanor, and genuine dating relationships are fully protected under law.",
    prostitutionLaw: "Idaho classifies prostitution as a misdemeanor under Idaho Code 18-5613, carrying up to 6 months in jail and a $1,000 fine. Keeping a house of prostitution is a felony. Sugar dating is legally distinct because it involves genuine companionship and dating rather than explicit payment for sexual services.",
    giftTaxNote: "Idaho has no state gift tax. The state income tax has rates up to 5.8%. Gifts received are not taxable income at the state or federal level. The federal gift tax exclusion of $19,000 per recipient per year (2026) applies to givers.",
    ageOfConsent: 18,
    notablePoints: [
      "Idaho's age of consent is 18, matching Plus's membership requirement",
      "Boise's tech boom has attracted new wealth and expanded the sugar dating market",
      "Sun Valley and Ketchum attract ultra-wealthy visitors and second-home owners",
      "Idaho's low cost of living means moderate allowances carry significant purchasing power"
    ],
    faqs: [
      { question: "Is sugar dating legal in Idaho?", answer: "Yes. Sugar dating is legal in Idaho. Relationships between consenting adults that include financial support and gifts are lawful. Idaho law only prohibits explicit exchanges of sex for money." },
      { question: "What is the age of consent in Idaho?", answer: "Idaho's age of consent is 18, one of the strictest in the nation. This aligns with Plus's membership requirement." },
      { question: "Is sugar dating active in Idaho?", answer: "Boise's growing tech sector and Sun Valley's wealthy visitor population make Idaho's sugar dating scene more active than you might expect. The low cost of living also means allowances go further here." },
      { question: "Are gifts taxable in Idaho?", answer: "Idaho has no gift tax. Gifts are not considered income for recipients. The federal $19,000 annual exclusion applies to givers." },
      { question: "How does Idaho define prostitution?", answer: "Under Idaho Code 18-5613, prostitution involves engaging in sexual activity for a fee or hire. Sugar dating — a genuine relationship with financial generosity — does not meet this definition." }
    ],
  },
  illinois: {
    name: "Illinois",
    slug: "illinois",
    summary: "Sugar dating is legal in Illinois. Chicago's finance, tech, and trading industries create a robust market for arrangement dating. Illinois treats prostitution as a misdemeanor for first offenses, and genuine adult relationships with financial components are fully protected.",
    prostitutionLaw: "Illinois classifies prostitution as a Class A misdemeanor under 720 ILCS 5/11-14, carrying up to 1 year in jail and a $2,500 fine. Second offenses are Class 4 felonies. Patronizing a prostitute is a Class A misdemeanor. Sugar dating is distinct as it involves genuine relationships rather than commercial sex transactions.",
    giftTaxNote: "Illinois has no state gift tax. The state has a flat income tax rate of 4.95%. Gifts received in a sugar dating relationship are not taxable income at the state or federal level. The federal gift tax exclusion of $19,000 per recipient per year (2026) applies to givers.",
    ageOfConsent: 17,
    notablePoints: [
      "Chicago is the primary sugar dating market in the Midwest, with wealth in trading, finance, tech, and law",
      "Illinois escalates repeat prostitution offenses to felonies — genuine relationship elements are important to maintain",
      "The state's age of consent is 17, but Plus requires all members to be 18+",
      "Chicago's high-rise luxury apartment culture creates natural privacy for sugar dating relationships"
    ],
    faqs: [
      { question: "Is sugar dating legal in Illinois?", answer: "Yes. Sugar dating is completely legal in Illinois. Consensual relationships between adults that include financial generosity are protected. Illinois law only prohibits explicit exchanges of sex for money." },
      { question: "How active is sugar dating in Chicago?", answer: "Chicago is consistently ranked among the top 5 cities in the US for sugar dating activity. The concentration of trading firm wealth, Big Law salaries, and tech sector growth create a deep pool of high-earning individuals." },
      { question: "What are Illinois's prostitution penalties?", answer: "First offense is a Class A misdemeanor (up to 1 year jail). Repeat offenses become felonies. Sugar dating is entirely separate — it involves genuine relationships, not transactional exchanges of sex for money." },
      { question: "Are sugar dating gifts taxable in Illinois?", answer: "Illinois has no gift tax. Gifts are not income for recipients under state or federal law. The flat 4.95% state income tax does not apply to gifts received." },
      { question: "What is the age of consent in Illinois?", answer: "Illinois's age of consent is 17. Plus requires all members to be at least 18 years old." }
    ],
  },
  indiana: {
    name: "Indiana",
    slug: "indiana",
    summary: "Sugar dating is legal in Indiana. The state permits consensual adult relationships that include financial generosity and gifts. Indiana classifies prostitution as a misdemeanor, and genuine dating relationships are clearly distinguished from illegal activity.",
    prostitutionLaw: "Indiana classifies prostitution as a Class A misdemeanor under IC 35-45-4-2, carrying up to 1 year in jail and a $5,000 fine. Repeat offenses within 5 years become Level 6 felonies. Sugar dating is legally distinct because it involves ongoing, genuine relationships rather than discrete sex-for-money exchanges.",
    giftTaxNote: "Indiana has no state gift tax. The state has a flat income tax rate of 3.05%. Gifts received are not taxable income. The federal gift tax exclusion of $19,000 per recipient per year (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Indianapolis's growing tech and pharmaceutical sectors have expanded the sugar dating market",
      "Indiana's relatively low cost of living means moderate allowances carry significant value",
      "The state has mandatory minimums for repeat prostitution offenses — maintaining genuine relationship character is important",
      "Carmel and Fishers (Indianapolis suburbs) have some of the highest household incomes in the Midwest"
    ],
    faqs: [
      { question: "Is sugar dating legal in Indiana?", answer: "Yes. Sugar dating is legal in Indiana. Consensual relationships between adults involving gifts, financial support, and companionship are fully lawful. Indiana only prohibits the explicit exchange of sexual acts for money." },
      { question: "How does Indiana define prostitution?", answer: "Under IC 35-45-4-2, prostitution means performing or offering to perform sexual acts for money. Sugar dating — a genuine relationship that includes financial generosity — does not meet this definition." },
      { question: "Where is sugar dating active in Indiana?", answer: "Indianapolis is the primary market, particularly the northern suburbs like Carmel and Fishers. The city's pharmaceutical companies (Eli Lilly), tech firms, and motorsport industry create high-earning professionals." },
      { question: "Are gifts taxable in Indiana?", answer: "Indiana has no gift tax. Gifts are not income for recipients. Indiana's low 3.05% flat income tax doesn't apply to gifts anyway. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Indiana?", answer: "Indiana's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  iowa: {
    name: "Iowa",
    slug: "iowa",
    summary: "Sugar dating is legal in Iowa. Consensual relationships between adults that include financial generosity are not prohibited under Iowa law. The state treats prostitution as an aggravated misdemeanor, and genuine dating relationships are clearly protected.",
    prostitutionLaw: "Iowa classifies prostitution as an aggravated misdemeanor under Iowa Code 725.1, carrying up to 2 years in prison and a fine of $855 to $8,540. A third offense is a Class D felony. Sugar dating is distinct because it involves genuine companionship and dating, not explicit payment for sexual services.",
    giftTaxNote: "Iowa recently eliminated its state inheritance tax (phased out by 2025) and has no gift tax. The state income tax rate tops out at 5.7%. Gifts received in sugar dating are not taxable income at state or federal levels.",
    ageOfConsent: 16,
    notablePoints: [
      "Iowa has relatively strict prostitution penalties (aggravated misdemeanor with up to 2 years), making the legal distinction with sugar dating important",
      "Des Moines's insurance and financial services industry creates a concentrated wealth pool",
      "Iowa eliminated its state inheritance tax in 2025 and has no gift tax",
      "The state's agricultural wealth (large farm operations) is often underestimated"
    ],
    faqs: [
      { question: "Is sugar dating legal in Iowa?", answer: "Yes. Sugar dating is legal in Iowa. Relationships between consenting adults that include financial support are lawful. Iowa law only targets explicit exchanges of sex for money." },
      { question: "What are Iowa's prostitution penalties?", answer: "Prostitution in Iowa is an aggravated misdemeanor carrying up to 2 years in prison — stricter than many states. Sugar dating is entirely different: it's a genuine relationship, not a transaction." },
      { question: "Where is sugar dating active in Iowa?", answer: "Des Moines leads the state's sugar dating market, driven by its concentration of insurance companies and financial services firms. Iowa City also has activity tied to the university community." },
      { question: "Are gifts taxable in Iowa?", answer: "Iowa has no gift tax (and recently eliminated its inheritance tax). Gifts are not income for recipients. The federal $19,000 annual exclusion applies to givers." },
      { question: "What is the age of consent in Iowa?", answer: "Iowa's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  kansas: {
    name: "Kansas",
    slug: "kansas",
    summary: "Sugar dating is legal in Kansas. The state permits consensual adult relationships involving financial generosity and gifts. Kansas treats prostitution as a misdemeanor, and genuine dating relationships are clearly distinguished from commercial sex work.",
    prostitutionLaw: "Kansas classifies selling sexual relations as a Class B misdemeanor under KSA 21-6419, carrying up to 6 months in jail and a $1,000 fine. Buying sexual relations is a Class A misdemeanor. Sugar dating is distinct because it involves genuine ongoing relationships rather than discrete transactional exchanges.",
    giftTaxNote: "Kansas has no state gift tax. The state income tax tops out at 5.7%. Gifts received in a sugar dating relationship are not taxable income. The federal $19,000 exclusion per recipient per year (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Kansas notably distinguishes between selling and buying sexual relations with different penalty levels",
      "The Kansas City metro (including Overland Park and Leawood) is the primary sugar dating market",
      "Koch Industries and Sprint/T-Mobile create significant corporate wealth in Wichita and the KC suburbs",
      "Kansas's low cost of living means moderate allowances have high purchasing power"
    ],
    faqs: [
      { question: "Is sugar dating legal in Kansas?", answer: "Yes. Sugar dating is legal in Kansas. Consensual adult relationships that include financial support and gifts are lawful. Kansas law only prohibits the explicit sale or purchase of sexual acts." },
      { question: "How does Kansas define prostitution?", answer: "Under KSA 21-6419, Kansas separates selling sexual relations (Class B misdemeanor) from buying (Class A misdemeanor). Sugar dating involves genuine relationships — not buying or selling sex." },
      { question: "Where is sugar dating popular in Kansas?", answer: "The Kansas City metro area — especially Johnson County suburbs like Overland Park and Leawood — is the most active market. Wichita's corporate wealth also supports an active scene." },
      { question: "Are gifts taxable in Kansas?", answer: "Kansas has no gift tax. Gifts are not income for recipients under state or federal law. The federal $19,000 annual exclusion applies to givers." },
      { question: "What is the age of consent in Kansas?", answer: "Kansas's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  kentucky: {
    name: "Kentucky",
    slug: "kentucky",
    summary: "Sugar dating is legal in Kentucky. Consensual adult relationships involving financial generosity are protected under law. Kentucky classifies prostitution as a misdemeanor, and the law clearly distinguishes between genuine dating and commercial sex work.",
    prostitutionLaw: "Kentucky classifies prostitution as a Class B misdemeanor under KRS 529.020, carrying up to 90 days in jail and a $250 fine. Promoting prostitution is a Class A misdemeanor or felony depending on circumstances. Sugar dating is legally distinct as it involves genuine relationships rather than explicit sex-for-money transactions.",
    giftTaxNote: "Kentucky has no state gift tax but does have an inheritance tax on certain beneficiaries. The state income tax is a flat 4%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Kentucky has relatively light prostitution penalties (Class B misdemeanor, $250 fine)",
      "Louisville and Lexington are the primary sugar dating markets, with bourbon and horse racing industry wealth",
      "Kentucky has an inheritance tax but no gift tax — an important distinction for ongoing financial support",
      "The bourbon industry and horse racing create unique wealth concentrations in central Kentucky"
    ],
    faqs: [
      { question: "Is sugar dating legal in Kentucky?", answer: "Yes. Sugar dating is legal in Kentucky. Consensual relationships between adults that include financial generosity and gifts are lawful. Kentucky only prohibits explicit exchanges of sex for money." },
      { question: "What are Kentucky's prostitution penalties?", answer: "Prostitution in Kentucky is a Class B misdemeanor with up to 90 days jail and a $250 fine — relatively light. Sugar dating is entirely separate as it involves genuine relationships." },
      { question: "Where is sugar dating active in Kentucky?", answer: "Louisville and Lexington are the primary markets. Louisville's business community and Lexington's horse industry wealth create the highest concentration of high-earning individuals in the state." },
      { question: "Does Kentucky tax gifts?", answer: "Kentucky has no gift tax (though it does have an inheritance tax for non-family beneficiaries). Gifts received in dating relationships are not taxable income." },
      { question: "What is the age of consent in Kentucky?", answer: "Kentucky's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  louisiana: {
    name: "Louisiana",
    slug: "louisiana",
    summary: "Sugar dating is legal in Louisiana. The state's oil wealth, tourism industry, and unique cultural landscape create an active market. Louisiana treats prostitution as a misdemeanor for first offenses but escalates penalties significantly for repeats.",
    prostitutionLaw: "Louisiana classifies prostitution as a misdemeanor for a first offense under RS 14:82, carrying up to 6 months in jail and a $500 fine. A second offense carries mandatory minimum jail time, and a fourth offense is a felony with up to 10 years. Sugar dating is legally distinct as it involves genuine relationships rather than explicit exchanges of sex for payment.",
    giftTaxNote: "Louisiana has no state gift tax. The state income tax tops out at 4.25%. Gifts received are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 17,
    notablePoints: [
      "Louisiana has severe penalty escalation for repeat prostitution offenses (up to 10 years for fourth offense), making the legal distinction with sugar dating critical",
      "New Orleans's unique cultural attitudes make it one of the more socially accepting cities for sugar dating in the South",
      "Oil and gas industry wealth in the southern part of the state drives much of the sugar dating activity",
      "Louisiana's age of consent is 17 — Plus requires all members to be 18+"
    ],
    faqs: [
      { question: "Is sugar dating legal in Louisiana?", answer: "Yes. Sugar dating is legal in Louisiana. Consensual relationships between adults involving gifts and financial support are lawful. Louisiana law only targets explicit sex-for-money exchanges." },
      { question: "What are Louisiana's prostitution penalties?", answer: "First offense is a misdemeanor (up to 6 months). Penalties escalate sharply: fourth offense is a felony with up to 10 years. Sugar dating is entirely separate — it's a genuine relationship, not a transaction." },
      { question: "Where is sugar dating popular in Louisiana?", answer: "New Orleans is the primary market, with its tourism-driven economy and culturally open attitudes. Baton Rouge and the Acadiana region's oil wealth also support active scenes." },
      { question: "Are gifts taxable in Louisiana?", answer: "Louisiana has no gift tax. Gifts are not income for recipients. The federal $19,000 annual exclusion applies to givers." },
      { question: "What is the age of consent in Louisiana?", answer: "Louisiana's age of consent is 17. Plus requires all members to be at least 18 years old." }
    ],
  },
  maine: {
    name: "Maine",
    slug: "maine",
    summary: "Sugar dating is legal in Maine. The state treats prostitution as a Class E crime (the lowest criminal classification), and consensual adult relationships involving financial generosity are fully protected under law.",
    prostitutionLaw: "Maine classifies prostitution as a Class E crime under Title 17-A Section 853-A, carrying up to 6 months in jail and a $1,000 fine. Sex trafficking is a Class B crime. Sugar dating is legally distinct because it involves genuine relationships rather than explicit exchanges of sex for payment.",
    giftTaxNote: "Maine has an estate tax but no state gift tax. The state income tax tops out at 7.15%. Gifts received in a sugar dating relationship are not taxable income. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Maine's coastal communities (Kennebunkport, Bar Harbor, Camden) attract wealthy summer residents who participate in sugar dating",
      "The state's small year-round population means the market is seasonal, peaking in summer months",
      "Portland's growing food and creative scene has attracted younger wealth",
      "Maine has no state gift tax, though it does have an estate tax"
    ],
    faqs: [
      { question: "Is sugar dating legal in Maine?", answer: "Yes. Sugar dating is legal in Maine. Consensual relationships between adults that include financial generosity are lawful. Maine only prohibits explicit exchanges of sex for money." },
      { question: "What are Maine's prostitution penalties?", answer: "Prostitution in Maine is a Class E crime — the lowest criminal classification — carrying up to 6 months and a $1,000 fine. Sugar dating is entirely separate as it involves genuine relationships." },
      { question: "Is sugar dating seasonal in Maine?", answer: "Somewhat. Maine's wealthy coastal communities see peak activity during summer months when high-net-worth visitors are in residence. Portland maintains year-round activity." },
      { question: "Are gifts taxable in Maine?", answer: "Maine has no gift tax. Gifts are not income for recipients despite the state's relatively high income tax rates. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Maine?", answer: "Maine's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  maryland: {
    name: "Maryland",
    slug: "maryland",
    summary: "Sugar dating is legal in Maryland. With significant wealth from the DC metro area, defense contractors, biotech, and federal government, Maryland has an active sugar dating market. The state treats prostitution as a misdemeanor.",
    prostitutionLaw: "Maryland classifies prostitution as a misdemeanor under Criminal Law Section 11-306, carrying up to 1 year in jail and a $500 fine. Maryland notably does not criminalize being a prostitute but does criminalize the act of prostitution and solicitation. Sugar dating is distinct as it involves genuine relationships.",
    giftTaxNote: "Maryland has an estate tax but no state gift tax. The state income tax tops out at 5.75% with county surcharges of 2.25-3.2%. Gifts received are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Maryland's proximity to DC means many sugar dating participants work in government, lobbying, and defense contracting",
      "Montgomery and Howard counties have some of the highest median household incomes in the nation",
      "The state's biotech corridor (Bethesda/Rockville) creates another wealth concentration",
      "Maryland's county income tax surcharges make it important to understand the full tax picture"
    ],
    faqs: [
      { question: "Is sugar dating legal in Maryland?", answer: "Yes. Sugar dating is legal in Maryland. Consensual adult relationships involving financial generosity and gifts are fully lawful. Maryland only prohibits the explicit act of exchanging sex for money." },
      { question: "How does DC's proximity affect Maryland's sugar dating scene?", answer: "Enormously. Many wealthy DC professionals — lobbyists, senior government officials, defense contractors — live in Maryland suburbs like Bethesda, Potomac, and Columbia. The scenes overlap significantly." },
      { question: "What are Maryland's prostitution penalties?", answer: "Prostitution in Maryland is a misdemeanor carrying up to 1 year and $500. Notably, Maryland focuses on the act rather than the person. Sugar dating is entirely separate as it involves genuine relationships." },
      { question: "Are gifts taxable in Maryland?", answer: "Maryland has no gift tax. Gifts are not income despite the state's combined state/county income tax rates that can reach 9%. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Maryland?", answer: "Maryland's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  massachusetts: {
    name: "Massachusetts",
    slug: "massachusetts",
    summary: "Sugar dating is legal in Massachusetts. The state's concentration of finance, biotech, education, and tech wealth — particularly in Boston — creates a strong market. Massachusetts treats sexual conduct for a fee as a misdemeanor.",
    prostitutionLaw: "Massachusetts criminalizes sexual conduct for a fee under MGL Chapter 272 Section 53A, carrying up to 1 year in jail and a $500 fine. The state has moved toward treating prostitution as a public health issue rather than purely criminal. Sugar dating is distinct because it involves genuine relationships, not explicit sex-for-money exchanges.",
    giftTaxNote: "Massachusetts has no state gift tax but does have an estate tax with a low $2 million threshold. The state income tax is a flat 5% (plus 4% surtax on income over $1 million). Gifts received are not taxable income. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Boston's concentration of biotech, finance, and university wealth makes it the primary market in New England",
      "Massachusetts has been moving toward decriminalization of sex work, reflecting progressive attitudes",
      "The state's millionaire surtax (4% on income over $1M) affects high earners but does not apply to gifts received",
      "Cambridge and the university corridor attract a unique demographic of academic and tech wealth"
    ],
    faqs: [
      { question: "Is sugar dating legal in Massachusetts?", answer: "Yes. Sugar dating is legal in Massachusetts. Consensual relationships between adults that include financial generosity are lawful. Massachusetts only prohibits explicit sexual conduct for a fee." },
      { question: "Where is sugar dating active in Massachusetts?", answer: "Boston (Back Bay, Beacon Hill, Seaport) is the dominant market. Cambridge attracts tech and academic wealth. The wealthy suburbs along Route 128 and Cape Cod also have active scenes." },
      { question: "How is Massachusetts approaching sex work laws?", answer: "Massachusetts has been moving toward treating sex work as a public health issue with decriminalization proposals. This progressive stance creates a more accepting environment for sugar dating. Either way, sugar dating is legal as a genuine relationship." },
      { question: "Are gifts taxable in Massachusetts?", answer: "Massachusetts has no gift tax. The flat 5% income tax and 4% surtax on high earners do not apply to gifts received. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Massachusetts?", answer: "Massachusetts's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  michigan: {
    name: "Michigan",
    slug: "michigan",
    summary: "Sugar dating is legal in Michigan. The state has a diverse economy with wealth in automotive, tech, and manufacturing. Michigan treats prostitution involving payment as a misdemeanor, and genuine adult relationships with financial components are fully legal.",
    prostitutionLaw: "Michigan classifies accosting and soliciting (prostitution) as a misdemeanor under MCL 750.448, carrying up to 90 days in jail and a $500 fine for a first offense. A third offense within 15 years is a felony. Sugar dating is legally distinct because it involves genuine relationships rather than transactional exchanges.",
    giftTaxNote: "Michigan has no state gift tax. The state has a flat income tax rate of 4.05%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Detroit's automotive industry and Ann Arbor's tech/academic corridor create two distinct sugar dating markets",
      "Michigan escalates prostitution to a felony on third offense within 15 years",
      "The state's lake communities (Traverse City, Harbor Springs) attract seasonal high-net-worth visitors",
      "Grand Rapids's furniture and manufacturing wealth is often overlooked"
    ],
    faqs: [
      { question: "Is sugar dating legal in Michigan?", answer: "Yes. Sugar dating is legal in Michigan. Consensual adult relationships involving financial generosity are lawful. Michigan only prohibits explicit solicitation of sex for money." },
      { question: "Where is sugar dating popular in Michigan?", answer: "The Detroit metro area (especially Birmingham, Bloomfield Hills, and Grosse Pointe) leads, followed by Ann Arbor and Grand Rapids. Lake communities attract seasonal activity." },
      { question: "What are Michigan's prostitution laws?", answer: "First offense is a misdemeanor (90 days, $500). Third offense within 15 years becomes a felony. Sugar dating is entirely separate — it's a genuine relationship, not solicitation." },
      { question: "Are gifts taxable in Michigan?", answer: "Michigan has no gift tax. Gifts are not income for recipients. The flat 4.05% state income tax does not apply to gifts. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Michigan?", answer: "Michigan's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  minnesota: {
    name: "Minnesota",
    slug: "minnesota",
    summary: "Sugar dating is legal in Minnesota. The state has significant corporate wealth concentrated in the Twin Cities, with numerous Fortune 500 companies headquartered here. Minnesota treats prostitution as a misdemeanor, and genuine dating relationships are protected.",
    prostitutionLaw: "Minnesota classifies prostitution as a misdemeanor under Minnesota Statutes 609.324, carrying up to 90 days in jail and a $1,000 fine. Hiring a prostitute (patronizing) carries the same penalties. Sex trafficking is a serious felony. Sugar dating is distinct as it involves genuine relationships.",
    giftTaxNote: "Minnesota has an estate tax but no state gift tax. The state income tax is progressive up to 9.85%. Gifts received are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Minnesota has more Fortune 500 companies per capita than almost any state (Target, UnitedHealth, 3M, General Mills, US Bancorp)",
      "The Twin Cities' corporate wealth creates a concentrated pool of high-earning executives",
      "Minnesota's high income tax (up to 9.85%) makes the tax-free nature of gifts particularly valuable for recipients",
      "The state's lake country attracts seasonal wealth during summer months"
    ],
    faqs: [
      { question: "Is sugar dating legal in Minnesota?", answer: "Yes. Sugar dating is legal in Minnesota. Consensual relationships between adults with financial generosity are lawful. Minnesota only prohibits explicit prostitution — the exchange of sex for money." },
      { question: "Where is sugar dating active in Minnesota?", answer: "Minneapolis and its western suburbs (Wayzata, Minnetonka, Eden Prairie) are the primary markets. The concentration of Fortune 500 headquarters creates a deep pool of corporate executives." },
      { question: "Are sugar dating gifts taxable in Minnesota?", answer: "Minnesota has no gift tax, and gifts are not income despite the state's high income tax rates (up to 9.85%). This makes gift-based arrangements particularly tax-efficient for recipients." },
      { question: "What are Minnesota's prostitution penalties?", answer: "Prostitution is a misdemeanor (up to 90 days, $1,000 fine). Sugar dating is entirely separate — it involves genuine relationships with financial generosity, not transactional exchanges." },
      { question: "What is the age of consent in Minnesota?", answer: "Minnesota's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  mississippi: {
    name: "Mississippi",
    slug: "mississippi",
    summary: "Sugar dating is legal in Mississippi. Consensual adult relationships involving financial generosity are not prohibited. Mississippi treats prostitution as a misdemeanor, and genuine dating relationships are clearly distinct from illegal activity.",
    prostitutionLaw: "Mississippi classifies prostitution as a misdemeanor under Mississippi Code 97-29-49, carrying up to 6 months in jail and a $200 fine for a first offense. Repeat offenses carry up to 1 year. Sugar dating is legally distinct as it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "Mississippi has no state gift tax or estate tax. The state income tax tops out at 5%. Gifts received in sugar dating are not taxable income. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Mississippi has relatively light prostitution penalties (misdemeanor, $200 fine for first offense)",
      "Jackson and the Gulf Coast (Biloxi, Gulfport) are the primary sugar dating markets",
      "Mississippi has no estate tax and no gift tax, simplifying financial arrangements",
      "The state's casino industry along the Gulf Coast creates a unique wealth demographic"
    ],
    faqs: [
      { question: "Is sugar dating legal in Mississippi?", answer: "Yes. Sugar dating is legal in Mississippi. Consensual adult relationships involving gifts and financial support are lawful. Mississippi only prohibits explicit exchanges of sex for money." },
      { question: "What are Mississippi's prostitution penalties?", answer: "First offense is a misdemeanor with up to 6 months and a $200 fine. Sugar dating is entirely separate — it's a genuine relationship, not a commercial transaction." },
      { question: "Where is sugar dating active in Mississippi?", answer: "Jackson is the primary market as the state capital and largest city. The Gulf Coast casino corridor (Biloxi/Gulfport) also supports activity from gaming industry wealth and tourism." },
      { question: "Are gifts taxable in Mississippi?", answer: "Mississippi has no gift tax and no estate tax. Gifts are not income for recipients. The federal $19,000 annual exclusion applies to givers." },
      { question: "What is the age of consent in Mississippi?", answer: "Mississippi's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  missouri: {
    name: "Missouri",
    slug: "missouri",
    summary: "Sugar dating is legal in Missouri. The state's two major metros — Kansas City and St. Louis — create distinct sugar dating markets. Missouri treats prostitution as a misdemeanor, and genuine adult dating relationships with financial elements are fully protected.",
    prostitutionLaw: "Missouri classifies prostitution as a Class B misdemeanor under RSMo 567.020, carrying up to 6 months in jail and a $1,000 fine. Repeat offenses become Class A misdemeanors. Promoting prostitution is a felony. Sugar dating is distinct because it involves genuine relationships rather than commercial sex transactions.",
    giftTaxNote: "Missouri has no state gift tax or estate tax. The state income tax tops out at 4.8%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 17,
    notablePoints: [
      "Missouri has two distinct sugar dating markets: Kansas City (finance, tech) and St. Louis (healthcare, manufacturing)",
      "The state has no estate tax and no gift tax, simplifying financial arrangements",
      "Missouri's age of consent is 17 — Plus requires all members to be 18+",
      "The state's relatively low cost of living means moderate allowances have strong purchasing power"
    ],
    faqs: [
      { question: "Is sugar dating legal in Missouri?", answer: "Yes. Sugar dating is legal in Missouri. Consensual relationships between adults involving financial generosity are lawful. Missouri only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating popular in Missouri?", answer: "Kansas City (especially the Country Club Plaza area and Johnson County) and St. Louis (Clayton, Ladue, Frontenac) are the two primary markets with distinct demographics." },
      { question: "What are Missouri's prostitution penalties?", answer: "First offense is a Class B misdemeanor (up to 6 months, $1,000). Repeat offenses escalate to Class A misdemeanors. Sugar dating is entirely separate as it involves genuine relationships." },
      { question: "Are gifts taxable in Missouri?", answer: "Missouri has no gift tax and no estate tax. Gifts are not income for recipients. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Missouri?", answer: "Missouri's age of consent is 17. Plus requires all members to be at least 18 years old." }
    ],
  },
  montana: {
    name: "Montana",
    slug: "montana",
    summary: "Sugar dating is legal in Montana. The state's growing population of wealthy transplants and established ranching wealth create a small but active market. Montana treats prostitution as a misdemeanor, and genuine dating relationships are fully protected.",
    prostitutionLaw: "Montana classifies prostitution as a misdemeanor under MCA 45-5-601, carrying up to 6 months in jail and a $500 fine. Promoting prostitution is a felony. Sugar dating is distinct because it involves genuine relationships rather than explicit sex-for-money transactions.",
    giftTaxNote: "Montana has no state sales tax, no gift tax, and eliminated its state income tax for most residents in recent reforms (with a maximum rate of 5.9% for high earners). Gifts received are not taxable income at state or federal levels.",
    ageOfConsent: 16,
    notablePoints: [
      "Montana has become a relocation destination for tech executives and wealthy retirees seeking low taxes and natural beauty",
      "Bozeman and the surrounding area (Big Sky, Yellowstone Club) have enormous wealth concentration",
      "The state has no sales tax, making luxury purchases and experiences more affordable",
      "Montana's ranching and natural resource wealth is generational and often underestimated"
    ],
    faqs: [
      { question: "Is sugar dating legal in Montana?", answer: "Yes. Sugar dating is legal in Montana. Consensual adult relationships involving financial generosity are lawful. Montana only prohibits explicit exchanges of sex for money." },
      { question: "Is sugar dating active in Montana?", answer: "More than you'd expect. Bozeman's explosive growth from tech transplants, the ultra-wealthy community around Big Sky and the Yellowstone Club, and Missoula's university town create active markets." },
      { question: "What are Montana's tax advantages for sugar dating?", answer: "Montana has no sales tax, no gift tax, and relatively low income tax rates. This creates a favorable environment for financial arrangements." },
      { question: "Are gifts taxable in Montana?", answer: "Montana has no gift tax. Gifts are not income for recipients. The federal $19,000 annual exclusion applies to givers." },
      { question: "What is the age of consent in Montana?", answer: "Montana's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  nebraska: {
    name: "Nebraska",
    slug: "nebraska",
    summary: "Sugar dating is legal in Nebraska. The state, home to Warren Buffett and several major corporations, has more concentrated wealth than outsiders expect. Nebraska treats prostitution as a misdemeanor, and genuine adult relationships are protected.",
    prostitutionLaw: "Nebraska classifies prostitution as a Class II misdemeanor under NRS 28-801, carrying up to 6 months in jail and a $1,000 fine. Solicitation is a Class I misdemeanor. Sugar dating is legally distinct as it involves genuine relationships rather than explicit payment for sexual services.",
    giftTaxNote: "Nebraska has an inheritance tax (one of only six states) but no gift tax. The state income tax tops out at 5.84%. Gifts received in sugar dating are not taxable income. The federal $19,000 exclusion (2026) applies to givers. Nebraska's inheritance tax only applies at death and to certain beneficiaries.",
    ageOfConsent: 16,
    notablePoints: [
      "Omaha is home to Warren Buffett, Berkshire Hathaway, and significant finance/insurance wealth",
      "Nebraska is one of six states with an inheritance tax — but this only applies at death, not to gifts during life",
      "The state's agricultural and insurance sectors create steady, concentrated wealth",
      "Nebraska's low cost of living means moderate allowances carry substantial value"
    ],
    faqs: [
      { question: "Is sugar dating legal in Nebraska?", answer: "Yes. Sugar dating is legal in Nebraska. Consensual relationships between adults involving financial generosity are lawful. Nebraska only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Nebraska?", answer: "Omaha is the primary market, driven by Berkshire Hathaway, Mutual of Omaha, and the broader finance/insurance sector. Lincoln has a smaller scene connected to the university." },
      { question: "Does Nebraska's inheritance tax affect sugar dating?", answer: "No. Nebraska's inheritance tax only applies when someone dies and leaves assets to certain beneficiaries. Gifts given during life are not subject to this tax. There is no state gift tax." },
      { question: "Are gifts taxable in Nebraska?", answer: "Nebraska has no gift tax. Gifts are not income for recipients. The federal $19,000 annual exclusion applies to givers. The state's inheritance tax is irrelevant to living gifts." },
      { question: "What is the age of consent in Nebraska?", answer: "Nebraska's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  nevada: {
    name: "Nevada",
    slug: "nevada",
    summary: "Sugar dating is legal in Nevada. While Nevada is the only state where some forms of prostitution are legal (in licensed rural brothels), sugar dating is an entirely separate concept — it's consensual dating between adults. Las Vegas and Reno have extremely active sugar dating markets.",
    prostitutionLaw: "Nevada has a unique legal framework: prostitution is legal in licensed brothels in counties with populations under 700,000, but illegal in Clark County (Las Vegas) and Washoe County (Reno). In those counties, prostitution is a misdemeanor carrying up to 6 months and $1,000 fine under NRS 201.354. Sugar dating is distinct from both legal and illegal prostitution — it's a genuine dating relationship.",
    giftTaxNote: "Nevada has no state income tax and no gift tax. Only the federal gift tax exclusion of $19,000 per recipient per year (2026) applies. Nevada's tax-free environment is one reason it attracts wealthy residents, making it particularly attractive for sugar dating arrangements.",
    ageOfConsent: 16,
    notablePoints: [
      "Nevada's unique prostitution laws (legal in some counties, illegal in Las Vegas/Reno) create a distinctive legal landscape — sugar dating is separate from both",
      "Las Vegas is one of the top 5 sugar dating markets in the US due to tourism, entertainment, and casino wealth",
      "No state income tax makes Nevada extremely favorable for financial arrangements",
      "The constant influx of wealthy visitors makes Nevada's sugar dating market uniquely dynamic"
    ],
    faqs: [
      { question: "Is sugar dating legal in Nevada?", answer: "Yes. Sugar dating is legal everywhere in Nevada. It is a genuine dating relationship between adults — completely separate from Nevada's legal brothel system or illegal street prostitution. It's consensual dating with financial generosity." },
      { question: "Is prostitution legal in Las Vegas?", answer: "No — prostitution is illegal in Clark County (Las Vegas). It's only legal in licensed brothels in certain rural counties. Sugar dating is not prostitution in any case — it's a genuine relationship, not a sex-for-money exchange." },
      { question: "Why is Las Vegas popular for sugar dating?", answer: "The constant flow of wealthy visitors, entertainment industry money, real estate wealth, and no-income-tax environment make Las Vegas one of the most active sugar dating markets in the nation." },
      { question: "Are sugar dating gifts taxed in Nevada?", answer: "Nevada has no income tax and no gift tax. Recipients owe nothing. Givers may need to file a federal gift tax return for amounts over $19,000 per recipient per year." },
      { question: "What is the age of consent in Nevada?", answer: "Nevada's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "new-hampshire": {
    name: "New Hampshire",
    slug: "new-hampshire",
    summary: "Sugar dating is legal in New Hampshire. The 'Live Free or Die' state has a libertarian streak that extends to personal relationships. New Hampshire treats prostitution as a misdemeanor, and consensual adult dating with financial elements is fully protected.",
    prostitutionLaw: "New Hampshire classifies prostitution as a misdemeanor under RSA 645:2, carrying up to 1 year in jail and a $2,000 fine. The state focuses enforcement on trafficking rather than consensual adult activity. Sugar dating is distinct as it involves genuine relationships rather than transactional exchanges.",
    giftTaxNote: "New Hampshire has no state income tax on earned income (only on interest and dividends, being phased out) and no gift tax. This makes it one of the most tax-favorable states for both parties in a sugar dating arrangement.",
    ageOfConsent: 16,
    notablePoints: [
      "New Hampshire has no income tax on wages and no gift tax — one of the most favorable tax environments for sugar dating",
      "The state's libertarian philosophy ('Live Free or Die') creates a culturally accepting environment",
      "Proximity to Boston means many NH residents participate in the broader New England sugar dating market",
      "The Lakes Region and Upper Valley attract seasonal high-net-worth residents"
    ],
    faqs: [
      { question: "Is sugar dating legal in New Hampshire?", answer: "Yes. Sugar dating is legal in New Hampshire. The state's libertarian philosophy extends to personal relationships — consensual adult dating with financial elements is fully protected." },
      { question: "What are New Hampshire's tax advantages?", answer: "No income tax on wages, no gift tax, no sales tax. New Hampshire is one of the most tax-favorable states in the nation for both givers and receivers in sugar dating arrangements." },
      { question: "Where is sugar dating active in New Hampshire?", answer: "The southern tier (Nashua, Manchester, Portsmouth) is most active due to proximity to Boston. The Lakes Region and Hanover area attract seasonal wealth." },
      { question: "What are prostitution penalties in New Hampshire?", answer: "Prostitution is a misdemeanor (up to 1 year, $2,000). The state focuses enforcement on trafficking. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "What is the age of consent in New Hampshire?", answer: "New Hampshire's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "new-jersey": {
    name: "New Jersey",
    slug: "new-jersey",
    summary: "Sugar dating is legal in New Jersey. As one of the wealthiest states in the nation with significant finance, pharmaceutical, and tech wealth, New Jersey has a robust sugar dating market closely connected to New York City. The state treats prostitution as a disorderly persons offense.",
    prostitutionLaw: "New Jersey classifies prostitution as a disorderly persons offense (similar to a misdemeanor) under NJSA 2C:34-1, carrying up to 6 months in jail and a $1,000 fine. Promoting prostitution can be a second or third-degree crime (felony equivalent). Sugar dating is distinct as it involves genuine relationships.",
    giftTaxNote: "New Jersey eliminated its estate tax in 2018 but retains an inheritance tax on non-family transfers. There is no state gift tax. The state income tax tops out at 10.75% (one of the highest). Gifts received are not taxable income. The federal $19,000 exclusion (2026) applies.",
    ageOfConsent: 16,
    notablePoints: [
      "New Jersey's pharmaceutical corridor (Route 1, Mercer/Middlesex counties) creates concentrated executive wealth",
      "The state's proximity to NYC means many sugar dating participants work on Wall Street but live in NJ",
      "Bergen County, Hunterdon County, and Princeton have some of the highest household incomes in the nation",
      "New Jersey's high income tax (up to 10.75%) makes the tax-free nature of gifts particularly valuable"
    ],
    faqs: [
      { question: "Is sugar dating legal in New Jersey?", answer: "Yes. Sugar dating is legal in New Jersey. Consensual adult relationships involving financial generosity are lawful. NJ law only targets explicit prostitution — exchanging sex for money." },
      { question: "Where is sugar dating popular in New Jersey?", answer: "Bergen County, Hoboken/Jersey City (NYC commuters), Princeton, and the Somerset/Hunterdon county area are most active. The pharmaceutical corridor and Wall Street spillover drive the market." },
      { question: "What are New Jersey's prostitution penalties?", answer: "Prostitution is a disorderly persons offense (up to 6 months, $1,000). Sugar dating is entirely separate — it's a genuine relationship, not a transaction." },
      { question: "Are gifts taxable in New Jersey?", answer: "NJ has no gift tax. Despite the state's high income tax rates (up to 10.75%), gifts received are not income. This makes gift-based arrangements particularly tax-efficient for recipients." },
      { question: "What is the age of consent in New Jersey?", answer: "New Jersey's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "new-mexico": {
    name: "New Mexico",
    slug: "new-mexico",
    summary: "Sugar dating is legal in New Mexico. The state permits consensual adult relationships involving financial generosity. New Mexico treats prostitution as a petty misdemeanor — one of the lightest classifications in the nation.",
    prostitutionLaw: "New Mexico classifies prostitution as a petty misdemeanor under NMSA 30-9-2, carrying up to 6 months in jail and a $500 fine. This is one of the lightest penalties in the US. Promoting prostitution is a misdemeanor. Sugar dating is distinct as it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "New Mexico has no state gift tax or estate tax. The state income tax tops out at 5.9%. Gifts received in sugar dating are not taxable income. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 17,
    notablePoints: [
      "New Mexico has some of the lightest prostitution penalties in the nation (petty misdemeanor)",
      "Santa Fe's art and tourism community attracts wealthy visitors and second-home owners",
      "Los Alamos National Laboratory and Sandia National Laboratories create concentrated STEM wealth",
      "New Mexico's age of consent is 17 — Plus requires all members to be 18+"
    ],
    faqs: [
      { question: "Is sugar dating legal in New Mexico?", answer: "Yes. Sugar dating is legal in New Mexico. Consensual adult relationships involving financial generosity are fully lawful. The state treats prostitution as a mere petty misdemeanor, and sugar dating is entirely separate anyway." },
      { question: "Where is sugar dating active in New Mexico?", answer: "Santa Fe and Albuquerque are the primary markets. Santa Fe's art community and wealthy retirees, plus the national laboratory scientists in Los Alamos, create the most active demographics." },
      { question: "What are New Mexico's prostitution penalties?", answer: "Prostitution is a petty misdemeanor — one of the lightest in the US (up to 6 months, $500). Sugar dating is entirely separate as it involves genuine relationships." },
      { question: "Are gifts taxable in New Mexico?", answer: "New Mexico has no gift tax or estate tax. Gifts are not income for recipients. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in New Mexico?", answer: "New Mexico's age of consent is 17. Plus requires all members to be at least 18 years old." }
    ],
  },
  "new-york": {
    name: "New York",
    slug: "new-york",
    summary: "Sugar dating is legal in New York. As the financial capital of the world with the highest concentration of billionaires, New York has the most active sugar dating market in the United States. The state treats prostitution as a misdemeanor under the Penal Law.",
    prostitutionLaw: "New York classifies prostitution as a Class B misdemeanor under Penal Law Section 230.00, carrying up to 3 months in jail. Patronizing a prostitute is also a Class B misdemeanor. In 2021, New York repealed the 'walking while trans' loitering law, reflecting evolving attitudes. Sugar dating is distinct as it involves genuine relationships rather than explicit exchanges of sex for payment.",
    giftTaxNote: "New York has an estate tax but no state gift tax. The state income tax tops out at 10.9%, plus NYC residents pay an additional city tax up to 3.876%. Gifts received are not taxable income despite these high rates. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 17,
    notablePoints: [
      "New York City is the single most active sugar dating market in the United States",
      "Wall Street, tech (Silicon Alley), media, and fashion create unmatched wealth concentration",
      "New York's evolving approach to sex work (repealing loitering laws) reflects progressive attitudes",
      "New York's high income/city taxes make the non-taxable nature of gifts particularly valuable"
    ],
    faqs: [
      { question: "Is sugar dating legal in New York?", answer: "Yes. Sugar dating is completely legal in New York. Consensual relationships between adults that include financial generosity are protected. New York only prohibits explicit exchanges of sex for money under Penal Law 230.00." },
      { question: "How active is sugar dating in New York?", answer: "New York City is the #1 sugar dating market in the United States. The concentration of Wall Street wealth, tech founders, media executives, and fashion industry leaders creates unmatched demand and supply." },
      { question: "What are New York's prostitution penalties?", answer: "Prostitution is a Class B misdemeanor (up to 3 months). New York has been trending toward decriminalization. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "Are gifts taxable in New York?", answer: "New York has no gift tax. Despite combined state/city income tax rates that can exceed 14%, gifts received are not income. This makes sugar dating particularly tax-efficient for recipients in NYC." },
      { question: "What is the age of consent in New York?", answer: "New York's age of consent is 17. Plus requires all members to be at least 18 years old." }
    ],
  },
  "north-carolina": {
    name: "North Carolina",
    slug: "north-carolina",
    summary: "Sugar dating is legal in North Carolina. The state's growing tech scene (Research Triangle), banking hub (Charlotte), and overall economic expansion create an increasingly active market. North Carolina treats prostitution as a misdemeanor.",
    prostitutionLaw: "North Carolina classifies prostitution as a Class 1 misdemeanor under NCGS 14-204, carrying up to 120 days in jail. A second offense is a Class H felony. Promoting prostitution is a Class F felony. Sugar dating is distinct because it involves genuine relationships rather than commercial sexual transactions.",
    giftTaxNote: "North Carolina has no state gift tax or estate tax. The state has a flat income tax rate of 4.5%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "North Carolina escalates prostitution to a felony on second offense — maintaining genuine relationship character is important",
      "Charlotte's banking industry (Bank of America, Wells Fargo East Coast HQ) creates concentrated finance wealth",
      "The Research Triangle (Raleigh-Durham-Chapel Hill) has booming tech and biotech sectors",
      "North Carolina's flat 4.5% income tax is favorable compared to neighboring states"
    ],
    faqs: [
      { question: "Is sugar dating legal in North Carolina?", answer: "Yes. Sugar dating is legal in North Carolina. Consensual adult relationships involving financial generosity are lawful. NC only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in North Carolina?", answer: "Charlotte (banking wealth) and the Research Triangle (tech/biotech) are the two primary markets. Asheville and Wilmington have smaller but active scenes tied to tourism and retiree wealth." },
      { question: "What are North Carolina's prostitution penalties?", answer: "First offense is a Class 1 misdemeanor (up to 120 days). Second offense becomes a felony. Sugar dating is entirely separate — it's a genuine relationship, not a transaction." },
      { question: "Are gifts taxable in North Carolina?", answer: "NC has no gift tax or estate tax. Gifts are not income for recipients. The state's low flat income tax (4.5%) doesn't apply to gifts anyway." },
      { question: "What is the age of consent in North Carolina?", answer: "North Carolina's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "north-dakota": {
    name: "North Dakota",
    slug: "north-dakota",
    summary: "Sugar dating is legal in North Dakota. The state's oil industry has created significant wealth, particularly in the western part of the state. North Dakota treats prostitution as a misdemeanor, and genuine adult relationships are protected.",
    prostitutionLaw: "North Dakota classifies prostitution as a Class A misdemeanor under NDCC 12.1-29-03, carrying up to 360 days in jail and a $3,000 fine. Promoting prostitution is a Class C felony. Sugar dating is distinct as it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "North Dakota has no state gift tax. The state recently reduced income tax rates significantly (now 0% for most residents after 2024 reforms, with a maximum of 2.5% for highest earners). Gifts received are not taxable income.",
    ageOfConsent: 18,
    notablePoints: [
      "North Dakota's age of consent is 18, matching Plus's membership requirement",
      "The Bakken oil boom created sudden wealth in western North Dakota that persists today",
      "North Dakota effectively eliminated state income tax for most residents in recent reforms",
      "Fargo and Bismarck are the primary sugar dating markets; Williston has oil-industry wealth"
    ],
    faqs: [
      { question: "Is sugar dating legal in North Dakota?", answer: "Yes. Sugar dating is legal in North Dakota. Consensual adult relationships involving financial generosity are lawful. North Dakota only prohibits explicit exchanges of sex for money." },
      { question: "How has the oil industry affected sugar dating in North Dakota?", answer: "The Bakken oil boom created a class of high-earning workers and business owners, particularly in western ND. This has expanded the sugar dating market beyond what you'd expect for the state's population." },
      { question: "What is the age of consent in North Dakota?", answer: "North Dakota's age of consent is 18, matching Plus's membership requirement." },
      { question: "Are gifts taxable in North Dakota?", answer: "North Dakota has no gift tax and recently eliminated income tax for most residents. Gifts are not taxable income at state or federal level. The federal $19,000 exclusion applies to givers." },
      { question: "What are prostitution penalties in North Dakota?", answer: "Prostitution is a Class A misdemeanor (up to 360 days, $3,000). Sugar dating is entirely separate — it's a genuine relationship, not a transaction." }
    ],
  },
  ohio: {
    name: "Ohio",
    slug: "ohio",
    summary: "Sugar dating is legal in Ohio. With major metros in Columbus, Cleveland, and Cincinnati, Ohio has a diverse sugar dating market. The state treats prostitution as a misdemeanor for first offenses, and genuine adult relationships with financial elements are protected.",
    prostitutionLaw: "Ohio classifies prostitution as a misdemeanor of the third degree under ORC 2907.25, carrying up to 60 days in jail and a $500 fine. Subsequent offenses escalate (second: M2, third: M1). Sugar dating is distinct because it involves genuine ongoing relationships rather than discrete transactional exchanges.",
    giftTaxNote: "Ohio has no state gift tax or estate tax. The state has reduced income taxes significantly in recent years. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Ohio's three major metros (Columbus, Cleveland, Cincinnati) each have distinct sugar dating markets and demographics",
      "Columbus's tech growth and status as the fastest-growing city in the Midwest is expanding the market",
      "Ohio has no estate tax and no gift tax, simplifying financial arrangements",
      "The state's relatively low cost of living means moderate allowances carry substantial value"
    ],
    faqs: [
      { question: "Is sugar dating legal in Ohio?", answer: "Yes. Sugar dating is legal in Ohio. Consensual relationships between adults involving financial generosity are lawful. Ohio only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Ohio?", answer: "Columbus (tech, insurance), Cleveland (healthcare, manufacturing), and Cincinnati (consumer goods, finance) each have distinct markets. Columbus is growing fastest." },
      { question: "What are Ohio's prostitution penalties?", answer: "First offense is a third-degree misdemeanor (up to 60 days, $500). Penalties escalate with repeats. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "Are gifts taxable in Ohio?", answer: "Ohio has no gift tax or estate tax. Gifts are not income for recipients. The federal $19,000 annual exclusion applies to givers." },
      { question: "What is the age of consent in Ohio?", answer: "Ohio's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  oklahoma: {
    name: "Oklahoma",
    slug: "oklahoma",
    summary: "Sugar dating is legal in Oklahoma. The state's energy industry wealth creates a concentrated market, particularly in the Oklahoma City and Tulsa metros. Oklahoma treats prostitution as a misdemeanor, and genuine adult relationships are protected.",
    prostitutionLaw: "Oklahoma classifies prostitution as a misdemeanor under Title 21 Section 1029, carrying up to 1 year in jail and a $2,500 fine for a first offense. A second offense is a felony carrying up to 5 years. Sugar dating is distinct because it involves genuine relationships rather than explicit exchanges of sex for money.",
    giftTaxNote: "Oklahoma has no state gift tax or estate tax. The state income tax tops out at 4.75%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Oklahoma's energy sector (oil, natural gas) creates concentrated wealth in OKC and Tulsa",
      "The state escalates prostitution to a felony on second offense — maintaining genuine relationship elements matters",
      "Oklahoma City's growing tech and aerospace sectors are diversifying the wealth base",
      "Oklahoma has no estate tax and no gift tax, simplifying financial arrangements"
    ],
    faqs: [
      { question: "Is sugar dating legal in Oklahoma?", answer: "Yes. Sugar dating is legal in Oklahoma. Consensual adult relationships involving financial generosity are lawful. Oklahoma only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Oklahoma?", answer: "Oklahoma City and Tulsa dominate, driven by energy industry wealth. The nichols Hills and Edmond areas of OKC and Tulsa's Midtown have the highest concentrations of activity." },
      { question: "What are Oklahoma's prostitution penalties?", answer: "First offense is a misdemeanor (up to 1 year, $2,500). Second offense becomes a felony (up to 5 years). Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "Are gifts taxable in Oklahoma?", answer: "Oklahoma has no gift tax or estate tax. Gifts are not income for recipients. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Oklahoma?", answer: "Oklahoma's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  oregon: {
    name: "Oregon",
    slug: "oregon",
    summary: "Sugar dating is legal in Oregon. The state has a progressive culture and growing tech wealth in Portland and the surrounding area. Oregon treats prostitution as a misdemeanor, and genuine adult dating relationships with financial elements are fully protected.",
    prostitutionLaw: "Oregon classifies prostitution as a Class A misdemeanor under ORS 167.007, carrying up to 1 year in jail and a $6,250 fine. Promoting prostitution is a Class C felony. Oregon has been exploring decriminalization approaches. Sugar dating is distinct as it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "Oregon has an estate tax but no state gift tax. The state has no sales tax. Income tax tops out at 9.9%. Gifts received are not taxable income at state or federal levels. Oregon's lack of sales tax makes gift purchases and luxury experiences more affordable.",
    ageOfConsent: 18,
    notablePoints: [
      "Oregon's age of consent is 18, matching Plus's membership requirement",
      "Portland's tech sector (Intel, Nike, numerous startups) drives the primary sugar dating market",
      "Oregon has no sales tax, making luxury gifts and experiences more affordable",
      "The state's progressive culture creates less stigma around sugar dating"
    ],
    faqs: [
      { question: "Is sugar dating legal in Oregon?", answer: "Yes. Sugar dating is legal in Oregon. Consensual relationships between adults involving financial generosity are lawful. Oregon only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Oregon?", answer: "Portland dominates, particularly the Pearl District and Lake Oswego/West Linn suburbs. Bend's resort community and tech-remote workers also create an active secondary market." },
      { question: "What is the age of consent in Oregon?", answer: "Oregon's age of consent is 18, matching Plus's membership requirement. This is one of the strictest in the nation." },
      { question: "Are gifts taxable in Oregon?", answer: "Oregon has no gift tax and no sales tax. Gifts are not income for recipients despite the high state income tax (up to 9.9%). Gifts carry no tax liability for recipients." },
      { question: "What about Oregon's approach to sex work?", answer: "Oregon has been exploring decriminalization approaches, reflecting progressive attitudes. Either way, sugar dating is a genuine relationship and entirely separate from sex work." }
    ],
  },
  pennsylvania: {
    name: "Pennsylvania",
    slug: "pennsylvania",
    summary: "Sugar dating is legal in Pennsylvania. With major wealth centers in Philadelphia, Pittsburgh, and the suburban Main Line, Pennsylvania has an active market. The state treats prostitution as a misdemeanor, and genuine adult relationships with financial generosity are protected.",
    prostitutionLaw: "Pennsylvania classifies prostitution as a third-degree misdemeanor under 18 Pa.C.S. Section 5902, carrying up to 1 year in jail and a $2,500 fine. Repeat offenses escalate to second and first-degree misdemeanors. Sugar dating is distinct because it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "Pennsylvania has an inheritance tax (ranging from 0-15% depending on relationship) but no gift tax. The state income tax is a flat 3.07%. Gifts received are not taxable income. Importantly, Pennsylvania's inheritance tax does not apply to gifts made during life — only transfers at death.",
    ageOfConsent: 16,
    notablePoints: [
      "Philadelphia's finance and healthcare sectors and the Main Line suburbs create an active eastern market",
      "Pittsburgh's tech renaissance (Google, Apple, Uber, Carnegie Mellon spinoffs) has created new wealth",
      "Pennsylvania has an inheritance tax but no gift tax — gifts during life are not subject to this tax",
      "The state's flat 3.07% income tax is one of the lowest in the Northeast"
    ],
    faqs: [
      { question: "Is sugar dating legal in Pennsylvania?", answer: "Yes. Sugar dating is legal in Pennsylvania. Consensual adult relationships involving financial generosity and gifts are lawful. PA only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Pennsylvania?", answer: "Philadelphia (and the Main Line suburbs) and Pittsburgh are the two primary markets. The Lehigh Valley and State College also have activity." },
      { question: "Does Pennsylvania's inheritance tax affect sugar dating?", answer: "No. Pennsylvania's inheritance tax only applies to transfers at death. Gifts given during life are not subject to this tax. There is no state gift tax." },
      { question: "What are Pennsylvania's prostitution penalties?", answer: "First offense is a third-degree misdemeanor (up to 1 year, $2,500). Penalties escalate with repeats. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "What is the age of consent in Pennsylvania?", answer: "Pennsylvania's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "rhode-island": {
    name: "Rhode Island",
    slug: "rhode-island",
    summary: "Sugar dating is legal in Rhode Island. Notably, Rhode Island did not criminalize indoor prostitution until 2009, reflecting historically progressive attitudes. Today, genuine adult dating relationships with financial elements remain fully legal.",
    prostitutionLaw: "Rhode Island classifies prostitution as a misdemeanor under RI Gen Laws 11-34.1-2, carrying up to 6 months and a $1,000 fine for a first offense. Until 2009, indoor prostitution was not explicitly illegal in RI due to a legal loophole. Sugar dating is distinct as it involves genuine relationships rather than sex-for-money exchanges.",
    giftTaxNote: "Rhode Island has an estate tax (with a $1.77 million threshold — one of the lowest in the nation) but no state gift tax. The income tax tops out at 5.99%. Gifts received are not taxable income. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Rhode Island uniquely did not criminalize indoor prostitution until 2009, reflecting historically liberal attitudes",
      "Newport's old money and seasonal yacht community create a niche but wealthy sugar dating market",
      "Providence's proximity to Boston extends the New England sugar dating network",
      "Rhode Island's estate tax threshold is very low ($1.77M) — but this doesn't affect gifts during life"
    ],
    faqs: [
      { question: "Is sugar dating legal in Rhode Island?", answer: "Yes. Sugar dating is legal in Rhode Island. Consensual adult relationships with financial generosity are lawful. Rhode Island's historically liberal attitudes toward personal relationships extend to sugar dating." },
      { question: "What is Rhode Island's history with sex work laws?", answer: "Rhode Island uniquely did not criminalize indoor prostitution until 2009 due to a legal loophole. While that's now closed, it reflects the state's historically progressive stance. Sugar dating remains legal as a genuine relationship." },
      { question: "Where is sugar dating active in Rhode Island?", answer: "Providence is the primary market. Newport's seasonal wealthy community and yacht culture also create activity. Many RI members also connect with the broader Boston-area market." },
      { question: "Are gifts taxable in Rhode Island?", answer: "Rhode Island has no gift tax. Gifts are not income for recipients. The state does have a low estate tax threshold, but this only applies to transfers at death." },
      { question: "What is the age of consent in Rhode Island?", answer: "Rhode Island's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "south-carolina": {
    name: "South Carolina",
    slug: "south-carolina",
    summary: "Sugar dating is legal in South Carolina. The state's growing economy, coastal wealth, and retirement communities create an active market. South Carolina treats prostitution as a misdemeanor, and genuine adult relationships with financial components are protected.",
    prostitutionLaw: "South Carolina classifies prostitution as a misdemeanor under SC Code 16-15-90, carrying up to 30 days in jail and a $200 fine for a first offense. A third offense carries up to 1 year. Sugar dating is distinct because it involves genuine relationships rather than explicit exchanges of sex for money.",
    giftTaxNote: "South Carolina has no state gift tax or estate tax. The state income tax tops out at 6.4%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "South Carolina has very light first-offense prostitution penalties (30 days, $200 fine)",
      "Charleston and Hilton Head attract wealthy retirees and seasonal residents",
      "Greenville's growing corporate sector (BMW, Michelin) is expanding the sugar dating market",
      "South Carolina has no estate tax and no gift tax, simplifying financial arrangements"
    ],
    faqs: [
      { question: "Is sugar dating legal in South Carolina?", answer: "Yes. Sugar dating is legal in South Carolina. Consensual adult relationships involving financial generosity are lawful. SC only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in South Carolina?", answer: "Charleston leads due to tourism wealth and affluent residents. Greenville's corporate growth and Hilton Head's retiree community also support active scenes." },
      { question: "What are South Carolina's prostitution penalties?", answer: "First offense is 30 days and $200 — among the lightest in the nation. Sugar dating is entirely separate as it involves genuine relationships." },
      { question: "Are gifts taxable in South Carolina?", answer: "SC has no gift tax or estate tax. Gifts are not income for recipients. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in South Carolina?", answer: "South Carolina's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "south-dakota": {
    name: "South Dakota",
    slug: "south-dakota",
    summary: "Sugar dating is legal in South Dakota. The state's trust industry and lack of income tax attract significant wealth. South Dakota treats prostitution as a misdemeanor, and genuine adult relationships are fully protected.",
    prostitutionLaw: "South Dakota classifies prostitution as a Class 1 misdemeanor under SDCL 22-23-1, carrying up to 1 year in jail and a $2,000 fine. Promoting prostitution is a Class 4 felony. Sugar dating is legally distinct as it involves genuine relationships rather than explicit payment for sexual services.",
    giftTaxNote: "South Dakota has no state income tax and no gift tax. The state's trust-friendly laws attract billions in assets from wealthy individuals nationwide. Only the federal $19,000 exclusion (2026) applies. South Dakota's zero-income-tax environment makes it exceptionally favorable for financial arrangements.",
    ageOfConsent: 16,
    notablePoints: [
      "South Dakota has no state income tax, making it extremely favorable for sugar dating arrangements",
      "The state's dynasty trust industry attracts ultra-wealthy individuals from across the nation",
      "Sioux Falls's financial services sector (credit card companies) creates concentrated corporate wealth",
      "South Dakota's low cost of living means moderate allowances carry exceptional value"
    ],
    faqs: [
      { question: "Is sugar dating legal in South Dakota?", answer: "Yes. Sugar dating is legal in South Dakota. Consensual adult relationships involving financial generosity are lawful. The state only prohibits explicit exchanges of sex for money." },
      { question: "What are South Dakota's tax advantages?", answer: "No state income tax, no gift tax, and trust-friendly laws that attract enormous wealth. South Dakota is one of the most tax-favorable states in the nation for sugar dating arrangements." },
      { question: "Is sugar dating active in South Dakota?", answer: "While the population is small, Sioux Falls's financial services wealth and the influx of trust industry money create activity. Many South Dakota trust holders live elsewhere but maintain financial presence here." },
      { question: "Are gifts taxable in South Dakota?", answer: "South Dakota has no income tax and no gift tax. Recipients owe nothing. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in South Dakota?", answer: "South Dakota's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  tennessee: {
    name: "Tennessee",
    slug: "tennessee",
    summary: "Sugar dating is legal in Tennessee. Nashville's booming economy and entertainment wealth, combined with Memphis's logistics industry, create active markets. Tennessee treats prostitution as a misdemeanor but escalates for repeats.",
    prostitutionLaw: "Tennessee classifies prostitution as a Class B misdemeanor under TCA 39-13-513, carrying up to 6 months in jail and a $500 fine. A second offense is a Class A misdemeanor, and a third is a Class E felony. Sugar dating is distinct because it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "Tennessee has no state income tax (eliminated its Hall Tax on investment income in 2021) and no gift tax. Only the federal $19,000 exclusion (2026) applies. Tennessee's zero-income-tax environment makes it highly favorable for financial arrangements.",
    ageOfConsent: 18,
    notablePoints: [
      "Tennessee's age of consent is 18, matching Plus's membership requirement",
      "Nashville's explosive growth in tech, healthcare, and entertainment has made it a top-10 sugar dating market",
      "No state income tax (eliminated Hall Tax in 2021) makes Tennessee extremely tax-favorable",
      "Tennessee escalates prostitution to a felony on third offense — genuine relationship elements matter"
    ],
    faqs: [
      { question: "Is sugar dating legal in Tennessee?", answer: "Yes. Sugar dating is legal in Tennessee. Consensual adult relationships involving financial generosity are lawful. Tennessee only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Tennessee?", answer: "Nashville leads by far, driven by its booming tech, healthcare, and entertainment sectors. Memphis and Chattanooga also have active scenes." },
      { question: "What are Tennessee's tax advantages?", answer: "Tennessee has no state income tax and no gift tax. This makes it one of the most favorable states for sugar dating from a financial perspective." },
      { question: "What are Tennessee's prostitution penalties?", answer: "First offense is a Class B misdemeanor (6 months, $500). Third offense is a felony. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "What is the age of consent in Tennessee?", answer: "Tennessee's age of consent is 18, matching Plus's membership requirement." }
    ],
  },
  texas: {
    name: "Texas",
    slug: "texas",
    summary: "Sugar dating is legal in Texas. As the second-largest state with massive wealth in energy, tech, finance, and real estate, Texas has one of the most active sugar dating markets in the country. The state treats prostitution as a misdemeanor for first offenses.",
    prostitutionLaw: "Texas classifies prostitution as a Class B misdemeanor under Texas Penal Code 43.02 for a first offense, carrying up to 180 days in jail and a $2,000 fine. Second offense is a Class A misdemeanor, and third is a state jail felony. Sugar dating is distinct because it involves genuine relationships rather than explicit exchanges of sex for payment.",
    giftTaxNote: "Texas has no state income tax and no gift tax. Only the federal $19,000 exclusion per recipient per year (2026) applies. Texas's tax-free environment and large wealth pools make it one of the most attractive states for sugar dating from a financial perspective.",
    ageOfConsent: 17,
    notablePoints: [
      "Texas has no state income tax, making financial arrangements extremely tax-favorable",
      "Houston (energy), Dallas (finance/tech), Austin (tech), and San Antonio each have distinct markets",
      "Texas escalates prostitution to a felony on third offense — genuine relationship character is important",
      "Corporate relocations to Texas (Tesla, Oracle, Caterpillar) continue expanding the wealth base"
    ],
    faqs: [
      { question: "Is sugar dating legal in Texas?", answer: "Yes. Sugar dating is completely legal in Texas. Consensual relationships between adults involving financial generosity are lawful. Texas only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating most active in Texas?", answer: "Houston (energy wealth), Dallas (finance/real estate), and Austin (tech) are the three largest markets. San Antonio and Fort Worth also have active scenes. Texas is consistently a top-3 state for sugar dating activity." },
      { question: "What are Texas's prostitution penalties?", answer: "First offense is a Class B misdemeanor (up to 180 days, $2,000). Third offense becomes a state jail felony. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "Are sugar dating gifts taxed in Texas?", answer: "Texas has no income tax and no gift tax. Recipients owe nothing on gifts received. Givers may file a federal return for gifts over $19,000 per recipient per year." },
      { question: "What is the age of consent in Texas?", answer: "Texas's age of consent is 17. Plus requires all members to be at least 18 years old." }
    ],
  },
  utah: {
    name: "Utah",
    slug: "utah",
    summary: "Sugar dating is legal in Utah. Despite the state's conservative reputation, consensual adult relationships with financial elements are protected. Utah treats prostitution as a misdemeanor, and genuine dating relationships are clearly distinguished from illegal activity.",
    prostitutionLaw: "Utah classifies prostitution as a Class B misdemeanor under Utah Code 76-10-1302, carrying up to 6 months in jail and a $1,000 fine. Patronizing a prostitute is also a Class B misdemeanor. Sugar dating is legally distinct because it involves genuine relationships rather than explicit exchanges of sex for money.",
    giftTaxNote: "Utah has no state gift tax. The state has a flat income tax rate of 4.65%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 18,
    notablePoints: [
      "Utah's age of consent is 18, matching Plus's membership requirement",
      "Salt Lake City's growing tech sector (Silicon Slopes) has created significant new wealth",
      "Utah's conservative culture means discretion is particularly valued in sugar dating",
      "Park City's resort community and wealthy second-home owners create a seasonal market"
    ],
    faqs: [
      { question: "Is sugar dating legal in Utah?", answer: "Yes. Sugar dating is legal in Utah. Despite the state's conservative reputation, consensual adult relationships involving financial generosity are fully lawful. Utah only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Utah?", answer: "Salt Lake City and the Silicon Slopes tech corridor are the primary markets. Park City attracts seasonal wealthy visitors. Discretion is particularly valued in Utah's social environment." },
      { question: "What is the age of consent in Utah?", answer: "Utah's age of consent is 18, matching Plus's requirement and making it one of the strictest states." },
      { question: "Are gifts taxable in Utah?", answer: "Utah has no gift tax. Gifts are not income for recipients under the state's flat 4.65% tax or federal law. The $19,000 federal exclusion applies to givers." },
      { question: "Is discretion important for sugar dating in Utah?", answer: "More so than in most states. Utah's tight-knit communities and conservative social norms mean that privacy features — like Plus's hidden profiles and private browsing — are especially valuable here." }
    ],
  },
  vermont: {
    name: "Vermont",
    slug: "vermont",
    summary: "Sugar dating is legal in Vermont. The state's progressive culture and seasonal wealthy visitors (ski season, fall foliage) create a niche but active market. Vermont treats prostitution as a misdemeanor, and genuine adult relationships are protected.",
    prostitutionLaw: "Vermont classifies prostitution as a misdemeanor under 13 VSA Section 2632, carrying up to 1 year in jail and a $1,000 fine. Vermont has explored decriminalization approaches. Sugar dating is distinct because it involves genuine relationships rather than explicit sex-for-money exchanges.",
    giftTaxNote: "Vermont has an estate tax but no state gift tax. The state income tax tops out at 8.75%. Gifts received are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Vermont's ski resort communities (Stowe, Killington, Manchester) attract seasonal high-net-worth visitors",
      "The state's progressive culture creates less stigma around unconventional dating",
      "Vermont has explored decriminalization of sex work, reflecting liberal attitudes",
      "Burlington's tech and healthcare sectors provide some year-round sugar dating activity"
    ],
    faqs: [
      { question: "Is sugar dating legal in Vermont?", answer: "Yes. Sugar dating is legal in Vermont. The state's progressive culture supports consensual adult relationships involving financial generosity. Vermont only prohibits explicit exchanges of sex for money." },
      { question: "Is sugar dating seasonal in Vermont?", answer: "Somewhat. Ski season (December-April) brings wealthy visitors to resort towns like Stowe and Killington. Fall foliage season also attracts tourists. Burlington maintains year-round activity." },
      { question: "What are Vermont's prostitution laws?", answer: "Prostitution is a misdemeanor (up to 1 year, $1,000). Vermont has explored decriminalization. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "Are gifts taxable in Vermont?", answer: "Vermont has no gift tax. Gifts are not income for recipients despite the state's high income tax rates (up to 8.75%). The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Vermont?", answer: "Vermont's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  virginia: {
    name: "Virginia",
    slug: "virginia",
    summary: "Sugar dating is legal in Virginia. With enormous wealth from the DC metro area, defense contractors, tech companies, and government, Northern Virginia in particular has one of the most active sugar dating markets in the eastern US. Virginia treats prostitution as a misdemeanor.",
    prostitutionLaw: "Virginia classifies prostitution as a Class 1 misdemeanor under Virginia Code 18.2-346, carrying up to 12 months in jail and a $2,500 fine. Virginia recently reformed its prostitution laws, separating them from solicitation. Sugar dating is distinct as it involves genuine relationships rather than commercial exchanges.",
    giftTaxNote: "Virginia has no state gift tax or estate tax. The state income tax tops out at 5.75%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 18,
    notablePoints: [
      "Virginia's age of consent is 18, matching Plus's membership requirement",
      "Northern Virginia (Tysons, McLean, Great Falls) has extreme wealth concentration from government contracting and tech",
      "Amazon's HQ2 in Arlington has further concentrated tech wealth in the region",
      "Virginia recently reformed its prostitution laws, reflecting evolving attitudes"
    ],
    faqs: [
      { question: "Is sugar dating legal in Virginia?", answer: "Yes. Sugar dating is legal in Virginia. Consensual adult relationships involving financial generosity are lawful. Virginia only prohibits the explicit exchange of sex for money." },
      { question: "Where is sugar dating active in Virginia?", answer: "Northern Virginia (McLean, Great Falls, Tysons, Arlington) dominates due to government contracting, tech, and lobbying wealth. Richmond and Virginia Beach also have active scenes." },
      { question: "What is the age of consent in Virginia?", answer: "Virginia's age of consent is 18, matching Plus's membership requirement." },
      { question: "How does DC proximity affect Virginia's market?", answer: "Enormously. Many of DC's highest earners — lobbyists, senior officials, defense contractors — live in Virginia. The sugar dating markets overlap completely." },
      { question: "Are gifts taxable in Virginia?", answer: "Virginia has no gift tax or estate tax. Gifts are not income for recipients. The federal $19,000 exclusion applies to givers." }
    ],
  },
  washington: {
    name: "Washington",
    slug: "washington",
    summary: "Sugar dating is legal in Washington state. With massive tech wealth from Amazon, Microsoft, and hundreds of startups, the Seattle metro has one of the most active sugar dating markets on the West Coast. Washington treats prostitution as a misdemeanor.",
    prostitutionLaw: "Washington classifies prostitution as a misdemeanor under RCW 9A.88.030, carrying up to 90 days in jail and a $1,000 fine. Patronizing a prostitute is also a misdemeanor. Washington has been exploring alternative approaches including diversion programs. Sugar dating is distinct as it involves genuine relationships.",
    giftTaxNote: "Washington has no state income tax but does have an estate tax (threshold $2.193 million). There is no gift tax. The state's lack of income tax makes financial support within sugar dating relationships tax-free at the state level. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "Washington has no state income tax, making financial arrangements highly favorable",
      "Seattle's tech wealth (Amazon, Microsoft, hundreds of startups) creates one of the deepest sugar dating pools on the West Coast",
      "The state has been exploring progressive alternatives to prostitution enforcement",
      "Bellevue and the Eastside have enormous concentrations of tech executive wealth"
    ],
    faqs: [
      { question: "Is sugar dating legal in Washington?", answer: "Yes. Sugar dating is legal in Washington state. Consensual adult relationships involving financial generosity are lawful. Washington only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Washington?", answer: "Seattle and the Eastside (Bellevue, Medina, Mercer Island) dominate, driven by Amazon, Microsoft, and startup wealth. Tacoma and the tech corridor along I-405 also have activity." },
      { question: "What are Washington's tax advantages?", answer: "No state income tax makes financial support within arrangements entirely state-tax-free. Washington has no gift tax. Only federal gift tax rules apply." },
      { question: "What are Washington's prostitution penalties?", answer: "Prostitution is a misdemeanor (up to 90 days, $1,000). Washington has been exploring diversion programs. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "What is the age of consent in Washington?", answer: "Washington's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  "west-virginia": {
    name: "West Virginia",
    slug: "west-virginia",
    summary: "Sugar dating is legal in West Virginia. The state permits consensual adult relationships involving financial generosity. West Virginia treats prostitution as a misdemeanor, and genuine dating relationships are clearly protected.",
    prostitutionLaw: "West Virginia classifies prostitution as a misdemeanor under WV Code 61-8-5, carrying up to 6 months in jail and a fine up to $250. Keeping a house of prostitution is a felony. Sugar dating is legally distinct as it involves genuine relationships rather than explicit payment for sex.",
    giftTaxNote: "West Virginia has no state gift tax or estate tax. The state income tax tops out at 5.12%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 16,
    notablePoints: [
      "West Virginia has light prostitution penalties (misdemeanor, up to $250 fine)",
      "Charleston and the Eastern Panhandle (near DC) are the primary sugar dating markets",
      "The Eastern Panhandle benefits from DC metro spillover wealth",
      "West Virginia has no estate tax and no gift tax, simplifying financial arrangements"
    ],
    faqs: [
      { question: "Is sugar dating legal in West Virginia?", answer: "Yes. Sugar dating is legal in West Virginia. Consensual adult relationships involving financial generosity are lawful. The state only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in West Virginia?", answer: "Charleston is the primary market. The Eastern Panhandle (Martinsburg, Charles Town) benefits from proximity to the DC metro area and its wealth." },
      { question: "What are West Virginia's prostitution penalties?", answer: "Prostitution is a misdemeanor with up to 6 months and a $250 fine — among the lightest in the nation. Sugar dating is entirely separate as a genuine relationship." },
      { question: "Are gifts taxable in West Virginia?", answer: "West Virginia has no gift tax or estate tax. Gifts are not income for recipients. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in West Virginia?", answer: "West Virginia's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
  wisconsin: {
    name: "Wisconsin",
    slug: "wisconsin",
    summary: "Sugar dating is legal in Wisconsin. The state's manufacturing and finance wealth, particularly in Milwaukee and Madison, creates an active market. Wisconsin treats prostitution as a misdemeanor for first offenses, and genuine adult relationships are protected.",
    prostitutionLaw: "Wisconsin classifies prostitution as a Class A misdemeanor under Wisconsin Statutes 944.30, carrying up to 9 months in jail and a $10,000 fine. A second offense is a Class H felony. Sugar dating is distinct because it involves genuine relationships rather than explicit exchanges of sex for money.",
    giftTaxNote: "Wisconsin has no state gift tax or estate tax. The state income tax tops out at 7.65%. Gifts received in sugar dating are not taxable income at state or federal levels. The federal $19,000 exclusion (2026) applies to givers.",
    ageOfConsent: 18,
    notablePoints: [
      "Wisconsin's age of consent is 18, matching Plus's membership requirement",
      "Milwaukee's manufacturing, finance, and insurance sectors drive the primary sugar dating market",
      "Wisconsin has notably high fines for prostitution ($10,000) and escalates to felony on second offense",
      "Madison's university and government community creates a secondary market"
    ],
    faqs: [
      { question: "Is sugar dating legal in Wisconsin?", answer: "Yes. Sugar dating is legal in Wisconsin. Consensual adult relationships involving financial generosity are lawful. Wisconsin only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Wisconsin?", answer: "Milwaukee leads, driven by manufacturing, finance, and insurance wealth. Madison's government and university community also supports an active scene." },
      { question: "What is the age of consent in Wisconsin?", answer: "Wisconsin's age of consent is 18, matching Plus's membership requirement." },
      { question: "What are Wisconsin's prostitution penalties?", answer: "First offense is a Class A misdemeanor (up to 9 months, $10,000 — a notably high fine). Second offense is a felony. Sugar dating is entirely separate — it's a genuine relationship." },
      { question: "Are gifts taxable in Wisconsin?", answer: "Wisconsin has no gift tax or estate tax. Gifts are not income for recipients despite the state's moderate-to-high income tax. The federal $19,000 exclusion applies to givers." }
    ],
  },
  wyoming: {
    name: "Wyoming",
    slug: "wyoming",
    summary: "Sugar dating is legal in Wyoming. The state's tax-friendly environment and natural resource wealth create a small but active market. Wyoming treats prostitution as a misdemeanor, and genuine adult relationships with financial elements are fully protected.",
    prostitutionLaw: "Wyoming classifies prostitution as a misdemeanor under WS 6-4-101, carrying up to 6 months in jail and a $750 fine. Promoting prostitution is a felony. Sugar dating is legally distinct because it involves genuine relationships rather than explicit payment for sexual services.",
    giftTaxNote: "Wyoming has no state income tax and no gift tax. Only the federal $19,000 exclusion per recipient per year (2026) applies. Wyoming's zero-tax environment and privacy-friendly trust laws attract significant wealth from out of state.",
    ageOfConsent: 16,
    notablePoints: [
      "Wyoming has no state income tax, making financial arrangements extremely tax-favorable",
      "Jackson Hole attracts ultra-wealthy visitors and second-home owners from around the world",
      "Wyoming's privacy-friendly trust laws attract wealthy individuals who value discretion",
      "The state's small population means the sugar dating market is niche but well-heeled"
    ],
    faqs: [
      { question: "Is sugar dating legal in Wyoming?", answer: "Yes. Sugar dating is legal in Wyoming. Consensual adult relationships involving financial generosity are lawful. Wyoming only prohibits explicit exchanges of sex for money." },
      { question: "Where is sugar dating active in Wyoming?", answer: "Jackson Hole dominates due to its concentration of ultra-wealthy residents and visitors. Cheyenne and Casper have smaller markets tied to energy and government wealth." },
      { question: "What are Wyoming's tax advantages?", answer: "No state income tax, no gift tax, and privacy-friendly trust laws. Wyoming is one of the most favorable states in the nation for financial arrangements." },
      { question: "Are gifts taxable in Wyoming?", answer: "Wyoming has no income tax and no gift tax. Recipients owe nothing at the state level. The federal $19,000 exclusion applies to givers." },
      { question: "What is the age of consent in Wyoming?", answer: "Wyoming's age of consent is 16. Plus requires all members to be at least 18 years old." }
    ],
  },
};

export const STATE_SLUGS = Object.keys(STATES);

/* ─── Static generation ────────────────────────────────────────── */

export function generateStaticParams() {
  return STATE_SLUGS.map((state) => ({ state }));
}

export const dynamicParams = false;

/* ─── Metadata ─────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = STATES[slug];
  if (!state) return {};

  return {
    title: `Is Sugar Dating Legal in ${state.name}? 2026 Guide | Plus`,
    description: `Is sugar dating legal in ${state.name}? Yes. Learn about ${state.name}'s prostitution laws, gift tax rules, and age of consent. Complete 2026 legal guide.`,
    alternates: { canonical: `https://meetyourplus.com/sugar-dating-laws/${slug}` },
    openGraph: {
      title: `Is Sugar Dating Legal in ${state.name}? 2026 Guide | Plus`,
      description: `Sugar dating is legal in ${state.name}. Understand the laws, tax implications, and how to stay protected.`,
      url: `https://meetyourplus.com/sugar-dating-laws/${slug}`,
      siteName: "Plus",
      type: "article",
    },
  };
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default async function StateLawPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = STATES[slug];
  if (!state) return null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://meetyourplus.com" },
      { "@type": "ListItem", position: 2, name: "Sugar Dating Laws", item: "https://meetyourplus.com/sugar-dating-laws/california" },
      { "@type": "ListItem", position: 3, name: state.name, item: `https://meetyourplus.com/sugar-dating-laws/${state.slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: state.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="px-5 md:px-10 lg:px-16 pt-10 md:pt-24 lg:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-8 md:mb-10">
            Sugar dating laws
          </p>
          <h1 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-tight max-w-5xl mb-0">
            Is Sugar Dating Legal in {state.name}? (2026)
          </h1>
          <div className="mt-10 md:mt-14 max-w-3xl">
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Complete legal guide to sugar dating in {state.name} — prostitution
              laws, gift tax considerations, age of consent, and how to protect yourself.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ QUICK ANSWER BOX ═══ */}
      <section className="px-5 md:px-10 lg:px-16 pb-14 md:pb-20">
        <div className="max-w-3xl border border-accent/30 bg-accent/5 rounded-lg p-6 md:p-10">
          <div className="flex items-start gap-4">
            <span className="text-accent text-2xl font-bold flex-shrink-0">&#10003;</span>
            <div>
              <h2 className="font-display text-xl md:text-2xl mb-4">
                Yes, sugar dating is legal in {state.name}.
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {state.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROSTITUTION LAW SECTION ═══ */}
      <section className="bg-card border-y border-card-border">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-28 max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24">
            <div>
              <p className="text-accent text-xs tracking-[0.4em] uppercase mb-5">The law</p>
              <h2 className="font-display text-2xl md:text-3xl leading-snug">
                How {state.name} defines prostitution (and why sugar dating is different)
              </h2>
            </div>
            <div className="space-y-5 text-sm text-muted leading-relaxed">
              <p>{state.prostitutionLaw}</p>
              <p>
                The critical distinction is intent and structure. Sugar dating involves a{" "}
                <span className="text-foreground font-medium">genuine relationship</span>{" "}
                — companionship, emotional connection, shared experiences, and mentorship —
                where financial generosity is one component among many. Prostitution, by
                contrast, involves an explicit, direct exchange of sex for money with no
                relationship element.
              </p>
              <p>
                As long as your arrangement involves real dating — conversation, connection,
                spending time together — and financial support flows as part of that
                relationship rather than as direct payment for specific sexual acts, you are
                operating fully within {state.name} law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GIFT TAX SECTION ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:py-28">
        <div className="max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24">
            <div>
              <p className="text-accent text-xs tracking-[0.4em] uppercase mb-5">Taxes</p>
              <h2 className="font-display text-2xl md:text-3xl leading-snug">
                Gift vs. income: tax considerations in {state.name}
              </h2>
            </div>
            <div className="space-y-5 text-sm text-muted leading-relaxed">
              <p>{state.giftTaxNote}</p>
              <div className="border-l-2 border-accent pl-6 py-2">
                <p className="text-foreground text-sm font-medium mb-2">Key tax points for sugar dating in {state.name}:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5">+</span>
                    <span>Recipients never owe federal or state tax on genuine gifts</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5">+</span>
                    <span>The 2026 federal gift tax exclusion is $19,000 per recipient per year</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5">+</span>
                    <span>Givers may need to file Form 709 for gifts above the exclusion (but rarely owe tax)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5">+</span>
                    <span>The lifetime federal exemption is $13.99 million (2026)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AGE OF CONSENT ═══ */}
      <section className="bg-card border-y border-card-border">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-28 max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24">
            <div>
              <p className="text-accent text-xs tracking-[0.4em] uppercase mb-5">Age requirements</p>
              <h2 className="font-display text-2xl md:text-3xl leading-snug">
                Age of consent in {state.name}
              </h2>
            </div>
            <div className="space-y-5 text-sm text-muted leading-relaxed">
              <p>
                The age of consent in {state.name} is{" "}
                <span className="text-foreground font-medium">{state.ageOfConsent}</span>.
                {state.ageOfConsent < 18
                  ? ` However, Plus requires all members to be at least 18 years old — regardless of ${state.name}'s age of consent. We strongly recommend that all sugar dating participants be legal adults (18+).`
                  : ` This matches Plus's requirement that all members be at least 18 years old. ${state.name} is one of the states with the strictest age of consent laws in the nation.`}
              </p>
              <p>
                Age of consent laws determine the minimum age at which a person can legally
                consent to sexual activity. Sugar dating, while not inherently sexual,
                involves adult relationships where both parties should have the maturity and
                legal capacity to make informed decisions about their lives and finances.
              </p>
              <div className="bg-background border border-card-border rounded-lg p-5 mt-4">
                <p className="text-foreground text-sm font-medium mb-2">Plus&apos;s policy:</p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5">+</span>
                    <span>All members must be 18 or older</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5">+</span>
                    <span>Photo verification confirms identity and age</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5">+</span>
                    <span>Underage users are immediately removed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NOTABLE POINTS ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:py-28">
        <div className="max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24">
            <div>
              <p className="text-accent text-xs tracking-[0.4em] uppercase mb-5">Key points</p>
              <h2 className="font-display text-2xl md:text-3xl leading-snug">
                What to know about sugar dating in {state.name}
              </h2>
            </div>
            <ul className="space-y-6">
              {state.notablePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-accent text-xs tracking-[0.3em] mt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-muted leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-card border-y border-card-border">
        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-28 max-w-4xl">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-10 md:mb-16">FAQ</p>
          <h2 className="font-display text-2xl md:text-3xl leading-snug mb-10 md:mb-16">
            Frequently asked questions about sugar dating laws in {state.name}
          </h2>
          <div className="space-y-8">
            {state.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-card-border pb-8 last:border-0 last:pb-0">
                <h3 className="text-base font-medium mb-3">{faq.question}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-card-border px-5 md:px-10 lg:px-16 py-16 md:py-36">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] mb-6">
            Sugar dating is legal.<br />Now find your match.
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-md mb-10">
            Plus connects verified, successful individuals with attractive people
            who value transparency. Income-verified profiles. Photo verification.
            Zero ambiguity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth?mode=register"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background text-sm tracking-wide font-medium hover:bg-accent-light transition-colors"
            >
              Create your free profile
            </Link>
            <Link
              href="/seeking-arrangement-alternative"
              className="inline-flex items-center justify-center px-10 py-4 text-sm text-muted hover:text-foreground transition-colors"
            >
              Compare to Seeking &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ RELATED READING ═══ */}
      <section className="px-5 md:px-10 lg:px-16 py-14 md:pb-28">
        <div className="max-w-7xl">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-10 md:mb-16">Related reading</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/blog/is-sugar-dating-legal"
              className="group border border-card-border rounded-lg p-5 hover:border-accent/40 transition-colors"
            >
              <h3 className="text-sm font-medium group-hover:text-accent transition-colors leading-snug">
                Is Sugar Dating Legal? The Complete Answer
              </h3>
              <p className="text-xs text-muted mt-2">Read more &rarr;</p>
            </Link>
            <Link
              href="/blog/sugar-dating-laws-by-country"
              className="group border border-card-border rounded-lg p-5 hover:border-accent/40 transition-colors"
            >
              <h3 className="text-sm font-medium group-hover:text-accent transition-colors leading-snug">
                Sugar Dating Laws by Country
              </h3>
              <p className="text-xs text-muted mt-2">Read more &rarr;</p>
            </Link>
            <Link
              href="/blog/sugar-dating-scams"
              className="group border border-card-border rounded-lg p-5 hover:border-accent/40 transition-colors"
            >
              <h3 className="text-sm font-medium group-hover:text-accent transition-colors leading-snug">
                Sugar Dating Scams: How to Protect Yourself
              </h3>
              <p className="text-xs text-muted mt-2">Read more &rarr;</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ LEGAL DISCLAIMER ═══ */}
      <section className="px-5 md:px-10 lg:px-16 pb-16">
        <div className="max-w-3xl border border-card-border rounded-lg p-5 md:p-8 bg-card">
          <p className="text-xs text-muted leading-relaxed">
            <span className="text-foreground font-medium">Legal disclaimer:</span>{" "}
            This page is for informational purposes only and does not constitute legal
            advice. Laws change, and their application varies based on specific
            circumstances. If you have questions about the legality of a specific
            arrangement, consult a licensed attorney in {state.name}. Plus is a
            dating platform, not a law firm. The information presented here was
            researched in 2026 and may not reflect subsequent legal changes.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
