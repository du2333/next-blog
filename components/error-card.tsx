export default function ErrorCard({ error }: { error: string }) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body text-base-content flex flex-col items-center mx-4">
        <h2 className="card-title text-error">Oops!</h2>
        <p>{error}</p>
      </div>
    </div>
  );
}
