import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 sm:px-8 xl:px-10">{children}</section>
  )
}
  