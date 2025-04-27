export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="w-12 h-12 rounded-full border-4 border-neutral-100 border-t-primary-500 animate-spin"></div>
    </div>
  );
}
