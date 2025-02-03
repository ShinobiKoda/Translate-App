import readAloud from "../assets/images/sound_max_fill.svg";
import copyText from "../assets/images/Copy.svg";
import translate from "../assets/images/Sort_alfa.svg";
import translateBtn from "../assets/images/Horizontal_top_left_main.svg";

interface TextAreaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  onCopy: (text: string) => void;
  onReadAloud: (text: string) => void;
  copyToast: boolean;
  onTranslate?: () => void;
  onReverseTranslate?: () => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, readOnly = false, onCopy, onReadAloud, copyToast, onTranslate, onReverseTranslate }) => {
  return (
    <div className="w-full">
      <textarea
        name="translate"
        id="translate"
        className="bg-transparent w-full border-none outline-none resize-none"
        rows={7}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      ></textarea>
      <p className="w-full text-right mb-8">{value.length}/500</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={readAloud}
            alt="read aloud"
            className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
            onClick={() => onReadAloud(value)}
          />
          <div className="relative">
            <img
              src={copyText}
              alt="copyText"
              className={`border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90 ${value.trim() === "" ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => onCopy(value)}
            />
            {copyToast && (
              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs rounded py-1 px-2">
                Copied!
              </div>
            )}
          </div>
        </div>
        {onTranslate && (
          <button
            className="flex items-center border-white border-2 py-2 px-4 bg-[#273fa9] rounded-md cursor-pointer hover:opacity-90"
            onClick={onTranslate}
          >
            <img src={translate} alt="Translate" />
            <span>Translate</span>
          </button>
        )}
        {onReverseTranslate && (
          <div
            className="p-2 border-2 border-[#4d5562] rounded-md cursor-pointer hover:opacity-90 w-10"
            onClick={onReverseTranslate}
          >
            <div className="w-10">
              <img src={translateBtn} alt="Translate" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
