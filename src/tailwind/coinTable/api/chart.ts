export interface ChartDataPoint {
  timestamp: number;
  price: number;
}

export interface PredictionDataPoint {
  timestamp: number;
  predictedPrice: number;
  confidence: number;
}

// 과거 가격 데이터 가져오기 (24시간)
export async function getCoinChartData(
  coinId: string,
  days: number = 1
): Promise<ChartDataPoint[]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=krw&days=${days}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch chart data");
    }

    const data = await response.json();
    return data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp,
      price,
    }));
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
}

// 예측 데이터 생성 (실제 API가 없으므로 시뮬레이션)
export function generatePredictionData(
  currentPrice: number,
  hours: number[] = [1, 6, 12, 24]
): PredictionDataPoint[] {
  const now = Date.now();

  return hours.map((hour) => {
    const timestamp = now + hour * 60 * 60 * 1000;

    // 간단한 예측 시뮬레이션 (랜덤 변동)
    const volatility = 0.02; // 2% 변동성
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const predictedPrice = currentPrice * (1 + randomChange);

    // 신뢰도는 시간이 지날수록 낮아짐
    const confidence = Math.max(0.3, 1 - (hour / 24) * 0.7);

    return {
      timestamp,
      predictedPrice,
      confidence,
    };
  });
}

// 차트용 데이터 포맷팅
export function formatChartData(
  historicalData: ChartDataPoint[],
  predictionData: PredictionDataPoint[]
) {
  const historical = historicalData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    price: point.price,
    type: "historical" as const,
  }));

  const prediction = predictionData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    price: point.predictedPrice,
    confidence: point.confidence,
    type: "prediction" as const,
  }));

  return [...historical, ...prediction];
}
