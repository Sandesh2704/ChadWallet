"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, Time } from "lightweight-charts";

import type { ChartDataPoint } from "@/types";
import { getTokenChart } from "@/services/birdeye.service";

interface TradingViewChartProps {
  symbol: string;
  height?: number;
}

export function TradingViewChart({ symbol, height = 500 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const candlestickSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create chart with improved colors
    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: "#0B0E11" },
        textColor: "#848E9C",
        fontSize: 12,
      },
      grid: {
        vertLines: { color: "#1E2329", style: 1 },
        horzLines: { color: "#1E2329", style: 1 },
      },
      width: containerRef.current.clientWidth,
      height: height,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#2B3139",
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        },
      },
      rightPriceScale: {
        borderColor: "#2B3139",
        textColor: "#848E9C",
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: "#2B3139",
          width: 1,
          style: 2,
        },
        horzLine: {
          color: "#2B3139",
          width: 1,
          style: 2,
        },
      },
    });

    chartRef.current = chart;

    // Create candlestick series with improved colors
    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.applyOptions({
      upColor: "#0ECB81",
      downColor: "#F6465D",
      borderUpColor: "#0ECB81",
      borderDownColor: "#F6465D",
      wickUpColor: "#0ECB81",
      wickDownColor: "#F6465D",
      borderVisible: false,
    });
    candlestickSeriesRef.current = candlestickSeries;

    // Create volume series with improved colors
    const volumeSeries = chart.addHistogramSeries();
    volumeSeries.applyOptions({
      color: "#2B3139",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "volume",
    });
    volumeSeriesRef.current = volumeSeries;

    // Set volume scale position
    chart.priceScale("volume").applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
      borderColor: "#2B3139",
      textColor: "#848E9C",
    });

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Fetch and load data
    const loadData = async () => {
      try {
        const data = await getTokenChart(symbol, 30);
        
        if (data && data.length > 0) {
          // Format data for candlestick with proper Time type
          const candleData = data.map((d: ChartDataPoint) => ({
            time: Math.floor(d.timestamp / 1000) as Time,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
          }));

          // Format data for volume with proper Time type
          const volumeData = data.map((d: ChartDataPoint) => ({
            time: Math.floor(d.timestamp / 1000) as Time,
            value: d.volume,
            color: d.close >= d.open ? "#0ECB81" : "#F6465D",
          }));

          candlestickSeries.setData(candleData);
          volumeSeries.setData(volumeData);

          // Fit content
          chart.timeScale().fitContent();
        }
      } catch (error) {
        console.error("Failed to load chart data:", error);
      }
    };

    loadData();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
        volumeSeriesRef.current = null;
      }
    };
  }, [symbol, height]);

  // Re-fetch data when symbol changes
  useEffect(() => {
    const updateData = async () => {
      if (!candlestickSeriesRef.current || !volumeSeriesRef.current) return;

      try {
        const data = await getTokenChart(symbol, 30);
        
        if (data && data.length > 0) {
          const candleData = data.map((d: ChartDataPoint) => ({
            time: Math.floor(d.timestamp / 1000) as Time,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
          }));

          const volumeData = data.map((d: ChartDataPoint) => ({
            time: Math.floor(d.timestamp / 1000) as Time,
            value: d.volume,
            color: d.close >= d.open ? "#0ECB81" : "#F6465D",
          }));

          candlestickSeriesRef.current.setData(candleData);
          volumeSeriesRef.current.setData(volumeData);

          if (chartRef.current) {
            chartRef.current.timeScale().fitContent();
          }
        }
      } catch (error) {
        console.error("Failed to update chart data:", error);
      }
    };

    updateData();
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg overflow-hidden border border-[#2B3139]"
      style={{ height }}
    />
  );
}