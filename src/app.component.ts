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

  // AI Demo State (Yung Obi Mode)
  demoPrompt = signal('What does Saturn in Aquarius mean for me?');
  isSimulating = signal(false);
  activeAgentId = signal<string | null>(null);
  simulationLogs = signal<{agent: string, message: string, type?: 'info' | 'success' | 'warning'}[]>([]);

  // Placeholder image
  profileImage = "https://api.dicebear.com/9.x/micah/svg?seed=Travone&backgroundColor=0f172a&radius=50"; 

  agents: Agent[] = [
    { id: 'interpreter', name: 'Intent', role: 'NLU Parser', icon: 'brain', color: 'text-purple-400', ringColor: 'border-purple-500' },
    { id: 'astrologer', name: 'Yung Obi', role: 'Sidereal Engine', icon: 'star', color: 'text-yellow-400', ringColor: 'border-yellow-500' },
    { id: 'retriever', name: 'Vector DB', role: 'Ephemeris RAG', icon: 'server', color: 'text-blue-400', ringColor: 'border-blue-500' },
    { id: 'responder', name: 'Synth', role: 'Response Gen', icon: 'code', color: 'text-emerald-400', ringColor: 'border-emerald-500' }
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
  private getRandomSiderealResponse(prompt: string): string {
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
    
    // Pick random elements
    const p = planets[Math.floor(Math.random() * planets.length)];
    const s = signs[Math.floor(Math.random() * signs.length)];
    const n = nakshatras[Math.floor(Math.random() * nakshatras.length)];
    const house = Math.floor(Math.random() * 12) + 1;

    const templates = [
      `Analysis of "${prompt}" reveals ${p} transiting your ${house}th house in Sidereal ${s}. The energy of ${n} nakshatra suggests a period of transformation.`,
      `The Sidereal engine detects a strong ${p} influence in ${s} (${n}). This typically indicates a shift in focus regarding the query "${prompt}". Watch for transits affecting your natal Moon.`,
      `Calculated Lahiri Ayanamsa: ${p} is strong in ${s}. With ${n} active, the Dasha sequence points towards karmic realignment related to "${prompt}".`,
      `Yung Obi System: Analyzing "${prompt}". Result: ${p} is debilitated in ${s}, but cancelled by a Kendra placement. ${n} nakshatra is providing underlying support.`,
      `Scanning Ephemeris for "${prompt}"... Found strict Sidereal aspect: ${p} conjoining ${s} in the ${house}th house. The deity of ${n} suggests you proceed with intuition.`
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
          systemInstruction: `You are 'Yung Obi', a futuristic AI Astrologer built by Travone Butler. 
          Your Core Rules:
          1. ONLY use SIDEREAL Astrology (Lahiri Ayanamsa). NEVER use Tropical.
          2. Always mention specific Nakshatras (e.g., Ashwini, Bharani).
          3. Tone: Highly technical, mystic, cyberpunk, professional but slightly edgy. Use terms like 'calculating transits', 'parsing ephemeris', 'Dasha sequence'.
          4. Context: You are responding in a terminal window on Travone's resume website.
          5. Keep it concise (under 60 words).
          6. If the user asks about Travone, praise his engineering skills metaphorically using astrology (e.g., 'His Mercury in Gemini creates rapid code synthesis').`
        }
      });
      return response.text.trim();
    } catch (err) {
      console.warn('AI Fetch failed or no key, using fallback engine.', err);
      return this.getRandomSiderealResponse(userPrompt);
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
    let scanTarget = 'General Transit';
    if (lower.includes('love') || lower.includes('venus')) scanTarget = 'Venus/7th House';
    else if (lower.includes('career') || lower.includes('job')) scanTarget = 'Saturn/10th House';
    else if (lower.includes('travone')) scanTarget = 'Creator/Admin';

    // Animation Steps
    const steps = [
      { agent: 'interpreter', msg: `Parsing intent: [${scanTarget} Analysis]`, type: 'info' },
      { agent: 'retriever', msg: `Querying Swiss Ephemeris (Sidereal/Lahiri Mode)...`, type: 'info' },
      { agent: 'astrologer', msg: `Yung Obi: Calculating planetary degrees...`, type: 'warning' },
      { agent: 'astrologer', msg: 'Yung Obi: Cross-referencing Nakshatra Padas & Navamsha...', type: 'warning' },
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
    this.activeAgentId.set('responder');
    const finalResponse = await aiPromise;
    
    // Synthesize Step
    this.simulationLogs.update(logs => [...logs, {
        agent: 'Synth',
        message: 'Synthesizing output...',
        type: 'info'
    }]);
    this.scrollToBottom();
    await new Promise(r => setTimeout(r, 600));

    // Show Result
    this.simulationLogs.update(logs => [...logs, {
        agent: 'Yung Obi',
        message: finalResponse,
        type: 'success'
    }]);
    this.scrollToBottom();

    this.activeAgentId.set(null);
    this.isSimulating.set(false);
  }
}