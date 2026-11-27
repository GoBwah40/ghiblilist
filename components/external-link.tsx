import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel'
> {
  href: string;
  /** Nom accessible, obligatoire quand le lien ne contient qu'une icône. */
  label?: string;
  children: ReactNode;
}

/** Lien sortant ouvert dans un nouvel onglet, annoncé comme tel aux lecteurs d'écran. */
const ExternalLink = ({ href, label, children, ...props }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label ? `${label} (opens in a new tab)` : undefined}
      {...props}
    >
      {children}
      {label && <span className="sr-only">{label}</span>}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
};

export default ExternalLink;
