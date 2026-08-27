import React, { useState, useEffect } from 'react';
import { Database, Activity, Cpu, Server, Layers, Zap, HardDrive, RefreshCw, BarChart3, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { CLUSTER_NODES } from '../data/portfolioData';
import { StreamTelemetryData, ClusterNode } from '../types';

export const BigDataDashboard: React.FC = () => {
  const [streamActive, setStreamActive] = useState(true);
  const [throughputEps, setThroughputEps] = useState(1842900);
  const [latencyMs, setLatencyMs] = useState(4.2);
  const [memoryUsageGb, setMemoryUsageGb] = useState(48.6);
  const [anomaliesBlocked, setAnomaliesBlocked] = useState(942);
  const [selectedNode, setSelectedNode] = useState<ClusterNode>(CLUSTER_NODES[0]);

  // Time series stream chart data
  const [telemetryHistory, setTelemetryHistory] = useState<StreamTelemetryData[]>([
    { time: '00:00', eventsPerSec: 1650, latencyMs: 4.8, memoryMb: 42000, anomaliesDetected: 12, cpuLoad: 58 },
    { time: '00:05', eventsPerSec: 1720, latencyMs: 4.4, memoryMb: 43200, anomaliesDetected: 18, cpuLoad: 61 },
    { time: '00:10', eventsPerSec: 1890, latencyMs: 4.1, memoryMb: 44100, anomaliesDetected: 24, cpuLoad: 67 },
    { time: '00:15', eventsPerSec: 1940, latencyMs: 3.9, memoryMb: 45600, anomaliesDetected: 31, cpuLoad: 72 },
    { time: '00:20', eventsPerSec: 1810, latencyMs: 4.3, memoryMb: 46200, anomaliesDetected: 19, cpuLoad: 65 },
    { time: '00:25', eventsPerSec: 1850, latencyMs: 4.2, memoryMb: 47000, anomaliesDetected: 22, cpuLoad: 68 },
    { time: '00:30', eventsPerSec: 2100, latencyMs: 4.6, memoryMb: 48600, anomaliesDetected: 45, cpuLoad: 79 },
    { time: '00:35', eventsPerSec: 1980, latencyMs: 4.2, memoryMb: 48100, anomaliesDetected: 28, cpuLoad: 70 },
  ]);

  // Partition distribution data
  const partitionData = [
    { partition: 'P-0', events: 238, lag: 4 },
    { partition: 'P-1', events: 245, lag: 2 },
    { partition: 'P-2', events: 229, lag: 6 },
    { partition: 'P-3', events: 251, lag: 1 },
    { partition: 'P-4', events: 242, lag: 3 },
    { partition: 'P-5', events: 234, lag: 5 },
    { partition: 'P-6', events: 248, lag: 2 },
    { partition: 'P-7', events: 241, lag: 3 },
  ];

  // Engine query benchmark data
  const benchmarkData = [
    { engine: 'Standard PostgreSQL', queryTime: 420, fill: '#64748b' },
    { engine: 'Partitioned TimescaleDB', queryTime: 65, fill: '#0284c7' },
    { engine: 'AegisStream In-Memory Pipeline', queryTime: 4.2, fill: '#06b6d4' },
  ];

  // Live simulation tick
  useEffect(() => {
    let timer: any;
    if (streamActive) {
      timer = setInterval(() => {
        const delta = Math.floor(Math.random() * 24000) - 12000;
        const newThroughput = Math.max(1400000, throughputEps + delta);
        setThroughputEps(newThroughput);

        const newLatency = Number((4.1 + (Math.random() * 0.5 - 0.25)).toFixed(1));
        setLatencyMs(newLatency);

        if (Math.random() > 0.6) {
          setAnomaliesBlocked((prev) => prev + 1);
        }

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        setTelemetryHistory((prev) => [
          ...prev.slice(-11),
          {
            time: timeStr,
            eventsPerSec: Math.floor(newThroughput / 1000),
            latencyMs: newLatency,
            memoryMb: Math.floor(48000 + Math.random() * 800),
            anomaliesDetected: Math.floor(Math.random() * 5),
            cpuLoad: Math.floor(65 + Math.random() * 10),
          },
        ]);
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [streamActive, throughputEps]);

  return (
    <section id="bigdata" className="py-16 md:py-24 bg-slate-50 dark:bg-[#020617] relative transition-colors duration-200">
      
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 text-xs font-mono mb-2 font-semibold">
              <Database className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>HIGH-THROUGHPUT DISTRIBUTED COMPUTING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Big Data Processing Visualizations & Live Pipeline
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Real-time telemetry stream processing engine built on Apache Kafka, PySpark, and distributed worker nodes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStreamActive(!streamActive)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all ${
                streamActive
                  ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-400 shadow-sm dark:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-800'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${streamActive ? 'animate-spin' : ''}`} />
              <span>{streamActive ? 'LIVE INGESTION ACTIVE' : 'PAUSED'}</span>
            </button>
          </div>
        </div>

        {/* Top KPI Metrics Ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-cyan-500/30 font-mono shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
              <span>STREAM THROUGHPUT</span>
              <Activity className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              {(throughputEps / 1000000).toFixed(2)}M <span className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">EPS</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>{throughputEps.toLocaleString()} events/sec</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-slate-800 font-mono shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
              <span>PROCESSING SLA (P99)</span>
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-300 mt-1">
              {latencyMs} <span className="text-xs text-slate-500 dark:text-slate-400">ms</span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Sub-millisecond sliding aggregation
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-slate-800 font-mono shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
              <span>RAM BUFFER UTILIZATION</span>
              <HardDrive className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-300 mt-1">
              {memoryUsageGb} <span className="text-xs text-slate-500 dark:text-slate-400">GB</span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Across 5 Cluster Worker Nodes
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-slate-800 font-mono shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
              <span>ANOMALIES ISOLATED</span>
              <ShieldCheck className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-300 mt-1">
              {anomaliesBlocked} <span className="text-xs text-slate-500 dark:text-slate-400">threats</span>
            </div>
            <div className="text-[11px] text-rose-600 dark:text-rose-400/90 mt-1 font-medium">
              Vector Clustering & Z-Score Filter
            </div>
          </div>

        </div>

        {/* Middle Section: Real-time Throughput Area Chart & Partition Balancer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Streaming Area Chart */}
          <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-cyan-500/20 shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  Real-Time Event Ingestion Throughput (k EPS) vs SLA (ms)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Live multi-topic Kafka ingest buffer with continuous PySpark micro-batching
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-cyan-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/40 font-semibold">
                1-SEC ROLLING WINDOW
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="epsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      borderColor: '#06b6d4',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="eventsPerSec" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#epsGradient)" name="Events (k EPS)" />
                  <Area type="monotone" dataKey="latencyMs" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#latencyGradient)" name="Latency (ms)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Throughput Rate (k EPS)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Processing Latency (ms)
                </span>
              </div>
              <span className="text-slate-400">Zero Consumer Lag Detected</span>
            </div>
          </div>

          {/* Partition Balancer Bar Chart */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#050c18] border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Kafka Topic Partition Balancer
              </h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Dynamic round-robin event distribution across 8 consumer groups
              </p>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={partitionData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="partition" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      borderColor: '#6366f1',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="events" fill="#6366f1" radius={[4, 4, 0, 0]}>
                    {partitionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#06b6d4' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-black/60 rounded-xl border border-slate-800/80 font-mono text-[11px] space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Total Partition Balance:</span>
                <span className="text-emerald-400 font-bold">99.8% EVEN</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>Leader Replication:</span>
                <span className="text-cyan-300">3x In-Sync Replicas (ISR)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Cluster Node Health & Latency Benchmark Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Cluster Node Status Matrix */}
          <div className="lg:col-span-7 p-5 rounded-2xl bg-[#050c18] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  Distributed Cluster Node Health Matrix
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Live CPU & Memory allocation across distributed PySpark compute nodes
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                5 NODES HEALTHY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CLUSTER_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all font-mono text-xs ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                        : 'bg-black/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="font-bold text-white">{node.name}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {node.role}
                      </span>
                    </div>

                    <div className="mt-2.5 space-y-1.5 text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>CPU Load:</span>
                        <span className="text-cyan-300 font-semibold">{node.cpu}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${node.cpu}%` }} />
                      </div>

                      <div className="flex justify-between text-slate-400 text-[10px] pt-1">
                        <span>Tasks: <strong>{node.tasksRunning}</strong></span>
                        <span>TP: <strong>{node.throughput}</strong></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Engine Latency Benchmark Comparison */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#050c18] border border-cyan-500/20 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Query Execution Benchmark (100M Records)
              </h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Benchmarking aggregate query performance across data architecture layers
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {benchmarkData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{item.engine}:</span>
                    <span className="font-bold text-white">{item.queryTime} ms</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max(4, (item.queryTime / 420) * 100)}%`,
                        backgroundColor: item.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/30 font-mono text-xs text-slate-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div className="text-[11px] leading-relaxed">
                <strong>Sulaiman's Architecture Win:</strong> Combining vectorized C++ memory structures with TimescaleDB hypertable chunking achieved a <strong className="text-cyan-300">100x query speedup</strong> over standard row-oriented SQL tables.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
