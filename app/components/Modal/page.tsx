import errorIcon from "../../../assets/Error.png";
import Image, { StaticImageData } from "next/image";

interface PopupProps {
  onClose?: () => void;
  imageSrc: string | StaticImageData;
  message?: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, imageSrc, message }) => {
  const resolvedImageSrc = typeof imageSrc === "string" ? imageSrc : imageSrc.src;

  const isErrorIcon = typeof imageSrc === "object" && imageSrc.src === errorIcon.src;

  return (
    <div className="fixed w-[450px] h-[325px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[32px] p-[24px] px-[43px] shadow-md z-[999]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="row justify-content-center">
          <div className="text-[25.72px] flex flex-col items-center">
            <span>
              <Image src={resolvedImageSrc} alt="icon" width={60} height={60} />
            </span>
            <p className="text-black my-4">{message}</p>
            {isErrorIcon && (
              <button onClick={onClose} className="w-[200px] h-[55px] rounded-[64px] border border-[#f8b959] bg-[#f8b959] text-black">
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
