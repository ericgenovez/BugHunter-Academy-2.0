# 🐛 BugHunter Academy 2.0 - GABARITO COMPLETO

Este documento contém a lista completa de todos os bugs intencionais implementados no sistema, organizados por módulo.

**⚠️ ATENÇÃO INSTRUTORES**: Este gabarito deve ser usado apenas para correção e avaliação dos QAs em treinamento.

---

## 📊 RESUMO GERAL

- **Total de bugs**: 40+
- **Distribuição**:
  - Painel de Missões: 5 bugs
  - Testes Funcionais: 9 bugs
  - API Tester: 8 bugs
  - Relatórios de Bugs: 7 bugs
  - Desafios Avançados: 6 bugs
  - Sistema de Gamificação: 3 bugs
  - Layout e Navegação: 2 bugs

---

## 🎯 PAINEL DE MISSÕES

### Bug #1: Filtro de status não funciona
- **Severidade**: Média
- **Localização**: `src/pages/Missions.tsx` - linha ~20
- **Descrição**: O filtro de status não atualiza a lista de missões
- **Comportamento esperado**: Ao selecionar um status, apenas missões com aquele status devem aparecer
- **Comportamento atual**: Todas as missões são exibidas independente do filtro selecionado
- **Como reproduzir**:
  1. Acessar página de Missões
  2. Alterar filtro de status para "Completas"
  3. Observar que todas as missões continuam visíveis

### Bug #2: Missões duplicadas
- **Severidade**: Alta
- **Localização**: `src/contexts/GameContext.tsx` - linha ~48
- **Descrição**: Missão com ID "2" está duplicada no array de missões
- **Comportamento esperado**: Cada missão deve ter ID único
- **Comportamento atual**: Missão "Testar endpoints da API" aparece duas vezes
- **Como reproduzir**:
  1. Acessar página de Missões
  2. Observar duas missões idênticas na listagem

### Bug #3: Ícone de dificuldade invertido
- **Severidade**: Baixa
- **Localização**: `src/pages/Missions.tsx` - função `getDifficultyColor` e `getDifficultyLabel`
- **Descrição**: Labels e cores de dificuldade estão invertidas
- **Comportamento esperado**: Fácil = verde, Médio = amarelo, Difícil = vermelho
- **Comportamento atual**: Fácil = vermelho/Difícil, Médio correto, Difícil = verde/Fácil
- **Como reproduzir**:
  1. Acessar página de Missões
  2. Observar badges de dificuldade nas missões

### Bug #4: Contador de progresso incorreto
- **Severidade**: Média
- **Localização**: `src/pages/Missions.tsx` e `src/pages/Dashboard.tsx`
- **Descrição**: Contador adiciona +1 ao número de missões completas
- **Comportamento esperado**: Exibir número real de missões completas
- **Comportamento atual**: Exibe (missões completas + 1)
- **Como reproduzir**:
  1. Marcar uma missão como completa
  2. Observar contador mostrando 2/4 ao invés de 1/4

### Bug #5: Missão não marca como completa
- **Severidade**: Alta
- **Localização**: `src/contexts/GameContext.tsx` - função `completeMission`
- **Descrição**: Ao marcar missão como completa, ela é atualizada apenas 30% das vezes (random)
- **Comportamento esperado**: Missão sempre deve ser marcada como completa ao clicar no botão
- **Comportamento atual**: Botão clicado mas missão permanece não completa aleatoriamente
- **Como reproduzir**:
  1. Clicar em "Marcar como Completa" múltiplas vezes
  2. Observar que algumas vezes a missão não é marcada

---

## 🧪 MÓDULO DE TESTES FUNCIONAIS

### Bug #6: Validação de email inválida
- **Severidade**: Crítica
- **Localização**: `src/pages/FunctionalTests.tsx` - função `validateEmail`
- **Descrição**: Aceita qualquer string com "@" como email válido
- **Comportamento esperado**: Validar formato completo (usuario@dominio.com)
- **Comportamento atual**: Aceita "a@", "@@@@", "teste@" como válidos
- **Como reproduzir**:
  1. Tentar cadastrar usuário com email "teste@"
  2. Sistema aceita como válido

