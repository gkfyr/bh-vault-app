import Image from "next/image";

interface VaultInfoProps {
  tokenName: string;
  totalAmount: string;
  apy: number;
  glow?: boolean;
  imgSrc: string;
}

export default function VaultInfo(props: VaultInfoProps) {
  return (
    <div className="flex items-center justify-between font-medium tracking-tight">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 overflow-hidden rounded-full">
          <Image src={props.imgSrc} alt="Logo" width={24} height={24} />
        </div>
        <div>
          <h2 className="">
            {props.tokenName} <span className="text-afgrey text-sm">Vault</span>
          </h2>
          <p className="text-afgrey text-xs">${props.totalAmount}</p>
        </div>
      </div>
      <div
        className={`flex items-center gap-1 ${props.glow ? "text-[#E0FF63]" : ""} items-center`}
      >
        <p>{props.apy}%</p>

        {props.glow && (
          <Image src="/icons/subtract.svg" alt="Logo" width={14} height={14} />
        )}
      </div>
    </div>
  );
}
