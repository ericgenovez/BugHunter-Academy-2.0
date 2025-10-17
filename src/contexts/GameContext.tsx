import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'available' | 'in-progress' | 'completed';
  xp: number;
  module: string;
}

interface BugReport {
  id: string;
  title: string;
  description: string;
  steps: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  module: string;
  date: string;
  status: 'open' | 'verified' | 'false-positive';
}

interface GameContextType {
  xp: number;
  level: string;
  missions: Mission[];
  bugReports: BugReport[];
  addXP: (amount: number) => void;
  completeMission: (missionId: string) => void;
  addBugReport: (report: Omit<BugReport, 'id' | 'date' | 'status'>) => void;
  updateBugReport: (id: string, updates: Partial<BugReport>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Bug intencional: XP não atualiza até recarregar a página
let cachedXP = 0;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [xp, setXP] = useState(0);
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Corrigir validações do cadastro de usuários',
      description: 'Encontre e reporte os bugs no módulo de cadastro de usuários',
      difficulty: 'easy',
      status: 'available',
      xp: 50,
      module: 'functional-tests'
    },
    {
      id: '2',
      title: 'Testar endpoints da API',
      description: 'Identifique problemas nos endpoints /users, /missions e /reports',
      difficulty: 'medium',
      status: 'available',
      xp: 100,
      module: 'api-tester'
    },
    // Bug intencional: Missão duplicada
    {
      id: '2',
      title: 'Testar endpoints da API',
      description: 'Identifique problemas nos endpoints /users, /missions e /reports',
      difficulty: 'medium',
      status: 'available',
      xp: 100,
      module: 'api-tester'
    },
    {
      id: '3',
      title: 'Explorar desafios avançados',
      description: 'Bugs sutis e complexos esperam por você',
      difficulty: 'hard',
      status: 'available',
      xp: 200,
      module: 'advanced-challenges'
    }
  ]);
  const [bugReports, setBugReports] = useState<BugReport[]>([]);

  const getLevel = (xp: number): string => {
    if (xp >= 201) return 'Sênior';
    if (xp >= 101) return 'Pleno';
    if (xp >= 51) return 'Junior';
    return 'Trainee';
  };

  const addXP = (amount: number) => {
    // Bug intencional: XP não atualiza automaticamente
    cachedXP += amount;
    setTimeout(() => {
      setXP(prev => prev + amount);
    }, 5000); // Só atualiza após 5 segundos
  };

  const completeMission = (missionId: string) => {
    setMissions(prev => 
      prev.map(m => {
        if (m.id === missionId) {
          // Bug intencional: missão desaparece aleatoriamente
          if (Math.random() > 0.7) {
            return { ...m, status: 'completed' as const };
          }
          return m; // Não marca como completa
        }
        return m;
      })
    );
  };

  const addBugReport = (report: Omit<BugReport, 'id' | 'date' | 'status'>) => {
    const newReport: BugReport = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      // Bug intencional: data salva um dia adiantada
      date: new Date(Date.now() + 86400000).toISOString(),
      status: 'open'
    };
    setBugReports(prev => [...prev, newReport]);
  };

  const updateBugReport = (id: string, updates: Partial<BugReport>) => {
    setBugReports(prev =>
      prev.map(report => (report.id === id ? { ...report, ...updates } : report))
    );
  };

  return (
    <GameContext.Provider
      value={{
        xp,
        level: getLevel(xp),
        missions,
        bugReports,
        addXP,
        completeMission,
        addBugReport,
        updateBugReport,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