### Bug #7: Senha curta aceita
- **Severidade**: Crítica
- **Localização**: `src/pages/FunctionalTests.tsx` - função `validatePassword`
- **Descrição**: Senha com mais de 2 caracteres é aceita
- **Comportamento esperado**: Mínimo 6 caracteres
- **Comportamento atual**: Aceita senhas como "123"
- **Como reproduzir**:
  1. Cadastrar usuário com senha "abc"
  2. Sistema aceita

### Bug #8: Botão ativo com campos vazios
- **Severidade**: Média
- **Localização**: `src/pages/FunctionalTests.tsx` - botão submit
- **Descrição**: Botão "Salvar" está sempre habilitado
- **Comportamento esperado**: Desabilitar quando campos obrigatórios vazios
- **Comportamento atual**: Permite submit de formulário vazio
- **Como reproduzir**:
  1. Deixar todos os campos vazios
  2. Clicar em "Salvar"

### Bug #9: Placeholder com erro ortográfico
- **Severidade**: Baixa
- **Localização**: `src/pages/FunctionalTests.tsx` - campo nome
- **Descrição**: Placeholder escrito "nomme" ao invés de "nome"
- **Como reproduzir**: Observar campo de nome

### Bug #10: API retorna 200 em erro
- **Severidade**: Alta
- **Localização**: `src/pages/FunctionalTests.tsx` - função `handleSubmit`
- **Descrição**: Toast sempre mostra "Sucesso" mesmo quando deveria dar erro
- **Comportamento esperado**: Retornar erro apropriado quando validação falha
- **Comportamento atual**: Sempre retorna status 200
- **Como reproduzir**:
  1. Submeter formulário com dados inválidos
  2. Observar mensagem de sucesso

### Bug #11: Confirmar senha ignora capitalização
- **Severidade**: Média
- **Localização**: `src/pages/FunctionalTests.tsx` - validação confirmPassword
- **Descrição**: Usa toLowerCase() nas duas senhas, permitindo "Senha" == "senha"
- **Comportamento esperado**: Senhas devem ser idênticas (case-sensitive)
- **Comportamento atual**: "Teste123" é igual a "teste123"
- **Como reproduzir**:
  1. Senha: "Teste123"
  2. Confirmar: "teste123"
  3. Sistema aceita

### Bug #12: Atualizar usuário apaga senha
- **Severidade**: Crítica
- **Localização**: `src/pages/FunctionalTests.tsx` - edição de usuário
- **Descrição**: Ao editar usuário, senha é setada como string vazia
- **Comportamento esperado**: Manter senha existente se não alterada
- **Comportamento atual**: Password = ''
- **Como reproduzir**:
  1. Criar usuário
  2. Editar qualquer campo
  3. Salvar
  4. Observar que senha foi apagada

### Bug #13: Deletar usuário falha 50% das vezes
- **Severidade**: Alta
- **Localização**: `src/pages/FunctionalTests.tsx` - função `handleDelete`
- **Descrição**: Random > 0.5 determina se usuário é realmente deletado
- **Comportamento esperado**: Sempre deletar quando solicitado
- **Comportamento atual**: Às vezes não remove da lista
- **Como reproduzir**:
  1. Criar múltiplos usuários
  2. Tentar deletar vários
  3. Alguns permanecem na lista

### Bug #14: Label "Nome completo" trocada
- **Severidade**: Baixa
- **Localização**: `src/pages/FunctionalTests.tsx` - label do campo
- **Descrição**: Label exibe "Username" ao invés de "Nome Completo"
- **Como reproduzir**: Observar label do primeiro campo

---

## 🔌 MÓDULO API TESTER

