import { formatDate } from 'app/blog/utils'

export type Experience = {
  company: string
  title: string
  startDate: string
  endDate: string | null
  description: string
  url?: string  // Optional URL to the company website or LinkedIn profile
}

export const experiences: Experience[] = [
  {
    company: 'RST-Gruppe',
    title: 'Working Student IT, E-Commerce & E-Learning', 
    startDate: '2023',
    endDate: null,
    description: '• Development and implementation of digital e-commerce strategies: Optimization of online shops and marketing campaigns to increase visibility and revenue.\n• Design of user-friendly web interfaces.\n• Creation of training materials: Conception and design of PowerPoint presentations for internal and external training offerings.\n• Analysis and troubleshooting: Continuous evaluation of digital tools and processes to identify efficiency improvements.',
    url: 'https://www.rst-ib.de'
  },
  {
    company: 'RST-Gruppe',
    title: 'Student Assistant',
    startDate: '2021',
    endDate: '2023',
    description: 'Student Assistant in E-Commerce',
    url: 'https://www.rst-ib.de'
  },
    {
    company: 'KD1 Designagentur',
    title: 'Graphic Design Intern',
    startDate: '2017',
    endDate: '2017',
    description: '• Observed and supported staff and management in daily operations, gaining comprehensive understanding of industry-specific workflows.\n• Assisted with office management tasks contributing to the optimization of internal processes.\n• Applied and enhanced skills in Adobe Creative Cloud applications for design-related projects.\n• Actively participated in creative brainstorming sessions, contributing ideas to the development of innovative design concepts.\n• Gained valuable insights into the graphic design profession while expanding practical skills in a real-world working environment.',
    url: 'https://www.kd1.com'
  },
]
export function getExperiences() {
  return experiences
}

export function formatExperienceDate(experience: Experience) {
  const startDate = formatDate(experience.startDate, false)
  if (!experience.endDate) {
    return `${startDate} - Present`
  }
  const endDate = formatDate(experience.endDate, false)
  return `${startDate} - ${endDate}`
}
