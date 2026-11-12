const CHARS = ' .:-=+*#';

function field(): string {
  const rows: string[] = [];
  for (let y = 0; y < 34; y++) {
    let line = '';
    for (let x = 0; x < 40; x++) {
      const dx = (x - 22) / 14;
      const dy = (y - 14) / 9;
      const r = Math.sqrt(dx * dx + dy * dy);
      let v = Math.sin(r * 7 - x * 0.18) * 0.5 + 0.5;
      v *= Math.max(0, 1 - r * 0.62);
      line += CHARS[Math.min(CHARS.length - 1, Math.floor(v * CHARS.length))];
    }
    rows.push(line);
  }
  return rows.join('\n');
}

const ASCII = field();

export default function AsciiField({ className }: { className?: string }) {
  return (
    <pre aria-hidden="true" className={className}>
      {ASCII}
    </pre>
  );
}
