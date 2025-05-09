-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create usuarios table
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create rifas table (optional but recommended for multiple raffles)
CREATE TABLE rifas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    data_sorteio TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL DEFAULT 'em_andamento',
    preco_bilhete DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create bilhetes table
CREATE TABLE bilhetes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero INTEGER NOT NULL,
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    ganhador BOOLEAN DEFAULT FALSE,
    rifa_id UUID REFERENCES rifas(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_bilhetes_numero ON bilhetes(numero);
CREATE INDEX idx_bilhetes_usuario ON bilhetes(usuario_id);
CREATE INDEX idx_bilhetes_rifa ON bilhetes(rifa_id);
CREATE INDEX idx_bilhetes_ganhador ON bilhetes(ganhador);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rifas_updated_at
    BEFORE UPDATE ON rifas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bilhetes_updated_at
    BEFORE UPDATE ON bilhetes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create views for admin panel
CREATE OR REPLACE VIEW vw_bilhetes_detalhados AS
SELECT 
    b.numero as bilhete,
    u.nome,
    u.telefone,
    u.email,
    CASE 
        WHEN b.ganhador = true THEN '🏆 GANHADOR'
        ELSE 'Não sorteado'
    END as status,
    r.nome as nome_rifa,
    r.data_sorteio,
    b.created_at as data_compra
FROM bilhetes b
JOIN usuarios u ON b.usuario_id = u.id
LEFT JOIN rifas r ON b.rifa_id = r.id;

-- Create view for winners
CREATE OR REPLACE VIEW vw_ganhadores AS
SELECT 
    b.numero,
    u.nome,
    u.telefone,
    u.email,
    r.nome as nome_rifa,
    b.created_at as data_compra
FROM bilhetes b
JOIN usuarios u ON b.usuario_id = u.id
LEFT JOIN rifas r ON b.rifa_id = r.id
WHERE b.ganhador = true;

-- Create function to search ticket
CREATE OR REPLACE FUNCTION buscar_bilhete(numero_busca INTEGER)
RETURNS TABLE (
    bilhete INTEGER,
    nome TEXT,
    telefone TEXT,
    email TEXT,
    status TEXT,
    nome_rifa TEXT,
    data_sorteio TIMESTAMP WITH TIME ZONE,
    data_compra TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.numero as bilhete,
        u.nome,
        u.telefone,
        u.email,
        CASE 
            WHEN b.ganhador = true THEN '🏆 GANHADOR'
            ELSE 'Não sorteado'
        END as status,
        r.nome as nome_rifa,
        r.data_sorteio,
        b.created_at as data_compra
    FROM bilhetes b
    JOIN usuarios u ON b.usuario_id = u.id
    LEFT JOIN rifas r ON b.rifa_id = r.id
    WHERE b.numero = numero_busca;
END;
$$ LANGUAGE plpgsql;

-- Create function to mark ticket as winner
CREATE OR REPLACE FUNCTION marcar_ganhador(numero_bilhete INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE bilhetes
    SET ganhador = true
    WHERE numero = numero_bilhete;
END;
$$ LANGUAGE plpgsql; 