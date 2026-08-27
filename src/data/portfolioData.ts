import { Project, SkillCategory, RoadmapMilestone, ClusterNode } from '../types';

export const PERSONAL_INFO = {
  name: 'Sulaiman Balikoowa',
  handle: 'balixsulait-alt',
  title: 'Full-Stack Dev · Ethical Hacker · Big Data Nerd · Future Founder by 2030 🚀',
  motto: 'Code it. Break it. Secure it. Analyze it.',
  email: 'balixsulait@gmail.com',
  github: 'https://github.com/balixsulait-alt',
  hackthebox: 'https://app.hackthebox.com/users/balixsulait',
  location: 'Global / Remote',
  about: `Full-stack developer fluent across modern systems programming, web frameworks, and mobile architectures. Red team thinker with deep passion for offensive security, penetration testing, digital forensics, and high-throughput big data pipelines. Currently engineering high-resiliency architectures and preparing the foundation for an autonomous AI-driven cyber defense startup targeted for 2030.`,
  stats: [
    { label: 'Security Audits & CTF Flags', value: '380+', detail: 'HackTheBox Pro & TryHackMe Top 1%' },
    { label: 'Max Data Throughput Engineered', value: '2.4M', detail: 'Events / Second (Kafka + PySpark)' },
    { label: 'CVE Research & Mitigations', value: '45+', detail: '0-Day & N-Day Exploit Defense' },
    { label: 'Core Polyglot Stacks', value: '18+', detail: 'Python, C++, Rust, TS, Go, Java, Flutter' },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Systems Programming',
    iconName: 'Terminal',
    skills: [
      { name: 'Python', level: 96, badge: 'Offensive scripts, PySpark, Django, AI', description: 'Advanced exploit crafting, socket programming & async data engines' },
      { name: 'JavaScript / TypeScript', level: 95, badge: 'React, Next.js, Node.js, Express', description: 'Full-stack enterprise architectures, WebSockets & AST analyzers' },
      { name: 'C# / .NET Core', level: 88, badge: 'High Performance & Enterprise APIs', description: 'Microservices, secure memory buffers & multi-threaded jobs' },
      { name: 'C++ / Systems', level: 86, badge: 'Memory Forensics, Raw Sockets, WinAPI', description: 'Low-level packet crafting, buffer analysis & reverse engineering' },
      { name: 'Dart / Flutter', level: 90, badge: 'Cross-Platform Secure Mobile', description: 'Hardware crypto enclave integration & offline-first sync' },
      { name: 'Java / JVM', level: 85, badge: 'Distributed Computing & Spring', description: 'Kafka consumer groups, distributed locks & enterprise logic' },
      { name: 'PHP / Laravel', level: 84, badge: 'MVC, Eloquent, Security Middleware', description: 'High-traffic backends with RBAC & rate limiting' },
      { name: 'HTML5 & Modern CSS', level: 94, badge: 'Tailwind, WebGL, Canvas', description: 'Pixel-perfect, accessible high-density command center dashboards' },
    ],
  },
  {
    title: 'Offensive Security & Red Teaming',
    iconName: 'ShieldAlert',
    skills: [
      { name: 'Penetration Testing & Red Team', level: 95, badge: 'Network, Web, AD, API', description: 'Adversary emulation, privilege escalation, lateral movement' },
      { name: 'HackTheBox & CTF Lab Mastery', level: 94, badge: 'Active Directory, Root Flags', description: 'Binary exploitation, PWN, reverse engineering & web exploitation' },
      { name: 'Metasploit & Custom Payloads', level: 92, badge: 'Exploit Dev, Post-Exploitation', description: 'Shellcode generation, multi-handler evasion, meterpreter scripting' },
      { name: 'Wireshark & Packet Forensics', level: 96, badge: 'Deep Packet Inspection, PCAP', description: 'Protocol anomaly triage, C2 beacon detection, TLS handshake analysis' },
      { name: 'Digital Forensics & Incident Response', level: 88, badge: 'Volatility, Autopsy, Yara', description: 'Memory dump extraction, timeline reconstruction & IOC hunting' },
      { name: 'Red Hat Enterprise Linux / Unix', level: 94, badge: 'Kernel Hardening, iptables/eBPF', description: 'SELinux policies, namespace isolation, systemd hardening' },
    ],
  },
  {
    title: 'Big Data & Distributed Infrastructure',
    iconName: 'Database',
    skills: [
      { name: 'Apache Kafka & Real-time Streams', level: 92, badge: 'Event Sourcing, Partitioning', description: 'Zero-loss stream processing, high-volume telemetry ingestion' },
      { name: 'PostgreSQL & TimescaleDB', level: 95, badge: 'Partitioning, Indexes, PostGIS', description: 'Complex analytical queries, window functions & connection pooling' },
      { name: 'MongoDB & NoSQL Clusters', level: 90, badge: 'Sharding, Aggregation Pipelines', description: 'Document schemas for unstructured threat feeds & forensic logs' },
      { name: 'MySQL & Oracle DB', level: 88, badge: 'PL/SQL, Replication, Stored Procs', description: 'High-availability enterprise transactional persistence' },
      { name: 'Docker & Container Security', level: 94, badge: 'Sandboxing, Multi-Stage, eBPF', description: 'Rootless execution, image vulnerability scanning & compose orchestration' },
      { name: 'Git & Automated CI/CD Pipelines', level: 95, badge: 'GitHub Actions, SAST/DAST', description: 'Automated secret scanning, linting, regression testing & deploy flows' },
    ],
  },
];

