// Keeps all pages aligned with the same maximum width and spacing.
function PageContainer({ children }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {children}
    </main>
  );
}

export default PageContainer;