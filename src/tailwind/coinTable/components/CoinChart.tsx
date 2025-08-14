"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  getCoinChartData,
  generatePredictionData,
  formatChartData,
  ChartDataPoint,
  PredictionDataPoint,
} from "@/tailwind/coinTable/api/chart";
import { formatCurrency } from "@/tailwind/coinTable/api";

interface CoinChartProps {
  coinId: string;
  currentPrice: number;
}

export function CoinChart({ coinId, currentPrice }: CoinChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);

        // 과거 데이터 가져오기
        const historicalData = await getCoinChartData(coinId, 1);

        // 예측 데이터 생성
        const predictionData = generatePredictionData(currentPrice);

        // 데이터 포맷팅
        const formattedData = formatChartData(historicalData, predictionData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (coinId && currentPrice) {
      fetchChartData();
    }
  }, [coinId, currentPrice]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">차트 로딩 중...</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">가격: {formatCurrency(data.price)}</p>
          {data.type === "prediction" && (
            <p className="text-green-600">
              신뢰도: {(data.confidence * 100).toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">가격 차트 & 예측</h3>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="현재 가격"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">예측 요약</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 6, 12, 24].map((hour) => {
              const prediction = chartData.find(
                (data) =>
                  data.type === "prediction" &&
                  new Date(data.timestamp || Date.now()).getTime() ===
                    Date.now() + hour * 60 * 60 * 1000
              );

              if (!prediction) return null;

              const priceChange =
                ((prediction.price - currentPrice) / currentPrice) * 100;

              return (
                <div key={hour} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">{hour}시간 후</div>
                  <div className="text-lg font-bold">
                    {formatCurrency(prediction.price)}
                  </div>
                  <div
                    className={`text-sm ${
                      priceChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {priceChange >= 0 ? "+" : ""}
                    {priceChange.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-500">
                    신뢰도: {(prediction.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
