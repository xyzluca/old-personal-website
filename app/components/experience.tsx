import { getExperiences, formatExperienceDate } from 'app/experience/utils'
import { formatDate } from 'app/blog/utils'

export function ExperienceList() {
  const allExperiences = getExperiences()

  return (
    <div className="space-y-8">
      {allExperiences
        .sort((a, b) => {
          if (
            new Date(a.startDate) > new Date(b.startDate)
          ) {
            return -1
          }
          return 1
        })
        .map((experience, index) => (
          <div
            key={index}
            className="mb-4"
          >
            <div className="flex flex-col">
              <div className="flex flex-row items-baseline justify-between mb-1">
                <h3 className="text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {experience.title}
                </h3>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {formatDate(experience.startDate, false).split(',')[0]} - 
                  {experience.endDate 
                    ? ` ${formatDate(experience.endDate, false).split(',')[0]}` 
                    : ' Present'}
                </span>
              </div>
              <h4 className="text-neutral-800 dark:text-neutral-200 tracking-tight text-xl mb-2">
                {experience.company}
              </h4>
              {experience.description.includes('•') ? (
                <div className="text-neutral-600 dark:text-neutral-400 text-base">
                  {experience.description.split('\n').map((bullet, i) => (
                    <p key={i} className="mb-1">{bullet}</p>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-600 dark:text-neutral-400 text-base">
                  {experience.description}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

