import Image from "next/image";
import { useState } from "react";

type YarnImageType = {
  imageUrl?: string | null;
  size?: number;
};

const YarnImage = ({ imageUrl, size = 40 }: YarnImageType) => {
  const fallbackUrl = "/images/fallbackYarn.png";
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackUrl);

  return (
    <div className="self-center border rounded-lg border-gray-300 overflow-hidden flex w-max">
      <Image
        src={imgSrc}
        width={size}
        height={size}
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
