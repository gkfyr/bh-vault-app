import Image from "next/image";
import Navbar from "../component/Navbar";
import VaultListWithPopup from "@/component/home/VaultListWithPopup";

export default function Home() {
  return (
    <>
      <div className="mx-auto w-[375px]">
        <Navbar />
        <main className="flex flex-col gap-10 px-4 pb-10">
          <div>
            <div className="flex items-center justify-between py-2">
              <h1 className="text-[32px]">Vault</h1>
              <div className="flex h-[30px] items-center gap-2 rounded-full border border-[#2F332F] px-2.5">
                <span className="text-afgrey text-[12px] leading-none">
                  Total Supply
                </span>
                <span className="text-[14px] leading-none">$7.45m</span>
              </div>
            </div>
            <div>
              <p className="text-afgrey text-[14px]">
                Supply your tokens into a secure Vault to effortlessly earn
                optimized yield
              </p>
            </div>
          </div>

          <div>
            <h1 className="">
              View My Vaults <span className="text-afgrey">(2)</span> &gt;
            </h1>
            <div className="bg-afbg_grey mt-4 flex w-full justify-between rounded-xl p-4">
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
                <h2 className="text-lg">$0.00</h2>
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
                <h2 className="text-lg">0.00%</h2>
              </div>
            </div>
          </div>

          <VaultListWithPopup />
        </main>
      </div>
    </>
  );
}
