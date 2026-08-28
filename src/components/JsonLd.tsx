/** Renders a schema.org `@graph` document as a single JSON-LD script tag. */
export default function JsonLd({ json }: { json: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
