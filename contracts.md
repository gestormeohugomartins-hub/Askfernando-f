# AskFernando.pt - Documentação Completa

## Visão Geral
Site profissional multilíngue de serviços para imigrantes em Portugal, especializado em telecomunicações, seguros, imobiliário e hipotecas.

## 🌐 Sistema Multilíngue
- **Idiomas**: Inglês (padrão), Francês, Português
- **Seleção**: Bandeiras clicáveis no header
- **Persistência**: Idioma salvo em localStorage
- **Dinâmico**: Todos os componentes traduzidos automaticamente

## ✅ Frontend (Concluído)
### Estrutura de Componentes
- **Header.jsx**: Navegação fixa com menu responsivo
- **Hero.jsx**: Seção hero com gradiente azul/laranja e estatísticas
- **About.jsx**: Seção "Sobre Mim" com foto profissional e highlights
- **Services.jsx**: 4 serviços principais com imagens e descrições
- **Testimonials.jsx**: Grid de 6 testemunhos com sistema de avaliação
- **Contact.jsx**: Formulário de contato + informações de contacto
- **Footer.jsx**: Rodapé completo com links e informações
- **WhatsAppButton.jsx**: Botão flutuante verde com link direto para WhatsApp

### Dados Mock (mockData.js)
```javascript
mockTestimonials: Array de 8 testemunhos com:
- name: string
- location: string  
- text: string
- rating: number (sempre 5)
```

### Esquema de Cores
- **Preto**: `#0f172a` (slate-900)
- **Azul**: `#1e40af` (blue-700), `#1e3a8a` (blue-900)
- **Laranja**: `#ea580c` (orange-600)

## ✅ Backend (Implementado)
### Endpoints Necessários

#### 1. POST /api/contact
**Descrição**: Receber mensagem do formulário de contacto
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (opcional)",
  "message": "string"
}
```
**Response**: 
```json
{
  "success": true,
  "message": "Mensagem recebida com sucesso"
}
```

#### 2. GET /api/testimonials
**Descrição**: Buscar testemunhos da base de dados
**Response**:
```json
[
  {
    "id": "string",
    "name": "string",
    "location": "string",
    "text": "string",
    "rating": number,
    "created_at": "datetime"
  }
]
```

### Modelos MongoDB
```python
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, replied

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    text: str
    rating: int = 5
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = False
```

## 🔐 Painel Admin
**URL**: askfernando.pt/backend (quando em produção)
**Credenciais**:
- Username: `Askfernandoadmin`
- Password: `Askfernando2025*`

### Endpoints Admin Disponíveis:
- GET /api/admin/contact-messages - Listar mensagens
- PATCH /api/admin/contact-messages/{id} - Atualizar status
- GET /api/admin/testimonials - Listar todos testemunhos
- POST /api/admin/testimonials - Criar novo testemunho
- PATCH /api/admin/testimonials/{id} - Atualizar testemunho
- DELETE /api/admin/testimonials/{id} - Deletar testemunho
- POST /api/admin/seed-testimonials - Popular banco (já executado)

## 📧 Sistema de Email
**Configurado e Funcionando**:
- Servidor SMTP: mail.askfernando.pt (porta 465, SSL)
- Email de saída: contactos@askfernando.pt
- Email destino: fernandomendes@askfernando.pt
- Template HTML profissional com informações completas

## ✅ Integração Frontend-Backend (Completa)

### Testemunhos:
**Arquivo**: `/app/frontend/src/components/Testimonials.jsx`
```javascript
// Remover: import { mockTestimonials } from '../utils/mockData';
// Adicionar chamada API:
const [testimonials, setTestimonials] = useState([]);

useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Erro ao buscar testemunhos:', error);
    }
  };
  fetchTestimonials();
}, []);
```

### Passo 2: Implementar Envio de Formulário
**Arquivo**: `/app/frontend/src/components/Contact.jsx`
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    toast({
      title: "Mensagem enviada!",
      description: "Entrarei em contacto consigo brevemente.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  } catch (error) {
    toast({
      title: "Erro ao enviar mensagem",
      description: "Por favor, tente novamente.",
      variant: "destructive",
    });
  }
};
```

## Funcionalidades Implementadas
✅ Design responsivo para mobile e desktop
✅ Navegação suave entre seções
✅ Botão WhatsApp flutuante (+351 913 287 073)
✅ Formulário de contacto com validação
✅ Sistema de toasts para feedback
✅ Botão "Voltar ao topo"
✅ Animações e transições
✅ Imagens profissionais de alta qualidade
✅ Esquema de cores preto/azul/laranja

## Próximos Passos
1. Implementar backend com FastAPI
2. Criar modelos MongoDB
3. Implementar endpoints REST
4. Integrar frontend com backend (remover mocks)
5. Adicionar validação de email no backend
6. Configurar envio de emails (opcional)
7. Testes completos de integração

## Contactos do Site
- **Email**: fernandomendes@askfernando.pt
- **Telefone/WhatsApp**: +351 913 287 073
- **Website**: askfernando.pt
