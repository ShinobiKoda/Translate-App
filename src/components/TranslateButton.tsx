import translate from "../assets/images/Sort_alfa.svg";

interface TranslateButtonProps {
  onClick: () => void;
}

const TranslateButton: React.FC<TranslateButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center border-white border-2 py-2 px-4 bg-[#273fa9] rounded-md cursor-pointer hover:opacity-90"
      onClick={onClick}
    >
      <img src={translate} alt="Translate" />
      <span>Translate</span>
    </button>
  );
};

export default TranslateButton;