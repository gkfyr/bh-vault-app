"use client";

import Image from "next/image";

interface VaultDetailProps {
  tokenName: string;
  totalAmount: string;
  apy: number;
  tvl: number;
  glow?: boolean;
  imgSrc: string;
  loading?: boolean;
  error?: string | null;
}

export default function VaultDetailPopup(props: VaultDetailProps) {
  return (
    <>
      <div className="flex items-start justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image src={props.imgSrc} alt={`icon`} width={40} height={40} />
          </div>
          <div>
            <h1 className="text-2xl">{props.tokenName} Multiply Vault</h1>
            <p className="text-afgrey text-xs">
              Earn on your {props.tokenName}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-afbg_grey mt-4 flex justify-between gap-3 rounded-xl p-4">
        <div>
          <p className="text-afgrey text-xs">TVL</p>
          {props.loading ? (
            <div className="bg-[#222] mt-1 h-5 w-28 animate-pulse rounded" />
          ) : props.error ? (
            <p className="text-red-400 text-xs">{props.error}</p>
          ) : (
            <p className="text-lg">${props.tvl.toLocaleString()}</p>
          )}
        </div>
        <div className="">
          <p className="text-afgrey text-xs">Total APY</p>
          <div className="flex gap-0.5">
            <p className="text-afgreen text-lg">{props.apy}%</p>
            <Image
              src="/icons/subtract.svg"
              alt="glow"
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>

      <div className="text-afgrey mt-4 flex items-center justify-between gap-4 rounded-t-xl bg-[#1D1E1D] p-4">
        <button className="text bg-afgreen h-10 w-full rounded-lg">
          Supply
        </button>
        <button className="text bg-afgreen h-10 w-full rounded-lg">
          Withdraw
        </button>
      </div>
    </>
  );
}
