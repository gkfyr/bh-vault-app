"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function Interaction() {
  const [value, setValue] = useState<string>("12.03");
  const [isNumpadOpen, setIsNumpadOpen] = useState<boolean>(false);

  const cleanInput = useCallback((raw: string) => {
    if (typeof raw !== "string") return "0";
    let s = raw.replace(/[^0-9.]/g, "");
    const firstDot = s.indexOf(".");
    if (firstDot !== -1) {
      s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
    }
    const endsWithDot = s.endsWith(".");
    const parts = s.split(".");
    let intPart = parts[0] ?? "";
    let decPart = parts[1] ?? "";
    intPart = intPart.replace(/^0+(?=\d)/, "");
    decPart = decPart.slice(0, 4);
    if (firstDot !== -1) {
      if (endsWithDot && decPart.length === 0) {
        return (intPart || "0") + ".";
      }
      return (intPart || "0") + (decPart ? "." + decPart : "");
    }
    return intPart || "0";
  }, []);

  const onPress = useCallback(
    (key: string) => {
      setValue((prev) => {
        const current = prev || "0";
        if (key === "del") {
          const next = current.slice(0, -1);
          return next.length ? cleanInput(next) : "0";
        }
        if (key === ".") {
          if (current.includes(".")) return current;
          return current.length ? `${current}.` : "0.";
        }
        // numeric key: limit decimals to 4
        if (current.includes(".")) {
          const [, dec = ""] = current.split(".");
          if (dec.length >= 4) return current;
        }
        if (current === "0" && !current.includes(".")) {
          return key;
        }
        return cleanInput(`${current}${key}`);
      });
    },
    [cleanInput],
  );

  return (
    <>
      <div className="mx-auto w-[375px] pb-24">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/">
            <Image src="/icons/left-angle.svg" alt="" width={28} height={28} />
          </Link>
          <div className="flex gap-2">
            <h2 className="text-afgrey">APY</h2>
            <h2>6.88%</h2>
          </div>
        </div>
        <div className="px-4">
          <div className="flex items-center gap-2 text-xl">
            <h1 className="text-afgrey">Supply</h1>
            <div className="flex gap-1">
              <Image src="/icons/USDT.svg" alt="Logo" width={24} height={24} />
              <h2>USDT</h2>
            </div>
          </div>
          <div className="mt-[6px] flex text-sm">
            <h2 className="text-afgrey">Wallet Balance:&nbsp;</h2>
            <h2>200</h2>
          </div>

          <div className="mt-7 flex items-center gap-2 text-xl">
            <h1 className="text-afgrey">To</h1>
            <div className="flex gap-1">
              <Image src="/icons/USDT.svg" alt="Logo" width={24} height={24} />
              <h2>USDT Multiply</h2>
            </div>
          </div>
          <div className="mt-[6px] flex text-sm">
            <h2 className="text-afgrey">My Supplied:&nbsp;</h2>
            <h2>$200</h2>
          </div>

          <div className="mt-7 flex items-end justify-between gap-3">
            <div className="flex-1">
              <input
                className="w-full bg-transparent text-[40px] leading-none outline-none"
                inputMode="decimal"
                aria-label="Amount"
                value={value}
                onChange={(e) => setValue(cleanInput(e.target.value))}
                onFocus={() => setIsNumpadOpen(true)}
              />
            </div>
            <h1 className="text-afgrey text-[28px] leading-none">~${value}</h1>
          </div>
          <button className="bg-afbg_grey text-afgrey mt-[6px] h-6 rounded-[6px] px-2 text-xs">
            Use Balance 200 USDT
          </button>
        </div>
        {/* spacer bottom padding above fixed button */}
      </div>

      {/* Fixed Supply button; lifts up when numpad opens */}
      <div
        className={`fixed inset-x-0 z-30 flex h-16 items-center justify-center transition-all duration-300 ${
          isNumpadOpen ? "bottom-72" : "bottom-0"
        }`}
      >
        <div className="mx-auto w-[375px]">
          <button className="h-16 w-full bg-[#E6F5AA] text-lg text-[#17330D] active:opacity-90">
            Supply
          </button>
        </div>
      </div>

      {/* Click-away overlay to close numpad */}
      {isNumpadOpen && (
        <button
          type="button"
          className="fixed inset-0 z-10 bg-transparent"
          onClick={() => setIsNumpadOpen(false)}
          aria-label="Close numpad by clicking outside"
        />
      )}

      {/* Bottom-sheet numpad: slides up from bottom; Supply sits above */}
      <div
        className={`fixed inset-x-0 bottom-0 z-20 transition-transform duration-300 ease-out ${
          isNumpadOpen ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!isNumpadOpen}
      >
        <div className="mx-auto w-[375px] px-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((k) => (
              <button
                key={k}
                onClick={() => onPress(k)}
                className="h-14 text-2xl active:scale-95"
              >
                {k}
              </button>
            ))}
            <button
              onClick={() => onPress(".")}
              className="h-14 text-2xl active:scale-95"
              aria-label="decimal"
            >
              .
            </button>
            <button
              onClick={() => onPress("0")}
              className="h-14 text-2xl active:scale-95"
            >
              0
            </button>
            <button
              onClick={() => onPress("del")}
              className="flex h-14 items-center justify-center text-2xl active:scale-95"
              aria-label="backspace"
            >
              <Image src="/icons/arrow.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
