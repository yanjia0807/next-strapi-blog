import React from 'react'

interface DisplaySectionProps {
  content: {
    title: string | undefined
    displayText: string | undefined
  }
}

function DisplaySection({ content }: DisplaySectionProps) {
  if (!content) return

  const { title, displayText } = content
  return (
    <div className="space-y-2 py-6 md:space-y-5">
      {title && title.length > 0 && (
        <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
          {title}
        </h1>
      )}
      {displayText && displayText.length > 0 && (
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{displayText}</p>
      )}
    </div>
  )
}

export default DisplaySection
