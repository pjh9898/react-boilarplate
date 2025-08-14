import { Coin } from "@/tailwind/coinTable/types";

export async function getTopCoins(limit: number = 20): Promise<Coin[]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&locale=ko`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coin data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return [];
  }
}

export function formatCurrency(amount: number): string {
  return (
    new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    }).format(amount) + "₩"
  );
}

export function formatPercentage(percentage: number): string {
  return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;
}
