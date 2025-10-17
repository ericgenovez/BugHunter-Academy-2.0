import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FlaskConical, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function FunctionalTests() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Bug intencional: validação de email aceita formato inválido
  const validateEmail = (email: string) => {
    return email.includes('@'); // Aceita qualquer coisa com @
  };

  // Bug intencional: senha curta passa sem erro
  const validatePassword = (password: string) => {
    return password.length > 2; // Deveria ser > 6
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bug intencional: campo "confirmar senha" ignora capitalização
    if (formData.password.toLowerCase() !== formData.confirmPassword.toLowerCase()) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        variant: 'destructive'
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: 'Erro',
        description: 'Email inválido',
        variant: 'destructive'
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast({
        title: 'Erro',
        description: 'Senha muito curta',
        variant: 'destructive'
      });
      return;
    }

    if (editingId) {
      // Bug intencional: atualizar usuário apaga senha
      setUsers(prev =>
        prev.map(u =>
          u.id === editingId
            ? { ...u, name: formData.name, email: formData.email, password: '' }
            : u
        )
      );
      setEditingId(null);
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setUsers(prev => [...prev, newUser]);
    }

    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    
    // Bug intencional: API retorna 200 mesmo em erro
    toast({
      title: 'Sucesso',
      description: 'Usuário salvo com sucesso',
    });
  };

  const handleDelete = (id: string) => {
    // Bug intencional: deletar um usuário às vezes não remove da lista
    if (Math.random() > 0.5) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
    toast({
      title: 'Usuário removido',
      description: 'Usuário deletado com sucesso',
    });
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.password
    });
    setEditingId(user.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FlaskConical className="h-8 w-8 text-primary" />
          Testes Funcionais - Cadastro de Usuários
        </h1>
        <p className="text-muted-foreground mt-1">
          Teste as validações e funcionalidades do CRUD de usuários
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">
              {editingId ? 'Editar Usuário' : 'Novo Usuário'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bug intencional: Label "Nome completo" está trocada */}
              <div className="space-y-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  // Bug intencional: placeholder com erro ortográfico
                  placeholder="Digite seu nomme completo"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>

              {/* Bug intencional: botão "Salvar" ativa mesmo com campos vazios */}
              <Button type="submit" className="w-full bg-gradient-primary">
                {editingId ? 'Atualizar' : 'Salvar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Usuários Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum usuário cadastrado
                </p>
              ) : (
                users.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border"
                  >
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
