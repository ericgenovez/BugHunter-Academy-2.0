import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Trophy, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Missions() {
  const { missions, completeMission, addXP } = useGame();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Bug intencional: filtro de status não atualiza a lista
  const filteredMissions = missions; // Deveria filtrar por statusFilter

  const getDifficultyColor = (difficulty: string) => {
    // Bug intencional: ícone de dificuldade invertido
    if (difficulty === 'easy') return 'destructive';
    if (difficulty === 'medium') return 'warning';
    return 'secondary';
  };

  const getDifficultyLabel = (difficulty: string) => {
    // Bug intencional: labels invertidas
    if (difficulty === 'easy') return 'Fácil';
    if (difficulty === 'medium') return 'Média';
    return 'Difícil';
  };

  const handleCompleteMission = (missionId: string, xp: number) => {
    completeMission(missionId);
    addXP(xp);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Missões Disponíveis
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete missões para ganhar XP e evoluir de nível
          </p>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="available">Disponíveis</SelectItem>
            <SelectItem value="in-progress">Em Progresso</SelectItem>
            <SelectItem value="completed">Completas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredMissions.map((mission) => (
          <Card key={mission.id} className="bg-card border-border shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  {mission.title}
                </CardTitle>
                <Badge variant={getDifficultyColor(mission.difficulty) as any}>
                  {getDifficultyLabel(mission.difficulty)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{mission.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Recompensa</div>
                    <div className="text-lg font-bold text-success">+{mission.xp} XP</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Módulo</div>
                    <div className="text-sm font-medium text-foreground capitalize">
                      {mission.module.replace('-', ' ')}
                    </div>
                  </div>
                </div>

                {mission.status === 'completed' ? (
                  <Button disabled variant="outline" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Completa
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleCompleteMission(mission.id, mission.xp)}
                    className="bg-gradient-primary"
                  >
                    Marcar como Completa
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bug intencional: contador de progresso exibe número incorreto */}
      <Card className="bg-card border-border shadow-card">
        <CardContent className="py-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Progresso Total</div>
            <div className="text-3xl font-bold text-foreground">
              {missions.filter(m => m.status === 'completed').length + 1} / {missions.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