### Bug #15: /missions retorna apenas 1 item
- **Severidade**: Alta
- **Localização**: `src/pages/ApiTester.tsx` - mockDatabase.missions
- **Descrição**: Array missions contém apenas 1 objeto quando deveria ter vários
- **Comportamento esperado**: Retornar todas as missões
- **Comportamento atual**: Retorna apenas 1 missão
- **Como reproduzir**:
  1. GET /missions
  2. Observar resposta com 1 item apenas

### Bug #16: Campo email duplicado
- **Severidade**: Média
- **Localização**: `src/pages/ApiTester.tsx` - mockDatabase.users
- **Descrição**: Objetos de usuário têm propriedade "email" duas vezes
- **Comportamento esperado**: Uma propriedade email por objeto
- **Comportamento atual**: `{ email: 'a@test.com', email: 'b@test.com' }`
- **Como reproduzir**:
  1. GET /users
  2. Inspecionar estrutura JSON

### Bug #17: Header incorreto para /reports
- **Severidade**: Média
- **Localização**: `src/pages/ApiTester.tsx` - endpoint /reports
- **Descrição**: Endpoint exige header "X-Custom-Auth" que não está documentado
- **Comportamento esperado**: Funcionar sem header especial ou documentar requisito
- **Comportamento atual**: Retorna 401 sempre
- **Como reproduzir**:
  1. GET /reports
  2. Receber erro 401

### Bug #18: Campo timestamp undefined
- **Severidade**: Baixa
- **Localização**: `src/pages/ApiTester.tsx` - mockResponse
- **Descrição**: Resposta inclui `timestamp: undefined`
- **Comportamento esperado**: Timestamp com valor ou não incluir campo
- **Comportamento atual**: Campo existe mas valor undefined
- **Como reproduzir**:
  1. Fazer qualquer request
  2. Ver timestamp: undefined na resposta

### Bug #19: Erro 404 retorna status 200
- **Severidade**: Alta
- **Localização**: `src/pages/ApiTester.tsx` - endpoints não existentes
- **Descrição**: Endpoint não encontrado retorna status 200
- **Comportamento esperado**: Status 404
- **Comportamento atual**: Status 200 com mensagem de erro
- **Como reproduzir**:
  1. Tentar endpoint que não existe
  2. Observar status 200

### Bug #20: Body do request ignorado
- **Severidade**: Alta
- **Localização**: `src/pages/ApiTester.tsx` - função `handleSendRequest`
- **Descrição**: Conteúdo do campo Body não é processado
- **Comportamento esperado**: Body deve ser enviado na requisição
- **Comportamento atual**: Body é ignorado completamente
- **Como reproduzir**:
  1. POST com body JSON
  2. Body não aparece no processamento

### Bug #21: Send Request quebra após 2 GETs
- **Severidade**: Média
- **Localização**: `src/pages/ApiTester.tsx` - contador de requests
- **Descrição**: Após 3 requisições GET consecutivas, botão para de funcionar
- **Comportamento esperado**: Botão sempre funcional
- **Comportamento atual**: Retorna erro após 2+ requests GET
- **Como reproduzir**:
  1. GET /users
  2. GET /missions
  3. GET /users novamente
  4. Erro aparece

### Bug #22: Timeout simulado de 3 segundos
- **Severidade**: Baixa
- **Localização**: `src/pages/ApiTester.tsx` - setTimeout(3000)
- **Descrição**: Delay artificial de 3s em todas requisições
- **Comportamento esperado**: Resposta instantânea em mock
- **Comportamento atual**: 3 segundos de espera
- **Como reproduzir**: Fazer qualquer requisição

---

## 📝 MÓDULO DE RELATÓRIOS

### Bug #23: Severidade não salva corretamente
- **Severidade**: Alta
- **Localização**: `src/pages/Reports.tsx` - addBugReport
- **Descrição**: Sempre salva severity como 'medium' ignorando seleção
- **Comportamento esperado**: Salvar severity selecionada pelo usuário
- **Comportamento atual**: Sempre 'medium'
- **Como reproduzir**:
  1. Criar report com severity "critical"
  2. Ver que foi salvo como "medium"

