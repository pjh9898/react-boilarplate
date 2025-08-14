"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Coin } from "@/tailwind/coinTable/types";
import {
  getTopCoins,
  formatCurrency,
  formatPercentage,
} from "@/tailwind/coinTable/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CoinTable() {
  const router = useRouter();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      const data = await getTopCoins(20);
      setCoins(data);
      setLoading(false);
    }

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume (24h)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              className="cursor-pointer hover:bg-blue-50"
              onClick={() => router.push(`/tailwind/coin/${coin.id}`)}
            >
              <TableCell className="font-medium">
                {coin.market_cap_rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-sm text-muted-foreground uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(coin.current_price)}
              </TableCell>
              <TableCell
                className={`text-right font-medium ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatPercentage(coin.price_change_percentage_24h)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.market_cap)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.total_volume)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
