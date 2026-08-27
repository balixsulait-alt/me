export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'cybersecurity' | 'bigdata' | 'fullstack' | 'mobile';
  description: string;
  architectureDetails: string[];
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  image: string;
  featured: boolean;
  simulationType?: 'ddos' | 'sqli' | 'portscan' | 'ransomware' | 'stream';
}

export interface AttackSimulationLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRITICAL' | 'BLOCKED';
  sourceIp: string;
  target: string;
  payload: string;
  mitigation: string;
}

export interface StreamTelemetryData {
  time: string;
  eventsPerSec: number;
  latencyMs: number;
  memoryMb: number;
  anomaliesDetected: number;
  cpuLoad: number;
}

export interface ClusterNode {
  id: string;
  name: string;
  role: 'Master' | 'Worker' | 'Broker' | 'Coordinator';
  ip: string;
  status: 'healthy' | 'warning' | 'critical';
  cpu: number;
  memory: number;
  tasksRunning: number;
  throughput: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number;
    badge: string;
    description: string;
  }[];
}

export interface RoadmapMilestone {
  year: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  deliverables: string[];
}
