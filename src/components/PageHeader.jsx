export default function PageHeader({ title, text, children }) {
  return (
    <header className="border-b border-line pb-12 pt-36 md:pb-16 md:pt-44">
      <div className="container-x">
        <h1 className="h-display text-6xl md:text-8xl">{title}</h1>
        {text && <p className="mt-5 max-w-xl text-lg text-muted">{text}</p>}
        {children}
      </div>
    </header>
  );
}
