import { Component, ChangeDetectionStrategy, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleGenAI } from "@google/genai";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tech?: string[];
}

interface ProjectItem {
  name: string;
  status?: string;
  link?: string;
  repo?: string;
  description: string;
  highlights: string[];
  tech?: string;
}

interface SkillCategory {
  category: string;
  items: string[];
  icon: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  ringColor: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('terminalContainer') private terminalContainer!: ElementRef;

  // Navigation State
  activeSection = signal<string>('about');

  // AI Demo State (Agentic Executive Suite)
  demoPrompt = signal('Design a 30-day AI product launch plan for Yung Obi.');
  isSimulating = signal(false);
  activeAgentId = signal<string | null>(null);
  simulationLogs = signal<{agent: string, message: string, type?: 'info' | 'success' | 'warning'}[]>([]);

  profileImage = "assets/photos/nano-banana-2025-11-24T23-49-38.png";
  lifestyleImage = "assets/photos/IMG_6172.JPG";

  agents: Agent[] = [
    { id: 'ceo', name: 'CEO', role: 'Vision & Growth', icon: 'star', color: 'text-amber-400', ringColor: 'border-amber-500' },
    { id: 'cto', name: 'CTO', role: 'Architecture & AI', icon: 'code', color: 'text-cyan-400', ringColor: 'border-cyan-500' },
    { id: 'cso', name: 'CSO', role: 'Security & Strategy', icon: 'shield', color: 'text-emerald-400', ringColor: 'border-emerald-500' },
    { id: 'coo', name: 'COO', role: 'Operations & Delivery', icon: 'server', color: 'text-purple-400', ringColor: 'border-purple-500' }
  ];

  // Resume Data
  profile = {
    name: 'TRAVONE BUTLER',
    title: 'AI Engineer | Full-Stack Architect | Technical Founder',
    location: 'Houston, TX',
    email: 'Travone.butler@gmail.com', 
    github: 'github.com/Thelastlineofcode',
    linkedin: 'linkedin.com/in/travonebutler',
    summary: `Technical Founder and AI Engineer delivering scalable SaaS architectures and multi-agent automation systems. Creator of 'Yung Obi', a Sidereal Astrology AI. Expert in LLM orchestration (MCP/LangChain), optimizing cloud costs by 34%, and cutting deployment cycles by 90% via automated CI/CD pipelines.`
  };

  skills: SkillCategory[] = [
    {
      category: 'AI & Orchestration',
      icon: 'cpu',
      items: [
        'Multi-Agent Systems (Yung Obi Architecture)',
        'LLM Optimization (Claude, OpenAI)',
        'Model Context Protocol (MCP)',
        'RAG & Vector Embeddings',
        'Autonomous Workflows'
      ]
    },
    {
      category: 'Full-Stack Engineering',
      icon: 'code',
      items: [
        'Angular v20, React, Next.js',
        'TypeScript, Node.js, Python',
        'PostgreSQL, Supabase, GraphQL',
        'Tailwind CSS, GSAP Animation',
        'Real-time Systems (WebSockets)'
      ]
    },
    {
      category: 'DevOps & Cloud',
      icon: 'cloud',
      items: [
        'GitHub Actions (CI/CD Pipelines)',
        'Docker & Containerization',
        'Vercel & AWS Deployment',
        'Automated Testing suites',
        'Infrastructure as Code'
      ]
    },
    {
      category: 'Strategic Leadership',
      icon: 'users',
      items: [
        'SaaS Product Architecture',
        'Technical Team Mentorship',
        'Agile/Scrum Management',
        'Data-Driven Resource Optimization',
        'Stakeholder Communication'
      ]
    }
  ];

