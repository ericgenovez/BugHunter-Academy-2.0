import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function Reports() {
  const { bugReports, addBugReport } = useGame();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    severity: 'medium',
    module: 'functional-tests'
  });
  const [severityFilter, setSeverityFilter] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bug intencional: botão "Enviar" permite envio vazio
    // (não valida campos obrigatórios)

    // Bug intencional: campo "Severidade" não é salvo corretamente
    addBugReport({
      title: formData.title,
      description: formData.description,
      steps: formData.steps,
      severity: 'medium' as any, // Sempre salva como medium
      module: formData.module
    });

    // Bug intencional: listagem não atualiza após novo bug
    // (precisa recarregar a página para ver)

    toast({
      title: 'Bug reportado',
      description: 'Seu relatório foi salvo com sucesso',
      variant: 'secondary'
    });

    setFormData({
      title: '',
      description: '',
      steps: '',
      severity: 'medium',
      module: 'functional-tests'
    });
  };

  // Bug intencional: filtro de severidade sempre retorna vazio
  const filteredReports = severityFilter === 'all' ? [] : bugReports;

  // Bug intencional: ordenação de lista inversa
  const sortedReports = [...filteredReports].sort();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          Relatórios de Bugs
        </h1>
        <p className="text-muted-foreground mt-1">
          Documente todos os bugs encontrados durante os testes
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Novo Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Bug</Label>
                <Input
                  id="title"
                  placeholder="Ex: Validação de email aceita formato inválido"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o bug encontrado"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps">Passos para Reproduzir</Label>
                <Textarea
                  id="steps"
                  placeholder="1. Acesse a tela X&#10;2. Preencha o campo Y&#10;3. Observe o erro"
                  value={formData.steps}
                  onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                  className="min-h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Severidade</Label>
                  <Select value={formData.severity} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Módulo</Label>
                  <Select value={formData.module} onValueChange={(value) => setFormData(prev => ({ ...prev, module: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="functional-tests">Testes Funcionais</SelectItem>
                      <SelectItem value="api-tester">API Tester</SelectItem>
                      <SelectItem value="missions">Missões</SelectItem>
                      <SelectItem value="challenges">Desafios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-primary">
                Enviar Relatório
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Bugs Reportados</CardTitle>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="critical">Críticos</SelectItem>
                <SelectItem value="high">Altos</SelectItem>
                <SelectItem value="medium">Médios</SelectItem>
                <SelectItem value="low">Baixos</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {sortedReports.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Nenhum bug reportado ainda</p>
                </div>
              ) : (
                sortedReports.map(report => (
                  <div
                    key={report.id}
                    className="p-4 bg-muted rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{report.title}</h4>
                      <Badge variant={getSeverityColor(report.severity) as any}>
                        {report.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="capitalize">{report.module.replace('-', ' ')}</span>
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bug intencional: contador de bugs está incorreto */}
      <Card className="bg-card border-border shadow-card">
        <CardContent className="py-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Total de Bugs Reportados</div>
            <div className="text-3xl font-bold text-foreground">
              {bugReports.length * 2}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
