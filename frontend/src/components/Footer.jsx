// Bottom of every screen: the legal disclaimer + official, trusted sources.
const SOURCES = [
  { label: 'EU AI Act (full text)', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng' },
  { label: 'European Commission overview', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
  { label: 'AI Act Service Desk', url: 'https://ai-act-service-desk.ec.europa.eu/' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-disclaimer">
        This is an informational self-assessment, not legal advice.
      </p>
      <div className="footer-sources">
        <span className="footer-label">Sources</span>
        {SOURCES.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