  experience: ExperienceItem[] = [
    {
      company: 'House of OBI (Levité)',
      role: 'Founder & Lead Engineer',
      period: 'Sept 2024 – Present',
      description: 'Architected and deployed a production astrology SaaS serving active users.',
      achievements: [
        'Engineered sub-second chart calculation engine using optimized TypeScript algorithms.',
        'Created "Yung Obi", an AI chatbot capable of personalized sidereal astrology readings.',
        'Achieved 100% uptime via robust GitHub Actions CI/CD pipelines.'
      ],
      tech: ['Next.js', 'PostgreSQL', 'GitHub Actions', 'Supabase']
    },
    {
      company: 'Xcellent1 Lawn Care',
      role: 'Technical Founder',
      period: 'June 2023 – Present',
      description: 'Digitized service operations through custom software solutions.',
      achievements: [
        'Built a high-conversion waitlist portal capturing 500+ organic leads.',
        'Secured top-tier local SEO rankings driving organic traffic.',
        'Implemented automated customer notification systems using Node.js.'
      ],
      tech: ['React', 'Node.js', 'Google Maps API']
    },
    {
      company: 'Mula SaaS',
      role: 'Technical Lead',
      period: 'March 2024 – Present',
      description: 'Leading development of an enterprise personality intelligence platform.',
      achievements: [
        'Architecting multi-tenant system with Role-Based Access Control (RBAC).',
        'Implementing real-time scoring algorithms for complex personality frameworks.',
        'Mentoring dev team on clean architecture and enterprise coding standards.'
      ],
      tech: ['GraphQL', 'Supabase', 'React', 'Real-time']
    },
    {
      company: 'TapIn',
      role: 'Full-Stack Developer',
      period: 'Aug 2023 – Present',
      description: 'Developing high-throughput volunteer coordination network.',
      achievements: [
        'Optimized PostgreSQL schema to handle complex event-volunteer relationships.',
        'Engineered mobile-first interface improving user engagement and retention.'
      ],
      tech: ['PostgreSQL', 'Tailwind', 'Mobile-First']
    },
    {
      company: 'United States Navy',
      role: 'Technical Operations',
      period: '2004 – 2008',
      description: 'Executed high-stakes technical operations in critical environments.',
      achievements: [
        'Delivered precision technical maintenance under extreme pressure.',
        'Led cross-functional teams in mission-critical scenarios.'
      ]
    }
  ];

  aiAchievements = [
    {
      title: 'Yung Obi Agent',
      desc: 'Built a specialized Sidereal Astrology AI agent capable of interpreting complex planetary alignments.'
    },
    {
      title: '34% Cost Reduction',
      desc: 'Optimized LLM token usage through intelligent caching strategies and prompt engineering.'
    },
    {
      title: '30% Efficiency Gain',
      desc: 'Deployed AI-driven delegation pipelines, significantly accelerating development velocity.'
    }
  ];

  projects: ProjectItem[] = [
    {
      name: 'Levité Synastry Scanner',
      status: 'Live',
      link: 'https://the-house-of-Obi.vercel.app',
      description: 'Production astrology SaaS with real-time Vedic calculation engine.',
      highlights: [
        'Sub-second Latency',
        'Sidereal Engine',
        'Automated CI/CD'
      ]
    },
    {
      name: 'Xcellent1 Waitlist Portal',
      status: 'Live',
      link: 'https://xcellent1lawncare.com',
      description: 'High-conversion lead generation and waitlist management platform.',
      highlights: [
        'Lead Capture',
        'Local SEO Dominance',
        'Automated Alerts'
      ]
    },
    {
      name: 'House of OBI w/ Yung Obi',
      status: 'Dev',
      repo: 'github.com/Thelastlineofcode',
      description: 'Real-time messaging platform featuring the "Yung Obi" AI Astrologer.',
      highlights: [
        'AI Persona (Yung Obi)',
        'Supabase Realtime',
        'Context Awareness'
      ]
    }
  ];

