const Loading = () => {
  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="text-foreground/60 text-lg font-medium">Loading…</p>
      <span className="sr-only">Content is loading</span>
    </div>
  );
};

export default Loading;