### Bug #24: Envio vazio permitido
- **Severidade**: Alta
- **Localização**: `src/pages/Reports.tsx` - validação form
- **Descrição**: Botão permite enviar formulário sem preencher campos
- **Comportamento esperado**: Validar campos obrigatórios
- **Comportamento atual**: Aceita submit vazio
- **Como reproduzir**:
  1. Não preencher nenhum campo
  2. Clicar "Enviar"
  3. Report vazio é criado

### Bug #25: Lista não atualiza após novo bug
- **Severidade**: Média
- **Localização**: `src/pages/Reports.tsx` - re-render
- **Descrição**: Novo bug não aparece na lista até recarregar página
- **Comportamento esperado**: Lista atualizar automaticamente
- **Comportamento atual**: Requer refresh manual
- **Como reproduzir**:
  1. Adicionar novo report
  2. Lista permanece vazia/desatualizada

### Bug #26: Filtro sempre retorna vazio
- **Severidade**: Alta
- **Localização**: `src/pages/Reports.tsx` - filteredReports
- **Descrição**: Filtro de severity sempre retorna array vazio
- **Comportamento esperado**: Filtrar corretamente por severity
- **Comportamento atual**: `severityFilter === 'all' ? [] : bugReports`
- **Como reproduzir**:
  1. Criar alguns reports
  2. Aplicar filtro
  3. Lista fica vazia

### Bug #27: Ordenação inversa
- **Severidade**: Baixa
- **Localização**: `src/pages/Reports.tsx` - sortedReports
- **Descrição**: Lista ordenada do mais antigo para o mais novo
- **Comportamento esperado**: Mais recente primeiro
- **Comportamento atual**: .reverse() inverte a ordem errada
- **Como reproduzir**: Ver lista de reports

### Bug #28: Data salva um dia adiantada
- **Severidade**: Média
- **Localização**: `src/contexts/GameContext.tsx` - addBugReport
- **Descrição**: Date.now() + 86400000 adiciona 1 dia
- **Comportamento esperado**: Data atual
- **Comportamento atual**: Data de amanhã
- **Como reproduzir**:
  1. Criar report hoje
  2. Ver data de amanhã

### Bug #29: Contador de bugs incorreto
- **Severidade**: Baixa
- **Localização**: `src/pages/Reports.tsx` - total de bugs
- **Descrição**: Exibe `bugReports.length * 2`
- **Comportamento esperado**: Número real de reports
- **Comportamento atual**: Dobro do valor correto
- **Como reproduzir**: Ver contador no rodapé

---

## 🏆 DESAFIOS AVANÇADOS

### Bug #30: Status "Aprovado" em vermelho
- **Severidade**: Baixa
- **Localização**: `src/pages/Challenges.tsx` - getStatusColor
- **Descrição**: Status verde exibido com cor vermelha (destrutiva)
- **Comportamento esperado**: Aprovado = verde/success
- **Comportamento atual**: Aprovado = vermelho/destructive
- **Como reproduzir**: Ver cards de desafios

### Bug #31: Botão "Ver Detalhes" não funciona
- **Severidade**: Média
- **Localização**: `src/pages/Challenges.tsx` - Button onClick
- **Descrição**: Botão não tem handler, não faz nada
- **Comportamento esperado**: Abrir modal ou navegar
- **Comportamento atual**: Nenhuma ação
- **Como reproduzir**: Clicar no botão

### Bug #32: Dados exportados truncados
- **Severidade**: Média (conceitual - feature não implementada)
- **Descrição**: Se existisse export CSV, dados viriam truncados
- **Como testar**: Feature não existe, bug conceitual

### Bug #33: Ranking com nomes duplicados
- **Severidade**: Baixa (conceitual - ranking não implementado)
- **Descrição**: Se existisse ranking, teria nomes repetidos
- **Como testar**: Feature não existe, bug conceitual

