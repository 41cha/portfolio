import {
  ArrowUpRight,
  ArrowLeft,
  List,
  X,
  GithubLogo,
  LinkedinLogo,
  TelegramLogo,
  InstagramLogo,
  EnvelopeSimple,
  CheckCircle,
  Warning,
  DownloadSimple,
  ArrowSquareOut,
} from '@phosphor-icons/react'

const icons = {
  'arrow-up-right': ArrowUpRight,
  'arrow-left': ArrowLeft,
  list: List,
  x: X,
  'github-logo': GithubLogo,
  'linkedin-logo': LinkedinLogo,
  'telegram-logo': TelegramLogo,
  'instagram-logo': InstagramLogo,
  'envelope-simple': EnvelopeSimple,
  'check-circle': CheckCircle,
  warning: Warning,
  'download-simple': DownloadSimple,
  'arrow-square-out': ArrowSquareOut,
}

export default function Icon({ name, size = 24, ...rest }) {
  const Component = icons[name]
  if (!Component) return null
  return <Component size={size} weight="regular" aria-hidden="true" {...rest} />
}
