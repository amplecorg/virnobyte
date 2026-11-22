// Leadership team and their vision statements (from "Company Body Visions", Virnobyte Private Limited).
import type { ImageMetadata } from 'astro';
import saurabh from '@/assets/team/saurabh-virnodkar.jpg';
import shubham from '@/assets/team/shubham-virnodkar.png';
import sandesh from '@/assets/team/sandesh-autade.jpg';
import sagar from '@/assets/team/sagar-bansode.webp';

export interface Leader {
  slug: string;
  name: string;
  role: string;
  /** Short area label for chips and tabs. */
  area: string;
  founder: boolean;
  photo: ImageMetadata;
  /** CSS object-position that keeps the face in frame for the portrait crop. */
  focus: string;
  vision: string[];
}

export const LEADERS: Leader[] = [
  {
    slug: 'saurabh-virnodkar',
    name: 'Mr. Saurabh Virnodkar',
    role: 'Head of Technology & Infrastructure',
    area: 'Technology',
    founder: true,
    photo: saurabh,
    focus: '50% 18%',
    vision: [
      'Virnobyte’s vision is to establish a technology-driven organization recognized for delivering resilient, secure, scalable, and future-ready IT solutions to businesses of all sizes.',
      'We are committed to continuously expanding our capabilities across IT infrastructure, enterprise hardware, networking, cybersecurity, cloud computing, data backup and recovery, systems integration, and technical support, enabling our clients to operate with greater efficiency, resilience, and confidence.',
      'At Virnobyte, technology is regarded as a strategic business enabler—addressing complex operational challenges, enhancing productivity, minimizing downtime, strengthening security, and supporting sustainable long-term growth. Our approach is centred on adopting advanced and emerging technologies while maintaining rigorous standards of quality, reliability, innovation, security, and service excellence.',
      'As Virnobyte continues to expand, the organization will strategically invest in advanced technical capabilities, skilled professionals, streamlined service delivery frameworks, robust infrastructure, and emerging technologies. The long-term objective is to establish Virnobyte as a trusted technology partner for businesses across India, delivering measurable value and supporting their ongoing digital transformation.',
    ],
  },
  {
    slug: 'shubham-virnodkar',
    name: 'Mr. Shubham Virnodkar',
    role: 'Head of Legal, Finance & Governance',
    area: 'Finance & Governance',
    founder: true,
    photo: shubham,
    focus: '50% 22%',
    vision: [
      'Virnobyte’s vision is to build a financially resilient, legally compliant, transparent, and responsibly governed organization positioned for sustainable long-term growth.',
      'The organization is committed to maintaining rigorous financial discipline, strategic budgeting, accurate financial reporting, regulatory compliance, enterprise risk management, and sound corporate governance while supporting Virnobyte’s broader strategic objectives and expansion initiatives.',
      'At Virnobyte, strong financial stewardship, legal integrity, and governance excellence are regarded as fundamental pillars for establishing credibility and long-term trust with customers, employees, business partners, investors, regulators, and other key stakeholders.',
      'As Virnobyte continues to scale, the focus will remain on developing robust financial, legal, compliance, and governance frameworks that strengthen accountability, support informed executive decision-making, mitigate organizational risk, safeguard business interests, and enable responsible expansion into new markets and strategic opportunities.',
    ],
  },
  {
    slug: 'sandesh-autade',
    name: 'Mr. Sandesh Autade',
    role: 'Head of Client Acquisition & Business Development',
    area: 'Business Development',
    founder: false,
    photo: sandesh,
    focus: '50% 25%',
    vision: [
      'Virnobyte’s vision is to cultivate enduring business relationships by developing a comprehensive understanding of each client’s technology requirements and delivering reliable, cost-efficient, scalable, and business-focused IT solutions.',
      'Our objective extends beyond the delivery of products and services. We strive to establish Virnobyte as a strategic technology partner that supports clients through professional engagement, transparent communication, responsive technical assistance, and solutions aligned with their operational and commercial priorities.',
      'Virnobyte is committed to expanding its presence across the corporate, SME, and enterprise segments by strengthening client acquisition, strategic partnerships, service excellence, and long-term account relationships.',
      'As the organization continues to grow, we will further enhance our capabilities across IT hardware, networking infrastructure, Annual Maintenance Contract services, security solutions, software support, systems integration, and technology consulting. Our focus will remain on delivering sustainable business value, strengthening customer relationships, and creating mutually beneficial partnerships that contribute to long-term growth.',
    ],
  },
  {
    slug: 'sagar-bansode',
    name: 'Mr. Sagar Bansode',
    role: 'Head of Human Resources, Administration & Legal Coordination',
    area: 'People & Administration',
    founder: false,
    photo: sagar,
    focus: '50% 22%',
    vision: [
      'Virnobyte’s vision is to cultivate a professional, disciplined, people-centric, and well-governed organization where employees are empowered to develop, perform at a high level, and contribute with confidence and accountability.',
      'The organization is committed to establishing robust human resources frameworks, transparent workplace policies, efficient administrative systems, structured employee development programs, effective legal coordination, and a positive organizational culture that supports both workforce excellence and sustainable business growth.',
      'At Virnobyte, people are recognized as a critical foundation of organizational strength. By attracting capable talent, fostering continuous professional development, maintaining equitable and transparent employment practices, and ensuring efficient administrative operations, we aim to build a dependable, engaged, and high-performing workforce.',
      'As Virnobyte continues to expand, the focus will remain on strengthening organizational structure, employee engagement, workforce governance, compliance processes, internal administration, and cross-functional coordination to support responsible, scalable, and sustainable growth.',
    ],
  },
];

/** The company-level vision: the opening line of the technology vision, which frames the other three. */
export const COMPANY_VISION =
  'To establish a technology-driven organization recognized for delivering resilient, secure, scalable, and future-ready IT solutions to businesses of all sizes — and to be a trusted technology partner for businesses across India.';
