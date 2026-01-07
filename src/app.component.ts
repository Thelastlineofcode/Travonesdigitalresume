import { Component, ChangeDetectionStrategy, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  activeSection = signal<string>('overview');

  // Console State (Engineering Audit)
  demoPrompt = signal('Audit the architecture of a real-time chat application with focus on scaling and security.');
  isSimulating = signal(false);
  activeAgentId = signal<string | null>(null);
  simulationLogs = signal<{ agent: string, message: string, type?: 'info' | 'success' | 'warning' }[]>([]);

  private readonly agentEndpoint = '/api/agent';
  private readonly systemInstruction = `You are an Engineering Assistant Audit Tool.
          Your Core Rules:
          1. Respond with a single-line technical brief (no line breaks).
          2. Provide 3 compact implementation steps (use "1) 2) 3)").
          3. Tone: professional, technical, optimized.
          4. Context: You are responding in a development console on a software engineer's digital resume.
          5. Keep it concise (under 70 words).
          6. Highlight best practices, efficiency, and clean code.`;

  profileImage = "assets/photos/nano-banana-2025-11-24T23-49-38.png";
  lifestyleImage = "assets/photos/IMG_6172.JPG";

  agents: Agent[] = [
    { id: 'architect', name: 'Architect', role: 'System Design', icon: 'server', color: 'text-amber-400', ringColor: 'border-amber-500' },
    { id: 'debugger', name: 'Debugger', role: 'Logic Optimization', icon: 'code', color: 'text-cyan-400', ringColor: 'border-cyan-500' },
    { id: 'frontend', name: 'Frontend', role: 'UI/UX Interface', icon: 'layout', color: 'text-emerald-400', ringColor: 'border-emerald-500' },
    { id: 'security', name: 'Security', role: 'Audit & Guardrails', icon: 'shield', color: 'text-purple-400', ringColor: 'border-purple-500' }
  ];

  // Studio Data
  profile = {
    name: 'TRAVONE BUTLER',
    title: 'Entry-Level Software Engineer',
    location: 'Houston, TX',
    email: 'travone.butler@gmail.com',
    site: 'github.com/houseofobi', // Placeholder for actual site if different
    summary: `Entry-level Software Engineer with hands-on experience building and maintaining web applications, backend services, and automation scripts using JavaScript, Python, Rust, and modern frameworks. Strong foundation in writing clean, testable code, working within existing systems, and learning quickly in team-based environments.`
  };

  skills: SkillCategory[] = [
    {
      category: 'Languages',
      icon: 'code',
      items: ['JavaScript', 'Python', 'Rust', 'SQL']
    },
    {
      category: 'Frontend & UI',
      icon: 'layout',
      items: ['HTML', 'CSS', 'React', 'Tailwind CSS']
    },
    {
      category: 'Backend & Data',
      icon: 'server',
      items: ['Node.js', 'REST APIs', 'PostgreSQL', 'NoSQL']
    },
    {
      category: 'Tools & Concepts',
      icon: 'cpu',
      items: ['Git/GitHub', 'Debugging', 'API Integration', 'Automation Scripts', 'AI-assisted Development']
    }
  ];

  experience: ExperienceItem[] = [
    {
      company: 'Independent Software Projects',
      role: 'Junior Developer',
      period: '2023 – 2025',
      description: 'Built and maintained web applications and automation tools following defined requirements.',
      achievements: [
        'Developed backend endpoints and integrated APIs for data management.',
        'Wrote automation scripts in Python and Rust to improve workflow efficiency.',
        'Debugged complex frontend and backend issues to ensure high reliability.',
        'Managed version control using Git and collaborative PR workflows.'
      ]
    },
    {
      company: 'Technical Support / Systems Assistance',
      role: 'Support Specialist',
      period: '2022 – 2023',
      description: 'Assisted with software setup, configuration, and troubleshooting.',
      achievements: [
        'Resolved software issues following established documentation and escalation protocols.',
        'Provided guidance on application configuration and systems optimization.'
      ]
    }
  ];

  aiAchievements = [
    {
      title: '7+ Projects',
      desc: 'Successfully delivered functional web and automation solutions.'
    },
    {
      title: 'Clean Code',
      desc: 'Expertise in modular architecture and testable patterns.'
    },
    {
      title: 'AI Native',
      desc: 'Leveraging agentic workflows for accelerated development cycles.'
    }
  ];

  projects: ProjectItem[] = [
    {
      name: 'Dynamic Digital Resume',
      status: 'Live',
      link: 'https://travone-resume.vercel.app',
      description: 'An interactive, AI-enhanced resume built with Angular 20 and Tailwind CSS.',
      highlights: [
        'Zoneless Angular',
        'Interactive AI Agents',
        'Responsive Design'
      ]
    },
    {
      name: 'Automated Workflow Engine',
      status: 'Stable',
      description: 'Python/Rust scripts for automated task management and data processing.',
      highlights: [
        'Performance Optimized',
        'Error Resilience',
        'Cross-platform'
      ]
    },
    {
      name: 'REST API Integration Layer',
      status: 'Production',
      description: 'Scalable backend services for centralized data retrieval and cross-app communication.',
      highlights: [
        'JWT Auth',
        'Rate Limiting',
        'Structured Logging'
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

  printChart() {
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

  // ---- DYNAMIC ORACLE LOGIC START ----

  // 1. Random Generator for Fallback (ensures variety even without API)
  private getRandomNumerologyResponse(prompt: string): string {
    const focuses = ['core', 'name', 'timing', 'compatibility', 'career', 'relationships'];
    const modes = ['sequence the chart', 'map the digits', 'compare name options', 'surface cycle shifts'];
    const focus = focuses[Math.floor(Math.random() * focuses.length)];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    const templates = [
      `Chart brief for "${prompt}": 1) Compute ${focus} numbers. 2) ${mode} with clarity. 3) Share a timing window and action steps.`,
      `Numerology read for "${prompt}": 1) Map core digits. 2) Align name vibration. 3) Set a 7-day focus window.`,
      `Sidereal insight for "${prompt}": 1) Identify primary numbers. 2) Translate meaning into actions. 3) Mark next cycle shift.`,
      `Oracle note for "${prompt}": 1) Define the chart focus. 2) Extract key themes. 3) Deliver concise guidance.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  // 2. Service-account-backed oracle call (no client API keys)
  private async fetchAgentResponse(userPrompt: string): Promise<string> {
    try {
      const response = await fetch(this.agentEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: userPrompt,
          systemInstruction: this.systemInstruction
        })
      });
      if (!response.ok) {
        throw new Error(`Agent API error: ${response.status}`);
      }

      const data = await response.json() as { text?: string };
      if (!data?.text) {
        throw new Error('Agent API response missing text');
      }

      return data.text.trim();
    } catch (err) {
      console.warn('Oracle fetch failed, using fallback engine.', err);
      return this.getRandomNumerologyResponse(userPrompt);
    }
  }

  // 3. Main Orchestration
  async runNumerologySimulation(promptValue: string) {
    if (this.isSimulating() || !promptValue.trim()) return;

    this.demoPrompt.set(promptValue);
    this.isSimulating.set(true);
    this.simulationLogs.set([]);
    this.activeAgentId.set(null);

    // Start fetching oracle response in background (Parallel Execution)
    const aiPromise = this.fetchAgentResponse(promptValue);

    // Determine context for "fake" logs while waiting
    const lower = promptValue.toLowerCase();
    let scanTarget = 'Codebase Audit';
    if (lower.includes('ui') || lower.includes('frontend') || lower.includes('interface')) {
      scanTarget = 'Frontend Logic';
    } else if (lower.includes('api') || lower.includes('backend') || lower.includes('server')) {
      scanTarget = 'Backend Architecture';
    } else if (lower.includes('security') || lower.includes('audit')) {
      scanTarget = 'Security Guardrails';
    } else if (lower.includes('sql') || lower.includes('database')) {
      scanTarget = 'Data Schema';
    }

    // Animation Steps
    const steps = [
      { agent: 'architect', msg: `Architect: Analyzing requirements for [${scanTarget}]`, type: 'info' },
      { agent: 'debugger', msg: 'Debugger: Validating core logic and dependency tree...', type: 'info' },
      { agent: 'frontend', msg: 'Frontend: Optimizing interface hooks and user flow...', type: 'warning' },
      { agent: 'security', msg: 'Security: Auditing guardrails and performance bounds...', type: 'warning' },
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

    // Wait for real oracle response (or fallback)
    this.activeAgentId.set('security');
    const finalResponse = await aiPromise;

    // Synthesize Step
    this.simulationLogs.update(logs => [...logs, {
      agent: this.agents.find(a => a.id === 'security')!.name,
      message: 'Security: Finalizing implementation brief...',
      type: 'info'
    }]);
    this.scrollToBottom();
    await new Promise(r => setTimeout(r, 600));

    // Show Result
    this.simulationLogs.update(logs => [...logs, {
      agent: this.agents.find(a => a.id === 'architect')!.name,
      message: finalResponse,
      type: 'success'
    }]);
    this.scrollToBottom();

    this.activeAgentId.set(null);
    this.isSimulating.set(false);
  }
}