### Bug #34: Campos perdem dados ao navegar
- **Severidade**: Média
- **Localização**: Navegação entre páginas
- **Descrição**: Formulários não mantêm estado ao sair e voltar
- **Comportamento esperado**: Preservar dados não salvos (ou avisar)
- **Comportamento atual**: Dados perdidos
- **Como reproduzir**:
  1. Preencher formulário parcialmente
  2. Navegar para outra página
  3. Voltar - dados perdidos

### Bug #35: API altera dados errados
- **Severidade**: Alta (conceitual)
- **Descrição**: Operações PUT/DELETE afetariam registros errados
- **Como testar**: Simular em API Tester

---

## 🎮 SISTEMA DE GAMIFICAÇÃO

### Bug #36: XP não atualiza automaticamente
- **Severidade**: Alta
- **Localização**: `src/contexts/GameContext.tsx` - addXP
- **Descrição**: XP só atualiza após 5 segundos (setTimeout)
- **Comportamento esperado**: Atualização instantânea
- **Comportamento atual**: Delay de 5 segundos
- **Como reproduzir**:
  1. Completar missão
  2. XP não atualiza imediatamente

### Bug #37: XP exibido incorreto no header
- **Severidade**: Baixa
- **Localização**: `src/components/Layout.tsx` - display XP
- **Descrição**: Exibe `xp + 10` ao invés de `xp`
- **Comportamento esperado**: Valor real de XP
- **Comportamento atual**: 10 pontos a mais
- **Como reproduzir**: Ver header - XP sempre +10

### Bug #38: XP negativo não tratado
- **Severidade**: Média (conceitual)
- **Descrição**: Sistema não impede XP negativo
- **Comportamento esperado**: XP mínimo = 0
- **Comportamento atual**: Aceita valores negativos
- **Como testar**: Tentar addXP com valor negativo

---

## 🎨 LAYOUT E NAVEGAÇÃO

### Bug #39: Easter egg - clicar 5x no logo
- **Severidade**: Baixa (intencional/easter egg)
- **Localização**: `src/components/Layout.tsx` - handleLogoClick
- **Descrição**: Clicar 5x no logo mostra alert "Você quebrou o sistema!"
- **Como reproduzir**: Clicar 5x no logo do header

### Bug #40: Contador de progresso incorreto no dashboard
- **Severidade**: Média
- **Localização**: `src/pages/Dashboard.tsx`
- **Descrição**: progressPercentage adiciona +15 ao valor correto
- **Comportamento esperado**: Porcentagem real de conclusão
- **Comportamento atual**: (completadas / total) * 100 + 15
- **Como reproduzir**: Ver barra de progresso no dashboard

---

## 📋 CRITÉRIOS DE AVALIAÇÃO

Para cada bug reportado pelo QA em treinamento, avaliar:

### ✅ Completo (10 pontos):
- Bug identificado corretamente
- Severidade apropriada
- Passos para reproduzir claros
- Comportamento esperado vs atual descrito
- Localização aproximada identificada

### ⚠️ Parcial (5 pontos):
- Bug identificado mas severidade incorreta
- Passos incompletos
- Descrição vaga

### ❌ Falso Positivo (-5 pontos):
- Reportar comportamento correto como bug
- Duplicar report existente sem adicionar informação

### 🎯 Pontuação Extra:
- +5: Identificar relação entre bugs
- +5: Sugerir solução técnica
- +5: Priorizar bugs corretamente (críticos primeiro)

---

## 🎓 NÍVEIS DE PROGRESSÃO

**Trainee (0-50 XP)**:
- Encontra bugs visuais óbvios
- Identifica erros de texto
- Testa fluxo básico

**Junior (51-100 XP)**:
- Encontra bugs de validação
- Testa edge cases simples
- Documenta adequadamente

**Pleno (101-200 XP)**:
- Identifica bugs de lógica
- Relaciona bugs entre módulos
- Sugere impacto no usuário

**Sênior (201+ XP)**:
- Encontra bugs sutis e complexos
- Identifica problemas de arquitetura
- Propõe soluções técnicas

---

**Última atualização**: 2025
**Versão**: 2.0
**Mantenedor**: Eric Genovez
