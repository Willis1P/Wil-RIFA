-- 1. Buscar bilhete específico
-- Use esta query no painel admin para buscar um bilhete específico
SELECT * FROM buscar_bilhete({{numero_bilhete}});

-- 2. Listar todos os ganhadores
-- Use esta query para exibir uma tabela com todos os ganhadores
SELECT * FROM vw_ganhadores
ORDER BY data_compra DESC;

-- 3. Marcar bilhete como ganhador
-- Use esta query com um botão de ação no painel
SELECT marcar_ganhador({{numero_bilhete}});

-- 4. Buscar todos os bilhetes de um usuário por telefone
-- Útil para suporte ao cliente
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
WHERE u.telefone = {{telefone}}
ORDER BY b.created_at DESC;

-- 5. Dashboard de estatísticas
-- Use para mostrar números gerais
SELECT 
    COUNT(DISTINCT b.id) as total_bilhetes,
    COUNT(DISTINCT b.usuario_id) as total_compradores,
    COUNT(DISTINCT CASE WHEN b.ganhador THEN b.id END) as total_ganhadores,
    SUM(r.preco_bilhete) as valor_total_vendas
FROM bilhetes b
LEFT JOIN rifas r ON b.rifa_id = r.id;

-- 6. Últimas vendas (últimas 24 horas)
-- Útil para monitoramento em tempo real
SELECT 
    b.numero as bilhete,
    u.nome,
    u.telefone,
    r.nome as nome_rifa,
    b.created_at as data_compra
FROM bilhetes b
JOIN usuarios u ON b.usuario_id = u.id
LEFT JOIN rifas r ON b.rifa_id = r.id
WHERE b.created_at >= NOW() - INTERVAL '24 hours'
ORDER BY b.created_at DESC;

-- 7. Busca avançada por período
-- Para relatórios específicos
SELECT 
    b.numero as bilhete,
    u.nome,
    u.telefone,
    u.email,
    r.nome as nome_rifa,
    b.created_at as data_compra,
    r.preco_bilhete
FROM bilhetes b
JOIN usuarios u ON b.usuario_id = u.id
LEFT JOIN rifas r ON b.rifa_id = r.id
WHERE b.created_at BETWEEN {{data_inicio}} AND {{data_fim}}
ORDER BY b.created_at DESC; 