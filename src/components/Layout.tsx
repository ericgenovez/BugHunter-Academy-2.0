import { Bug, Trophy, FlaskConical, FileText, Target, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { xp, level } = useGame();
  const [logoClicks, setLogoClicks] = useState(0);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Missões', href: '/missions', icon: Target },
    { name: 'Testes Funcionais', href: '/functional-tests', icon: FlaskConical },
    { name: 'API Tester', href: '/api-tester', icon: Bug },
    { name: 'Relatórios', href: '/reports', icon: FileText },
    { name: 'Desafios', href: '/challenges', icon: Trophy },
  ];

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);

    // Bug intencional: Easter egg
    if (newCount === 5) {
      alert('🎉 Você quebrou o sistema! (Easter egg encontrado)');
      setLogoClicks(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Bug className="h-7 w-7 text-primary" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  BugHunter Academy
                </h1>
                <p className="text-xs text-muted-foreground">v2.0</p>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {/* Bug intencional: XP exibe valor incorreto */}
                  {xp + 10} XP
                </div>
                <div className="text-xs text-muted-foreground">Nível: {level}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-8 px-4">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>BugHunter Academy 2.0 - Sistema de Treinamento de QAs</p>
          <p className="mt-1">Encontre os bugs, ganhe XP e evolua sua carreira! 🐛</p>
        </div>
      </footer>
    </div>
  );
};
