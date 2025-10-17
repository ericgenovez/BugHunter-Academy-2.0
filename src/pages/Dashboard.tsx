import { Bug, Target, Trophy, TrendingUp } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  const { xp, level, missions, bugReports } = useGame();

  const completedMissions = missions.filter(m => m.status === 'completed').length;
  const totalMissions = missions.length;
  
  // Bug intencional: contador de progresso exibe número incorreto
  const progressPercentage = totalMissions > 0 ? (completedMissions / totalMissions) * 100 + 15 : 0;

  const stats = [
    {
      title: 'XP Total',
      value: xp,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Missões Completas',
      value: `${completedMissions}/${totalMissions}`,
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Bugs Reportados',
      value: bugReports.length,
      icon: Bug,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Nível Atual',
      value: level,
      icon: Trophy,
      color: 'text-info',
      bgColor: 'bg-info/10'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-gaming p-8 shadow-glow">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo, Hunter! 🎯
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Pronto para caçar bugs e evoluir suas habilidades de QA?
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
              <div className="text-sm text-white/80">Seu Nível</div>
              <div className="text-2xl font-bold text-white">{level}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
              <div className="text-sm text-white/80">XP Acumulado</div>
              <div className="text-2xl font-bold text-white">{xp}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-card border-border shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Section */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Progresso de Missões</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Conclusão geral</span>
              <span className="font-medium text-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium text-foreground mb-3">Próximos Passos:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Explore o módulo de Testes Funcionais
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Teste os endpoints da API no API Tester
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Documente os bugs encontrados em Relatórios
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">💡 Dicas Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">+10 XP</strong> por bug reportado corretamente</p>
          <p>• <strong className="text-foreground">-5 XP</strong> por falso positivo</p>
          <p>• Documente sempre os passos para reproduzir o bug</p>
          <p>• Teste edge cases e validações de campos</p>
          <p>• Fique atento a inconsistências entre UI e comportamento esperado</p>
        </CardContent>
      </Card>
    </div>
  );
}
