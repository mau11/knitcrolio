import Image from "next/image";
import { useState } from "react";

const YarnImage = ({ imageUrl }: { imageUrl?: string | null }) => {
  const fallbackUrl = "/images/fallbackYarn.png";
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackUrl);

  return (
    <div className="self-center border rounded-lg border-gray-300 overflow-hidden">
      <Image
        src={imgSrc}
        width={40}
        height={40}
        alt={
          imgSrc === fallbackUrl
            ? "Fallback image of default yarn ball"
            : "Yarn preview"
        }
        onError={() => setImgSrc(fallbackUrl)}
      />
    </div>
  );
};

export default YarnImage;
