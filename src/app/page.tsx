import Image from "next/image";
import Navbar from "../component/Navbar";
import VaultInfo from "@/component/home/VaultInfo";

export default function Home() {
  return (
    <>
      <div className="mx-auto w-[375px]">
        <Navbar />
        <main className="flex flex-col gap-10 px-4 pb-10">
          <div>
            <div className="flex items-center justify-between py-2">
              <h1 className="text-[32px] font-medium tracking-tight">Vault</h1>
              <div className="flex h-[30px] items-center gap-2 rounded-full border border-[#2F332F] px-2.5">
                <span className="text-afgrey text-[12px] leading-none">
                  Total Supply
                </span>
                <span className="text-[14px] font-medium leading-none">
                  $7.45m
                </span>
              </div>
            </div>
            <div>
              <p className="text-afgrey text-[14px] tracking-tight">
                Supply your tokens into a secure Vault to effortlessly earn
                optimized yield
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-medium tracking-tight">
              View My Vaults <span className="text-afgrey">(2)</span> &gt;
            </h1>
            <div className="bg-afbg_grey mt-4 flex w-full justify-between rounded-xl p-4 font-medium">
              <div>
                <div className="text-afgrey flex text-xs">
                  <h2 className="">My Total Supply</h2>
                  <Image
                    src="/icons/info.svg"
                    alt="Logo"
                    width={12}
                    height={12}
                  />
                </div>
                <h2 className="text-lg tracking-tight">$0.00</h2>
              </div>

              <div>
                <div className="text-afgrey flex text-xs">
                  <h2 className="">My Total APY</h2>
                  <Image
                    src="/icons/info.svg"
                    alt="Logo"
                    width={12}
                    height={12}
                  />
                </div>
                <h2 className="text-lg tracking-tight">0.00%</h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-medium tracking-tight">All Vaults</h1>
            <div className="bg-afbg_grey flex h-10 w-full items-center rounded-full px-3">
              <Image
                src="/icons/search.svg"
                alt="Logo"
                width={18}
                height={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="bg-afbg_grey placeholder:text-afgrey ml-2 w-full pr-4 text-xs font-medium outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-afgrey flex justify-between text-sm">
                <h2>Vault</h2>
                <h2>APY</h2>
              </div>
              <div className="flex flex-col gap-4">
                <VaultInfo
                  imgSrc="/icons/USDT.svg"
                  tokenName="USDT"
                  apy={6.84}
                  totalAmount="225,391.26"
                  glow
                />
                <VaultInfo
                  imgSrc="/icons/XAUT.svg"
                  tokenName="ETH"
                  apy={6.84}
                  totalAmount="225,391.26"
                />
                <VaultInfo
                  imgSrc="/icons/TON.svg"
                  tokenName="TON"
                  apy={6.84}
                  totalAmount="225,391.26"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
