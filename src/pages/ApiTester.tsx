import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bug, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ApiTester() {
  const { toast } = useToast();
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/users');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  // Bug intencional: email duplicado no objeto (TypeScript aceita com Object.assign)
  const mockDatabase = {
    users: [
      Object.assign({ id: 1, name: 'João Silva', email: 'joao@test.com' }, { email: 'joao.duplicado@test.com' }),
      Object.assign({ id: 2, name: 'Maria Santos', email: 'maria@test.com' }, { email: 'maria.duplicada@test.com' })
    ],
    missions: [
      { id: 1, title: 'Missão 1', status: 'available' }
      // Bug intencional: /missions retorna apenas um item (faltam itens)
    ],
    reports: [] // Requer header especial
  };

  const handleSendRequest = async () => {
    setRequestCount(prev => prev + 1);

    // Bug intencional: "Send Request" quebra em requisições GET seguidas
    if (method === 'GET' && requestCount > 2) {
      toast({
        title: 'Erro',
        description: 'Erro inesperado ao processar requisição',
        variant: 'destructive'
      });
      return;
    }

    // Bug intencional: timeout simulado
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    let mockResponse: any = {};

    try {
      if (endpoint === '/users') {
        mockResponse = {
          status: 200,
          data: mockDatabase.users
        };
      } else if (endpoint === '/missions') {
        mockResponse = {
          status: 200,
          data: mockDatabase.missions
        };
      } else if (endpoint === '/reports') {
        // Bug intencional: Header incorreto requerido
        mockResponse = {
          status: 401,
          error: 'Header X-Custom-Auth requerido'
        };
      } else {
        // Bug intencional: erro 404 retorna status 200
        mockResponse = {
          status: 200,
          error: 'Endpoint não encontrado',
          data: null
        };
      }

      // Bug intencional: resposta JSON contém campo undefined
      mockResponse.timestamp = undefined;

      // Bug intencional: campo "body" do request é ignorado
      // (não processa o body enviado)

      setResponse(JSON.stringify(mockResponse, null, 2));
      setLoading(false);

      toast({
        title: 'Requisição enviada',
        description: `${method} ${endpoint} - Status: ${mockResponse.status}`,
      });
    } catch (error) {
      setLoading(false);
      setResponse(JSON.stringify({ error: 'Erro ao processar requisição' }, null, 2));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Bug className="h-8 w-8 text-primary" />
          API Tester
        </h1>
        <p className="text-muted-foreground mt-1">
          Teste os endpoints da API e identifique problemas nas respostas
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Método HTTP</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Endpoint</Label>
              <Select value={endpoint} onValueChange={setEndpoint}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/users">/users</SelectItem>
                  <SelectItem value="/missions">/missions</SelectItem>
                  <SelectItem value="/reports">/reports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Body (JSON)</Label>
              <Textarea
                placeholder='{"key": "value"}'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="font-mono text-sm min-h-32"
              />
            </div>

            <Button
              onClick={handleSendRequest}
              disabled={loading}
              className="w-full bg-gradient-primary"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Enviando...' : 'Send Request'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 min-h-96 max-h-96 overflow-auto">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {response || 'Nenhuma resposta ainda. Envie uma requisição para ver o resultado.'}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Endpoints Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 p-3 bg-muted rounded border border-border">
              <span className="px-2 py-1 bg-success/20 text-success rounded font-mono text-xs">GET</span>
              <span className="font-mono text-foreground">/users</span>
              <span className="text-muted-foreground">- Lista todos os usuários</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded border border-border">
              <span className="px-2 py-1 bg-success/20 text-success rounded font-mono text-xs">GET</span>
              <span className="font-mono text-foreground">/missions</span>
              <span className="text-muted-foreground">- Lista todas as missões</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded border border-border">
              <span className="px-2 py-1 bg-success/20 text-success rounded font-mono text-xs">GET</span>
              <span className="font-mono text-foreground">/reports</span>
              <span className="text-muted-foreground">- Lista todos os relatórios</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
