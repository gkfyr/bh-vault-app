import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className="flex h-[64px] w-full items-center justify-between px-4">
        <Image
          src="/icons/affluent-logo.svg"
          alt="Logo"
          width={24}
          height={24}
        />
        <div className="flex h-8 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center">
            <Image src="/icons/refresh.svg" alt="Logo" width={24} height={24} />
          </div>

          <div className="flex h-full items-center rounded-full bg-[#1D1E1D] px-2 text-[14px] leading-none text-[#c2c8c2]">
            Connect Wallet
          </div>

          <div className="flex h-8 w-8 items-center justify-center">
            <Image
              src="/icons/menu-grid-icon.svg"
              alt="Logo"
              width={28}
              height={28}
            />
          </div>
        </div>
      </div>
    </>
  );
}
