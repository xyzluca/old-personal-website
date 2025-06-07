import { ExperienceList } from '../components/experience'

export const metadata = {
  title: 'Experience',
  description: 'Read about my work experience.',
}

export default function Page() {
  return (
    <section>
      <ExperienceList />
    </section>
  )
}
