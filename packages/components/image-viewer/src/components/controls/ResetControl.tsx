type ResetControlProps = {
  handleReset: () => void;
};

export const ResetControl = ({ handleReset }: ResetControlProps) => {
  return (
    <button
      onClick={handleReset}
      className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
    >
      Reset
    </button>
  );
};