export const REALISTIC_PROJECTS: Project[] = [
  {
    id: 'apex-shield-c2',
    title: 'ApexShield C2 & Automated Penetration Engine',
    subtitle: 'Autonomous Red Team Adversary Emulation & eBPF Threat Sensor',
    category: 'cybersecurity',
    description: 'A modular Red Team command-and-control framework built for ethical adversary simulation. Features polymorphic beacon payloads, encrypted DNS/HTTPS tunnels, automated Active Directory bloodhound mapping, and eBPF-based host behavior telemetry to test blue team detection thresholds.',
    architectureDetails: [
      'Encrypted asymmetric C2 channel leveraging TLS 1.3 with automated domain fronting fallback',
      'eBPF kernel probe listeners detecting unauthorized ptrace, syscall tampering, and raw socket creation',
      'MITRE ATT&CK matrix dynamic coverage visualizer mapping over 64 sub-techniques in real-time',
      'Automated evasion evaluator testing payload detection against popular EDR and SIEM rules'
    ],
    metrics: [
      { label: 'Evasion Efficacy', value: '98.4%', change: '+14% vs legacy payloads' },
      { label: 'Telemetry Latency', value: '< 2.1 ms', change: 'Kernel-level eBPF' },
      { label: 'Simulated Vectors', value: '140+ TTPs', change: 'MITRE ATT&CK Aligned' }
    ],
    techStack: ['Python', 'C++', 'eBPF', 'Docker', 'React', 'TypeScript', 'Tailwind CSS', 'Wireshark PCAP Parser'],
    githubUrl: 'https://github.com/balixsulait-alt/apex-shield-c2',
    liveDemoUrl: '#simulator',
    image: '/src/assets/images/cyber_soc_operations_1787824303455.jpg',
    featured: true,
    simulationType: 'ddos'
  },
  {
    id: 'aegis-stream-fraud',
    title: 'AegisStream Distributed Fraud & Anomaly Engine',
    subtitle: 'Sub-millisecond Financial & Network Anomaly Detection at 1.8M EPS',
    category: 'bigdata',
    description: 'High-throughput stream processing pipeline built with Kafka and distributed workers to identify fraudulent transactions and distributed volumetric network attacks in real time. Employs sliding-window aggregations, statistical Z-score outlier detection, and vector clustering.',
    architectureDetails: [
      'Multi-partition Kafka cluster buffering raw telemetry events across 32 dedicated topic partitions',
      'Distributed streaming compute with custom sliding window state and exactly-once processing semantics',
      'TimescaleDB / PostgreSQL time-series back-end optimized with automated continuous aggregations',
      'Real-time WebSocket telemetry dispatch pushing actionable alerts to SOC dashboards'
    ],
    metrics: [
      { label: 'Peak Throughput', value: '1.8M+ EPS', change: 'Zero event drop' },
      { label: 'Processing Latency', value: '4.8 ms', change: '99th percentile SLA' },
      { label: 'Anomaly Precision', value: '99.1%', change: 'Low false positive rate' }
    ],
    techStack: ['Python', 'Apache Kafka', 'PySpark', 'PostgreSQL', 'TimescaleDB', 'Node.js', 'Docker'],
    githubUrl: 'https://github.com/balixsulait-alt/aegis-stream-engine',
    liveDemoUrl: '#bigdata',
    image: '/src/assets/images/cyber_soc_operations_1787824303455.jpg',
    featured: true,
    simulationType: 'stream'
  },
  {
    id: 'krypton-dfir-memory',
    title: 'KryptonDFIR Live Memory & Packet Investigator',
    subtitle: 'Cross-Platform Digital Forensics & Live RAM Heap Inspection Tool',
    category: 'cybersecurity',
    description: 'Forensic analysis suite for rapid incident response teams. Parses raw memory dumps (ELF/PE headers, unlinked DLLs, injected shellcode regions), correlates Wireshark pcap traffic streams, and generates courtroom-ready cryptographic artifact timelines.',
    architectureDetails: [
      'Zero-copy C++ core engine capable of parsing 64GB RAM dumps in under 45 seconds',
      'Integrated YARA signature scanner and entropy mapper flagging packed executable code',
      'Automated timeline correlation stitching file system journals (MFT/ext4), network logs, and bash histories',
      'SHA-256 / SHA3-512 chain-of-custody cryptographic verification on all extracted evidence'
    ],
    metrics: [
      { label: 'Dump Parse Velocity', value: '1.4 GB/s', change: 'Vectorized C++ IO' },
      { label: 'Artifact Accuracy', value: '100%', change: 'Cryptographically hashed' },
      { label: 'Supported OS', value: 'Linux, Win, macOS', change: 'x86_64 / ARM64' }
    ],
    techStack: ['C++', 'Rust', 'Python', 'Wireshark Libpcap', 'React', 'TypeScript', 'Linux'],
    githubUrl: 'https://github.com/balixsulait-alt/krypton-dfir',
    liveDemoUrl: '#simulator',
    image: '/src/assets/images/cyber_command_grid_1787824884180.jpg',
    featured: true,
    simulationType: 'portscan'
  },
  {
    id: 'zerotrust-edge-mesh',
    title: 'ZeroTrust Micro-Perimeter Mesh Gateway',
    subtitle: 'mTLS Identity-Aware Proxy & Layer 7 WAF Reverse Tunnel',
    category: 'fullstack',
    description: 'An enterprise edge proxy implementing NIST Zero-Trust Architecture guidelines. Every inbound connection undergoes mutual TLS client verification, dynamic JWT claims authorization, IP reputation lookups, and real-time SQLi/XSS AST parsing before forwarding to microservice backends.',
    architectureDetails: [
      'Envoy / Node.js hybrid architecture utilizing Linux netfilter IPSet tables for instant ban propagation',
      'Abstract Syntax Tree (AST) query inspector dismantling SQL and script payloads with zero regex lag',
      'Dynamic rate limiter implementing token bucket algorithm with distributed Redis token synchronization',
      'Administrative analytics dashboard providing instantaneous insight into blocked attack vectors'
    ],
    metrics: [
      { label: 'Inspection Overhead', value: '< 0.8 ms', change: 'Ultra low latency' },
      { label: 'Attacks Mitigated', value: '100k+ / day', change: 'Automated Layer 7 shield' },
      { label: 'Zero-Trust Compliance', value: '100%', change: 'NIST SP 800-207' }
    ],
    techStack: ['Node.js', 'Next.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Linux iptables'],
    githubUrl: 'https://github.com/balixsulait-alt/zerotrust-edge-mesh',
    liveDemoUrl: '#simulator',
    image: '/src/assets/images/cyber_soc_operations_1787824303455.jpg',
    featured: false,
    simulationType: 'sqli'
  },
  {
    id: 'omnivault-secure-keystore',
    title: 'OmniVault Mobile Key Management & Secure Enclave',
    subtitle: 'Military-Grade Biometric Mobile Vault with Zero-Knowledge Architecture',
    category: 'mobile',
    description: 'Cross-platform mobile application written in Flutter and Dart, with native C++/Rust cryptography bridge. Secures credentials, private keys, and encrypted notes using AES-256-GCM and Argon2id key derivation, with hardware Secure Enclave isolation.',
    architectureDetails: [
      'Hardware-backed key generation inside iOS Secure Enclave and Android StrongBox Keymaster',
      'Argon2id memory-hard key derivation protecting master passphrases from GPU cracking clusters',
      'Zero-knowledge end-to-end encrypted backup sync using ephemeral ECDH key exchange',
      'Screenshot blocking, anti-hooking Frida detection, and root/jailbreak runtime verification'
    ],
    metrics: [
      { label: 'Key Derivation Security', value: 'Argon2id', change: 'Memory hard 64MB' },
      { label: 'Encryption Standard', value: 'AES-256-GCM', change: 'Authenticated 128-bit tag' },
      { label: 'Mobile Platforms', value: 'iOS & Android', change: 'Single Flutter Codebase' }
    ],
    techStack: ['Dart', 'Flutter', 'C++', 'Rust', 'Argon2', 'Secure Enclave', 'Firebase Auth'],
    githubUrl: 'https://github.com/balixsulait-alt/omnivault-mobile',
    liveDemoUrl: '#projects',
    image: '/src/assets/images/cyber_command_grid_1787824884180.jpg',
    featured: false,
    simulationType: 'ransomware'
  },
  {
    id: 'biostream-genomic-pipeline',
    title: 'BioStream High-Volume Genomic Data Engine',
    subtitle: 'Distributed FASTA/BAM Processing Pipeline with Django & MongoDB',
    category: 'bigdata',
    description: 'A distributed big data pipeline designed to ingest, align, and index multi-gigabyte genomic sequence files. Uses Celery workers, asynchronous Django endpoints, and MongoDB sharded clusters to execute variant calling algorithms at scale.',
    architectureDetails: [
      'Chunked parallel file ingestion splitting multi-gigabyte files into vectorized streams',
      'Celery task queue distributed across worker nodes with auto-scaling compute pools',
      'MongoDB sharded collection storing billions of genomic variant coordinates with geospatial indexing',
      'Interactive visual genome track browser built with React and HTML5 Canvas'
    ],
    metrics: [
      { label: 'File Ingestion Speed', value: '12 GB / min', change: 'Parallel worker pool' },
      { label: 'Indexed Records', value: '450M+', change: 'Sharded MongoDB' },
      { label: 'Query Response', value: '< 85 ms', change: 'Compound B-Tree index' }
    ],
    techStack: ['Python', 'Django', 'Celery', 'MongoDB', 'PostgreSQL', 'Docker', 'React'],
    githubUrl: 'https://github.com/balixsulait-alt/biostream-engine',
    liveDemoUrl: '#bigdata',
    image: '/src/assets/images/cyber_soc_operations_1787824303455.jpg',
    featured: false,
    simulationType: 'stream'
  }
];

