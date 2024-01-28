// React component for a loading spinner
export default function LoadingSpinner() {
  return (
    <div className="loader">
      <div className="loader-inner">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
