
const BigLoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="w-24 h-24 border-8 border-emerald-500 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default BigLoadingSpinner;
