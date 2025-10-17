import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Lock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Challenges() {
  const challenges = [
    {
      id: 1,
      title: 'Inconsistência de Dados',
      description: 'Encontre diferenças entre valores salvos e exibidos no sistema',
      status: 'Aprovado', // Bug intencional: status "Aprovado" em vermelho
      xp: 150,
      difficulty: 'advanced'
    },
    {
      id: 2,
      title: 'Mistério do Backend',
      description: 'Descubra inconsistências entre frontend e backend',
      status: 'Pendente',
      xp: 200,
      difficulty: 'expert'
    },
    {
      id: 3,
      title: 'Caça aos Textos Incorretos',
      description: 'Identifique mensagens de erro e labels com texto incorreto',
      status: 'Em Análise',
      xp: 100,
      difficulty: 'intermediate'
    }
  ];

  const getStatusColor = (status: string) => {
    // Bug intencional: "Aprovado" em vermelho
    if (status === 'Aprovado') return 'destructive';
    if (status === 'Pendente') return 'warning';
    return 'info';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Trophy className="h-8 w-8 text-accent" />
          Desafios Avançados
        </h1>
        <p className="text-muted-foreground mt-1">
          Bugs mais sutis e complexos para QAs experientes
        </p>
      </div>

      <Card className="bg-gradient-gaming border-0 shadow-glow">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Nível de Dificuldade: Avançado</h3>
              <p className="text-white/80">
                Estes desafios exigem atenção aos detalhes e conhecimento técnico profundo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="bg-card border-border shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-foreground">{challenge.title}</CardTitle>
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{challenge.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={getStatusColor(challenge.status) as any}>
                    {challenge.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recompensa</span>
                  <span className="font-bold text-success">+{challenge.xp} XP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dificuldade</span>
                  <span className="font-medium text-foreground capitalize">{challenge.difficulty}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">🎯 Bugs Escondidos Nesta Página</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Esta página contém vários bugs intencionais. Consegue encontrá-los?
          </p>
          <ul className="space-y-2 text-muted-foreground list-inside">
            <li>• Cores de status inconsistentes</li>
            <li>• Botão "Ver Detalhes" não funciona corretamente</li>
            <li>• Campos que perdem dados ao navegar</li>
            <li>• E mais bugs sutis esperando por você...</li>
          </ul>
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">
              Dica: Preste atenção em cada detalhe visual e funcional!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
