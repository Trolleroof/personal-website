'use client';

import { useState } from 'react';
import type { ContactLink } from '@/lib/data';
import ContactIcon from './ContactIcon';

interface ContactLinkItemProps {
  contact: ContactLink;
  className: string;
  iconClassName: string;
  labelClassName?: string;
  arrowClassName?: string;
  style?: React.CSSProperties;
}

const ContactLinkItem: React.FC<ContactLinkItemProps> = ({
  contact,
  className,
  iconClassName,
  labelClassName,
  arrowClassName,
  style,
}) => {
  const [copied, setCopied] = useState(false);
  const label = copied ? 'copied!' : contact.label;
  const content = (
    <>
      <span className={iconClassName}><ContactIcon name={contact.icon} /></span>
      <span className={labelClassName}>{label}</span>
      {arrowClassName ? <span className={arrowClassName}>►</span> : null}
    </>
  );

  if (contact.copyText) {
    return (
      <button
        type="button"
        className={className}
        style={style}
        onClick={async () => {
          await navigator.clipboard.writeText(contact.copyText ?? '');
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        }}
      >
        {content}
      </button>
    );
  }

  const href = contact.href ?? '#';
  const openExternal =
    href.startsWith('http://') || href.startsWith('https://');

  return (
    <a
      href={href}
      className={className}
      style={style}
      {...(openExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {content}
    </a>
  );
};

export default ContactLinkItem;