export const CLUSTER_NODES: ClusterNode[] = [
  { id: 'node-master-01', name: 'ZETA-MASTER-01', role: 'Coordinator', ip: '10.0.4.10', status: 'healthy', cpu: 28, memory: 44, tasksRunning: 142, throughput: '1.2M EPS' },
  { id: 'node-worker-01', name: 'APEX-WORKER-01', role: 'Worker', ip: '10.0.4.11', status: 'healthy', cpu: 64, memory: 72, tasksRunning: 840, throughput: '480k EPS' },
  { id: 'node-worker-02', name: 'APEX-WORKER-02', role: 'Worker', ip: '10.0.4.12', status: 'healthy', cpu: 71, memory: 78, tasksRunning: 912, throughput: '510k EPS' },
  { id: 'node-worker-03', name: 'APEX-WORKER-03', role: 'Worker', ip: '10.0.4.13', status: 'healthy', cpu: 58, memory: 65, tasksRunning: 730, throughput: '420k EPS' },
  { id: 'node-broker-01', name: 'KAFKA-BROKER-01', role: 'Broker', ip: '10.0.4.20', status: 'healthy', cpu: 42, memory: 81, tasksRunning: 32, throughput: '2.4M EPS' },
];

export const ROADMAP_2030: RoadmapMilestone[] = [
  {
    year: '2024 - 2025',
    title: 'Foundational Full-Stack Mastery & Red Team Offensive Engineering',
    status: 'completed',
    description: 'Mastered 18+ programming languages and frameworks. Reached top-tier status on HackTheBox and TryHackMe, engineered low-level C++ memory forensics engines, and built resilient distributed backends.',
    deliverables: [
      'HackTheBox Active Directory & Enterprise Lab Exploitation',
      'High-throughput Kafka streaming architecture blueprints',
      'Cross-platform Flutter cryptographic storage architecture'
    ]
  },
  {
    year: '2026 - 2027',
    title: 'Distributed Cyber Telemetry, eBPF Sensors & Big Data Ingestion',
    status: 'in-progress',
    description: 'Pioneering sub-millisecond threat detection pipelines leveraging Linux eBPF kernel instrumentation, distributed stream processors, and zero-trust edge proxies.',
    deliverables: [
      'Real-time Layer 7 DDoS mitigation kernel modules',
      'Multi-terabyte genomic & security telemetry aggregation clusters',
      'Open-source vulnerability automation tools'
    ]
  },
  {
    year: '2028 - 2029',
    title: 'Autonomous Red Team Agents & Self-Healing Cloud Fabric',
    status: 'upcoming',
    description: 'Developing autonomous AI agents capable of continuous ethical penetration testing, automated patch validation, and proactive threat modeling.',
    deliverables: [
      'Self-orchestrating adversary emulation testbed',
      'Zero-downtime automated hot-patching runtime',
      'Venture incubation and private enterprise pilot program'
    ]
  },
  {
    year: '2030 🚀',
    title: 'Launch of Autonomous CyberData AI Defense Platform (Future Founder)',
    status: 'upcoming',
    description: 'Official launch of Sulaiman Balikoowa’s cybersecurity & big data flagship enterprise, delivering automated threat neutralization and petabyte-scale intelligence to global infrastructure.',
    deliverables: [
      'Commercial enterprise platform launch',
      'Global SOC network deployment with sub-second MTTR',
      'Pioneering the future of ethical defense & data processing'
    ]
  }
];
