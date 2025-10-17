"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VaultInfo from "@/component/home/VaultInfo";
import VaultDetailPopup from "@/component/home/VaultDetailPopup";

type Vault = {
  tokenName: string;
  totalAmount: string; // e.g. "225,391.26"
  apy: number;
  imgSrc: string;
};

export default function VaultListWithPopup() {
  const baseVaults = useMemo(
    () => [
      { imgSrc: "/icons/USDT.svg", tokenName: "USDT", apy: 6.84 },
      { imgSrc: "/icons/XAUT.svg", tokenName: "ETH", apy: 6.84 },
      { imgSrc: "/icons/TON.svg", tokenName: "USDC", apy: 6.84 },
    ],
    [],
  );

  const tokenToCoingeckoId: Record<string, string> = {
    ETH: "ethereum",
    USDT: "tether",
    USDC: "usd-coin",
  };

  const multipliers: Record<string, number> = {
    ETH: 10, // example units basis for TVL
    USDT: 225000,
    USDC: 215000,
  };

  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const retryDelayRef = useRef<number>(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPrices = useCallback(async () => {
    const ids = Object.values(tokenToCoingeckoId).join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const next: Record<string, number> = {};
      for (const [sym, id] of Object.entries(tokenToCoingeckoId)) {
        const v = data?.[id]?.usd;
        if (typeof v === "number") next[sym] = v;
      }
      setPrices(next);
      setLoading(false);
      retryDelayRef.current = 0;
    } catch (e: any) {
      const msg = e?.message || "가격 정보를 불러오지 못했습니다.";
      setError(msg);
      setLoading(false);
      const d = retryDelayRef.current
        ? Math.min(retryDelayRef.current * 2, 60000)
        : 5000;
      retryDelayRef.current = d;
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      retryTimerRef.current = setTimeout(fetchPrices, d);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => {
      clearInterval(interval);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [fetchPrices]);

  const vaults: Vault[] = useMemo(() => {
    const formatUSD = (n: number) =>
      n.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    return baseVaults.map((b) => {
      const p = prices[b.tokenName] ?? 0;
      const tvl = p * (multipliers[b.tokenName] ?? 1);
      return {
        ...b,
        totalAmount: tvl > 0 ? formatUSD(tvl) : "0.00",
        imgSrc: b.imgSrc,
      } as Vault;
    });
  }, [baseVaults, prices]);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Vault | null>(null);

  const open = useCallback((v: Vault) => {
    setSelected(v);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // keep selected to support closing animation; clear a bit later
    setTimeout(() => setSelected(null), 300);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const tvlFromAmount = (amount: string) => {
    const n = Number(amount.replace(/,/g, ""));
    return Number.isFinite(n) ? Math.round(n) : 0;
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg">All Vaults</h1>
      <div className="bg-afbg_grey flex h-10 w-full items-center rounded-full px-3">
        <img src="/icons/search.svg" alt="search" width={18} height={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-afbg_grey placeholder:text-afgrey ml-2 w-full pr-4 text-xs outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-afgrey flex justify-between text-sm">
          <h2>Vault</h2>
          <h2>APY</h2>
        </div>
        <div className="flex flex-col gap-4">
          {vaults.map((v, idx) => (
            <button
              key={v.tokenName + idx}
              onClick={() => open(v)}
              className="text-left"
            >
              <VaultInfo
                imgSrc={v.imgSrc}
                tokenName={v.tokenName}
                apy={v.apy}
                totalAmount={v.totalAmount}
                loading={loading}
                error={error}
                glow={idx === 0}
              />
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={close}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={
          "fixed bottom-0 left-1/2 z-50 w-[375px] -translate-x-1/2 transform rounded-t-2xl bg-[#111111] p-4 shadow-2xl transition-transform duration-300 " +
          (isOpen ? "translate-y-0" : "translate-y-full")
        }
        aria-hidden={!isOpen}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-[#2F332F]" />
        <div className="mt-3">
          {selected && (
            <VaultDetailPopup
              imgSrc={selected.imgSrc}
              tokenName={selected.tokenName}
              apy={selected.apy}
              totalAmount={selected.totalAmount}
              tvl={tvlFromAmount(selected.totalAmount)}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}
