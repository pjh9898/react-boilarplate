"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CoinDetail } from "@/tailwind/coinTable/types";
import { formatCurrency, formatPercentage } from "@/tailwind/coinTable/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CoinChart } from "@/tailwind/coinTable/components/CoinChart";

export default function CoinDetailPage() {
  const params = useParams();
  const coinId = params.id as string;
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoinDetail() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Coin not found");
          } else {
            setError("Failed to fetch coin data");
          }
          return;
        }

        const data = await response.json();
        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin detail:", error);
        setError("An error occurred while fetching coin data");
      } finally {
        setLoading(false);
      }
    }

    if (coinId) {
      fetchCoinDetail();
    }
  }, [coinId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="container mx-auto p-6">
        <Link
          href="/tailwind"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Market
        </Link>

        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">
              {error || "Coin not found"}
            </div>
            <div className="text-sm text-gray-600">Coin ID: {coinId}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Link
        href="/tailwind"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Market
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={coin.image?.large || coin.image?.small || coin.image?.thumb}
            alt={coin.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-xl text-gray-600 uppercase">{coin.symbol}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Current Price
            </h3>
            <p className="text-2xl font-bold">
              {formatCurrency(coin.market_data?.current_price?.krw || 0)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Market Cap
            </h3>
            <p className="text-2xl font-bold">
              {formatCurrency(coin.market_data?.market_cap?.krw || 0)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              24h Change
            </h3>
            <p
              className={`text-2xl font-bold ${
                (coin.market_data?.price_change_percentage_24h || 0) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(
                coin.market_data?.price_change_percentage_24h || 0
              )}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              24h Volume
            </h3>
            <p className="text-2xl font-bold">
              {formatCurrency(coin.market_data?.total_volume?.krw || 0)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Circulating Supply
            </h3>
            <p className="text-2xl font-bold">
              {coin.market_data?.circulating_supply?.toLocaleString() || "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Market Cap Rank
            </h3>
            <p className="text-2xl font-bold">
              #{coin.market_cap_rank || "N/A"}
            </p>
          </div>
        </div>

        {coin.description?.en && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">About {coin.name}</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: coin.description.en.substring(0, 500) + "...",
              }}
            />
          </div>
        )}
      </div>

      {/* 차트 섹션 */}
      <div className="mt-8">
        <CoinChart
          coinId={coinId}
          currentPrice={coin.market_data?.current_price?.krw || 0}
        />
      </div>
    </div>
  );
}
