"use client";

import Image from "next/image";

interface VaultInfoProps {
  tokenName: string;
  totalAmount: string;
  apy: number;
  glow?: boolean;
  imgSrc: string;
  loading?: boolean;
  error?: string | null;
}

export default function VaultInfo(props: VaultInfoProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 overflow-hidden rounded-full">
          <Image src={props.imgSrc} alt="Logo" width={24} height={24} />
        </div>
        <div>
          <h2 className="">
            {props.tokenName} <span className="text-afgrey text-sm">Vault</span>
          </h2>
          {props.loading ? (
            <div className="mt-1 h-3 w-24 animate-pulse rounded bg-[#222]" />
          ) : props.error ? (
            <p className="text-xs text-red-400">{props.error}</p>
          ) : (
            <p className="text-afgrey text-xs">${props.totalAmount}</p>
          )}
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
