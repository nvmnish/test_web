import { MetricItem, VideoTestimonial, ComparisonRow, FaqItem, PricingTier } from '../types';

export const METRICS: MetricItem[] = [
  {
    number: 26,
    suffix: '%',
    description: 'pipeline growth at HubSpot, year over year, by tying demand work to revenue instead of activity',
    barPercentage: 55,
  },
  {
    number: 2,
    suffix: 'x',
    description: "enrollment at Dixon Academy's Harrisburg campus. 28% to 56% of 125 spots, by June 30. Roslyn's first time running any marketing at all.",
    barPercentage: 75,
  },
  {
    number: 3,
    suffix: ' months',
    description: "from Shelia's first post ever to a dentist calling her about three buildings",
    barPercentage: 60,
  },
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: '1',
    clientName: 'Sandra',
    videoSrc: '/videos/Sandra.mp4',
    poster: 'images/Sandra.png',
  },
  {
    id: '2',
    clientName: 'Alex',
    videoSrc: '/videos/Alex.mp4',
    poster: 'images/Alex.png',
  },
  {
    id: '3',
    clientName: 'No Name',
    videoSrc: '/videos/noname.mp4',
    poster: 'images/noname.png',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'work-with-me-directly',
    title: 'Work with me directly',
    subtitle: 'Ongoing. Starts at $4,000 a month. Two spots open.',
    price: '$4,000',
    cadence: '/ month',
    description: 'You talk. I turn it into a presence.',
    featureHeader: 'Every month:',
    features: [
      'Two working calls a week, where I pull your message out of you',
      'Your positioning sharpened and kept current',
      'Content created and posted for you across two accounts, three times a week',
      'Your own voice bank, built from our calls, so nothing you say gets lost',
    ],
    footerNote: 'You do not write anything.',
    idealFor: 'Best for: the owner or operator who knows what they know and has no time to say it.',
    ctaText: 'Work with me directly',
  },
  {
    id: 'the-signal-room',
    title: 'The Signal Room',
    subtitle: 'Six months. $500 a month. Eight seats.',
    price: '$500',
    cadence: '/ month',
    description: 'For marketers and owners who want to run this themselves.',
    featureHeader: 'Every month:',
    features: [
      'Weekly group call where we work on your actual content',
      'One implementation week a month, where we build the thing',
      'A resource library you keep',
      'AI does the heavy lifting, so nobody writes from scratch',
    ],
    footerNote: '$4,000 a month if I do it for you. $500 a month to learn to run it yourself.',
    idealFor: 'Best for: the marketer or agency owner who wants the method, not the service.',
    ctaText: 'Join The Signal Room',
  },
];

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: 'OUTPUT',
    gls: 'Strategy-led content that builds authority',
    others: 'Volume-driven posts that fill a calendar',
  },
  {
    dimension: 'VOICE',
    gls: 'Sounds exactly like you — no one guesses',
    others: 'Generic brand tone that could be anyone',
  },
  {
    dimension: 'RESULTS',
    gls: 'Compounding visibility over time',
    others: 'Vanity metrics with no business impact',
  },
  {
    dimension: 'FIT',
    gls: 'One on one with me or only 8 seats at a time',
    others: 'Agency model: you\'re one of 40 accounts',
  },
  {
    dimension: 'TAKEAWAY',
    gls: 'A system + clarity on messaging + done for you content',
    others: 'A disconnected calendar of random posts without compounding impact',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How much time do I actually have to spend on this?',
    answer: 'When working with me directly, two short calls a week where I pull your message out of you. We hop on a recorded conversation where I interview you on recent customer wins, tough operating decisions, or industry developments. You do not write a single word, outline, or draft. I extract the signal, write the pieces, and post them for you.',
  },
  {
    id: 'faq-2',
    question: 'What if I’ve never posted publicly or feel uncomfortable being "visible"?',
    answer: 'Most of my best clients felt the exact same way. Shelia had zero posts in her entire career before we started. We do not do cringe engagement bait, personal oversharing, or fake vulnerability. We talk purely about the craftsmanship of your work, the problems you solve, and how you think. That is what serious buyers respect.',
  },
  {
    id: 'faq-3',
    question: 'How do you capture how I talk without it sounding generic?',
    answer: 'I do not use generic questionnaires or content templates. Every piece originates from verbatim audio transcripts of our conversations. I map your specific vocabulary, pacing, mental models, and contrarian perspectives. If you use concise sentences, the copy uses concise sentences. If you speak in structured analogies, we preserve that.',
  },
  {
    id: 'faq-4',
    question: 'Do you work with in-house marketing teams or just solo founders?',
    answer: 'Both. For marketing teams, the biggest frustration is often that the team ships endless content, but nobody outside can feel it. I work alongside CMOs and marketing teams to establish the core narrative backbone, elevate the founder’s voice, and ensure demand generation actually connects to revenue instead of activity.',
  },
  {
    id: 'faq-5',
    question: 'How soon should we expect inbound inquiries or pipeline impact?',
    answer: 'Consistency compounds. Most clients see qualitative feedback (prospects mentioning posts on sales calls, peers reaching out) within the first 30 days. Direct inbound opportunities and commercial inquiries generally begin landing in month 2 to 3, as seen with Shelia and Roslyn.',
  },
  {
    id: 'faq-6',
    question: 'Is there a long-term contract?',
    answer: 'No. Everything is month-to-month after an initial 60-day setup sprint. If you feel like the message is working and pipeline is compounding, we keep going. If you ever want to pause or bring it entirely in-house, you own every framework, transcript, and asset we ever created together.',
  },
  {
    id: 'faq-7',
    question: 'What happens during the 20-minute gap check call?',
    answer: 'We review where your message is currently stalling — whether it is a founder time constraint, a lack of clear differentiation, or content that gets likes but zero inbound revenue. You walk away with 2-3 specific message adjustments you can implement immediately, whether we work together or not.',
  },
  {
    id: 'faq-8',
    question: 'I am a lot smaller than HubSpot.',
    answer: 'Good. Most of what worked at that scale was a team of a hundred solving a coordination problem you do not have. What carries over is finding the one thing your buyers need to hear. Shelia runs a construction firm and had never posted anything in her life. Three months in, a dentist called her about three buildings.',
  },
  {
    id: 'faq-9',
    question: 'I already have someone making content.',
    answer: 'Then you probably do not need me. If the calendar is written and the posts go out and the pipeline is moving, that is working. Where I help is the other version, where everything ships on schedule and nothing lands.',
  },
  {
    id: 'faq-10',
    question: 'I do not have time to be part of this.',
    answer: 'One or two calls a week. That is the whole ask. I pull the material out of those conversations rather than sending you a homework packet. Writing your own content is exactly the thing you already are not doing, so I do not build a plan that depends on you starting.',
  },
  {
    id: 'faq-11',
    question: 'How do I know this is not just posting more?',
    answer: 'You do not, until you see the gap analysis. That is why the first step is twenty minutes and not a proposal. I show you where your audience is searching, where your competitors are quiet, and which of those spaces you can own. If nothing turns up, I will say so.',
  },
];
