import type { InterestIcon as InterestIconName } from '@/lib/data';

interface InterestIconProps {
  name: InterestIconName;
  className?: string;
}

const InterestIcon: React.FC<InterestIconProps> = ({ name, className }) => {
  const common = {
    className,
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'basketball') {
    return (
      <svg {...common} fill="none">
        <circle cx="12" cy="12" r="8.5" fill="currentColor" opacity="0.1" />
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5v17" />
        <path d="M3.5 12h17" />
        <path d="M5.4 6.7c3.5 1.2 5.8 3.6 6.6 5.3.8 1.7 3.1 4.1 6.6 5.3" />
        <path d="M18.6 6.7c-3.5 1.2-5.8 3.6-6.6 5.3-.8 1.7-3.1 4.1-6.6 5.3" />
      </svg>
    );
  }

  if (name === 'gamepad') {
    return (
      <svg {...common} fill="none">
        <path d="M7.5 9.5h9A4.5 4.5 0 0 1 21 14v1.8a2.2 2.2 0 0 1-3.8 1.5L15 15H9l-2.2 2.3A2.2 2.2 0 0 1 3 15.8V14a4.5 4.5 0 0 1 4.5-4.5Z" />
        <path d="M8 12v3" />
        <path d="M6.5 13.5h3" />
        <path d="M16 13h.1" />
        <path d="M18 15h.1" />
      </svg>
    );
  }

  if (name === 'camera') {
    return (
      <svg {...common} fill="none">
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M8.5 7 10 5h4l1.5 2" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    );
  }

  if (name === 'business') {
    return (
      <svg {...common} fill="none">
        <path d="M4 20V8l8-4 8 4v12" />
        <path d="M9 20v-6h6v6" />
        <path d="M8 10h.1" />
        <path d="M12 10h.1" />
        <path d="M16 10h.1" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none">
      <path d="m9 18-6-6 6-6" />
      <path d="m15 6 6 6-6 6" />
      <path d="m13 4-2 16" />
    </svg>
  );
};

export default InterestIcon;
