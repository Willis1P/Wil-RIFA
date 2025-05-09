-- Habilitar as extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Configurar as políticas de segurança (RLS)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE rifas ENABLE ROW LEVEL SECURITY;
ALTER TABLE bilhetes ENABLE ROW LEVEL SECURITY;

-- Criar políticas para usuários anônimos (leitura pública)
CREATE POLICY "Permitir leitura pública de rifas" ON rifas
    FOR SELECT USING (true);

CREATE POLICY "Permitir leitura pública de bilhetes" ON bilhetes
    FOR SELECT USING (true);

-- Criar políticas para usuários autenticados
CREATE POLICY "Permitir inserção de usuários" ON usuarios
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pelo próprio usuário" ON usuarios
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Permitir inserção de bilhetes" ON bilhetes
    FOR INSERT WITH CHECK (true);

-- Criar função para gerar números sequenciais para bilhetes
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
DECLARE
    next_number INTEGER;
BEGIN
    SELECT COALESCE(MAX(numero), 0) + 1 INTO next_number FROM bilhetes;
    NEW.numero := next_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para gerar números de bilhetes automaticamente
CREATE TRIGGER set_ticket_number
    BEFORE INSERT ON bilhetes
    FOR EACH ROW
    EXECUTE FUNCTION generate_ticket_number();

-- Criar função para verificar disponibilidade de número
CREATE OR REPLACE FUNCTION is_ticket_number_available(numero_check INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM bilhetes WHERE numero = numero_check
    );
END;
$$ LANGUAGE plpgsql;

-- Criar função para reservar bilhete
CREATE OR REPLACE FUNCTION reservar_bilhete(
    p_usuario_id UUID,
    p_rifa_id UUID
) RETURNS INTEGER AS $$
DECLARE
    novo_numero INTEGER;
BEGIN
    -- Gerar próximo número disponível
    SELECT COALESCE(MAX(numero), 0) + 1 INTO novo_numero FROM bilhetes;
    
    -- Inserir novo bilhete
    INSERT INTO bilhetes (numero, usuario_id, rifa_id)
    VALUES (novo_numero, p_usuario_id, p_rifa_id);
    
    RETURN novo_numero;
END;
$$ LANGUAGE plpgsql;

-- Criar função para comprar múltiplos bilhetes
CREATE OR REPLACE FUNCTION comprar_bilhetes(
    p_usuario_id UUID,
    p_rifa_id UUID,
    p_quantidade INTEGER
) RETURNS INTEGER[] AS $$
DECLARE
    numeros INTEGER[];
    i INTEGER;
BEGIN
    FOR i IN 1..p_quantidade LOOP
        numeros := array_append(numeros, reservar_bilhete(p_usuario_id, p_rifa_id));
    END LOOP;
    
    RETURN numeros;
END;
$$ LANGUAGE plpgsql;

-- Criar view para dashboard administrativo
CREATE OR REPLACE VIEW vw_dashboard AS
SELECT
    (SELECT COUNT(*) FROM bilhetes) as total_bilhetes,
    (SELECT COUNT(DISTINCT usuario_id) FROM bilhetes) as total_usuarios,
    (SELECT COUNT(*) FROM bilhetes WHERE ganhador = true) as total_ganhadores,
    (SELECT COUNT(*) FROM rifas WHERE status = 'em_andamento') as rifas_ativas,
    (SELECT SUM(preco_bilhete) FROM rifas r JOIN bilhetes b ON r.id = b.rifa_id) as valor_total;

-- Inserir rifa inicial
INSERT INTO rifas (nome, data_sorteio, preco_bilhete)
VALUES (
    'BMW DOS SONHOS',
    (SELECT (NOW() + INTERVAL '7 days')::timestamp with time zone),
    0.10
); 