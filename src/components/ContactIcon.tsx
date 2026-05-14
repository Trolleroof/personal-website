import type { ContactIcon as ContactIconName } from '@/lib/data';

interface ContactIconProps {
  name: ContactIconName;
  className?: string;
}

const ContactIcon: React.FC<ContactIconProps> = ({ name, className }) => {
  const common = {
    className,
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'github') {
    return (
      <svg {...common}>
        <path d="M9 19.4c-5 1.5-5-2.5-7-3" />
        <path d="M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.8 12.8 0 0 0-6.8 0C5.6 1.3 4.5 1.6 4.5 1.6a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 8.8c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V22" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 11v6" />
        <path d="M8 7.8v.2" />
        <path d="M12 17v-6" />
        <path d="M12 13.8c0-1.8 1-2.8 2.5-2.8s2.5 1 2.5 3v3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
};

export default ContactIcon;
