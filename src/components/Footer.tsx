"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full pt-6">
      <div className="border-t border-gray-300 mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-6 space-y-4 md:space-y-0">
        <p className="text-sm ">Copyright © 2025 Knitcrolio </p>
        <a
          href="https://github.com/mau11/knitcrolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-aqua"
          aria-label="Visit Knitcrolio GitHub Repository"
        >
          <div className="text-sm flex gap-1 items-center">
            Created with
            <Image
              src="/images/fallbackYarnColor.png"
              width={20}
              height={20}
              alt="Yarn ball emoji"
            />
            by Mau
            <Image
              src="/icons/github-mark.png"
              width={20}
              height={20}
              alt="Visit GitHub repository for Knitcrolio code"
            />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