  scrollToSection(sectionId: string) {
    this.activeSection.set(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  printResume() {
    window.print();
  }

  // Helper to scroll terminal to bottom
  private scrollToBottom() {
    requestAnimationFrame(() => {
      if (this.terminalContainer) {
        this.terminalContainer.nativeElement.scrollTop = this.terminalContainer.nativeElement.scrollHeight;
      }
    });
  }

  // ---- DYNAMIC AI LOGIC START ----

  // 1. Random Generator for Fallback (ensures variety even without API)
  private getRandomAgenticResponse(prompt: string): string {
    const focuses = ['product', 'go-to-market', 'automation', 'security', 'operations', 'growth'];
    const modes = ['map the system architecture', 'sequence the execution plan', 'define KPIs and owners', 'stand up the MVP loop'];
    const focus = focuses[Math.floor(Math.random() * focuses.length)];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    const templates = [
      `Executive summary for "${prompt}": 1) Align on ${focus} outcomes and KPIs. 2) ${mode} with clear owners. 3) Ship, measure, iterate.`,
      `Board decision for "${prompt}": 1) Set scope + success metrics. 2) Build the minimal agent stack. 3) Execute a two-sprint launch.`,
      `Council response for "${prompt}": 1) Prioritize impact areas. 2) Lock architecture + risk checks. 3) Deliver weekly milestones.`,
      `Executive brief on "${prompt}": 1) Define the mission. 2) Prototype fast, validate with users. 3) Operationalize and scale.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  // 2. Real Gemini API Call
  private async fetchGeminiResponse(userPrompt: string): Promise<string> {
    try {
      // NOTE: process.env['API_KEY'] is used as per instructions. 
      // In a real deployed app, this would be an environment variable.
      // If it's missing, we fall back gracefully.
      const apiKey = process.env['API_KEY'];
      if (!apiKey) throw new Error("No API Key found");

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: `You are the Executive Agent Council (CEO, CTO, CSO, COO) of an AI agentic company built by Travone Butler.
          Your Core Rules:
          1. Respond with a single-line executive brief (no line breaks).
          2. Provide 3 compact steps (use "1) 2) 3)").
          3. Tone: strategic, technical, decisive.
          4. Context: You are responding in a terminal window on Travone's resume website.
          5. Keep it concise (under 70 words).
          6. If asked about Travone, highlight his leadership and engineering impact.`
        }
      });
      return response.text.trim();
    } catch (err) {
      console.warn('AI Fetch failed or no key, using fallback engine.', err);
      return this.getRandomAgenticResponse(userPrompt);
    }
  }

  // 3. Main Orchestration
  async runAgentSimulation(promptValue: string) {
    if (this.isSimulating() || !promptValue.trim()) return;
    
    this.demoPrompt.set(promptValue);
    this.isSimulating.set(true);
    this.simulationLogs.set([]);
    this.activeAgentId.set(null);

    // Start fetching AI response in background (Parallel Execution)
    const aiPromise = this.fetchGeminiResponse(promptValue);
    
    // Determine context for "fake" logs while waiting
    const lower = promptValue.toLowerCase();
    let scanTarget = 'Executive Mission';
    if (lower.includes('launch') || lower.includes('gtm') || lower.includes('go-to-market') || lower.includes('growth')) {
      scanTarget = 'GTM & Growth';
    } else if (lower.includes('security') || lower.includes('risk') || lower.includes('compliance')) {
      scanTarget = 'Security & Risk';
    } else if (lower.includes('architecture') || lower.includes('stack') || lower.includes('platform')) {
      scanTarget = 'Architecture & AI';
    } else if (lower.includes('ops') || lower.includes('operations') || lower.includes('process')) {
      scanTarget = 'Operations';
    }

    // Animation Steps
    const steps = [
      { agent: 'ceo', msg: `CEO: Aligning mission scope [${scanTarget}]`, type: 'info' },
      { agent: 'cto', msg: 'CTO: Mapping agent stack, data flow, and tooling...', type: 'info' },
      { agent: 'cso', msg: 'CSO: Running security, risk, and compliance checks...', type: 'warning' },
      { agent: 'coo', msg: 'COO: Sequencing delivery plan and owners...', type: 'warning' },
    ];

    // Execute Animation
    for (const step of steps) {
      this.activeAgentId.set(step.agent);
      await new Promise(r => setTimeout(r, 800)); // Visual delay
      
      this.simulationLogs.update(logs => [...logs, {
        agent: this.agents.find(a => a.id === step.agent)!.name,
        message: step.msg,
        type: step.type as any
      }]);
      this.scrollToBottom();
    }

    // Wait for real AI response (or fallback)
    this.activeAgentId.set('coo');
    const finalResponse = await aiPromise;
    
    // Synthesize Step
    this.simulationLogs.update(logs => [...logs, {
        agent: this.agents.find(a => a.id === 'coo')!.name,
        message: 'COO: Consolidating executive brief...',
        type: 'info'
    }]);
    this.scrollToBottom();
    await new Promise(r => setTimeout(r, 600));

    // Show Result
    this.simulationLogs.update(logs => [...logs, {
        agent: this.agents.find(a => a.id === 'ceo')!.name,
        message: finalResponse,
        type: 'success'
    }]);
    this.scrollToBottom();

    this.activeAgentId.set(null);
    this.isSimulating.set(false);
  }
}
