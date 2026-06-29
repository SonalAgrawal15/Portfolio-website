import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import TypingText from '@/components/TypingText'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaborations or inquiries.',
}
type SocialKind = 'mail' | 'linkedin' | 'instagram' | 'github'

export default function Contact() {
  const googleFormLink = 'https://docs.google.com/forms/d/your-id-here/viewform'

  const socialLinks: {
    kind: SocialKind
    href: string | undefined
    label: string
    subtext: string
  }[] = [
    {
      kind: 'mail',
      href: `mailto:${siteMetadata.email}`,
      label: 'Email',
      subtext: 'Send a direct message',
    },
    {
      kind: 'linkedin',
      href: siteMetadata.linkedin,
      label: 'LinkedIn',
      subtext: 'Connect on my professional network',
    },
    {
      kind: 'instagram',
      href: siteMetadata.instagram,
      label: 'Instagram',
      subtext: 'Follow for personal updates & stories',
    },
    {
      kind: 'github',
      href: siteMetadata.github,
      label: 'Github',
      subtext: 'Check out my side projects',
    },
  ]
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Contact
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          <TypingText
            text="Feel free to reachout to me via my socials. I'd love to connect."
            speed={50}
          />
        </p>
      </div>

      <div className="container max-w-5xl py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left Side: Clickable Social Boxes */}
          <div className="space-y-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Reach Out</h2>
            <div className="grid grid-cols-1 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.kind}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center rounded-2xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-pink-200 hover:bg-gray-50 hover:shadow-md dark:border-gray-800 dark:hover:border-pink-900 dark:hover:bg-gray-900/50"
                >
                  <div className="mr-5 transition-transform duration-300 group-hover:scale-110">
                    {/* Pass null or # to SocialIcon's href if it forces an internal <a> tag to avoid nesting <a> inside <a> */}
                    <SocialIcon kind={social.kind} href={social.href} size={8} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {social.label}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {social.subtext}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Google Form CTA */}
          <div className="group relative h-full">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-20 blur transition duration-1000 group-hover:opacity-40"></div>

            <div className="relative flex h-full flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-6 rounded-full bg-pink-50 p-4 text-pink-500 dark:bg-pink-900/20">
                <SocialIcon kind="mail" href="#" size={10} />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Drop a Message
              </h2>
              <p className="mb-8 max-w-xs text-gray-500 dark:text-gray-400">
                You can also drop in your thoughts here.
              </p>
              <a
                href={
                  'https://docs.google.com/forms/d/e/1FAIpQLSc8pvGkHH_N0XBmc2gAGrkaiizdtt5l082iPN0RH2F9JP3vxA/viewform?usp=sharing&ouid=107516730553922453967'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full transform rounded-2xl bg-gray-900 px-6 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-500"
              >
                Go to Google Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
