-- Inserir usuário admin no auth.users
INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    role
)
VALUES (
    'willis-engmec@hotmail.com',
    crypt('58791210', gen_salt('bf')),
    now(),
    'admin'
);

-- Inserir perfil do admin na tabela usuarios
INSERT INTO usuarios (
    id,
    nome,
    email,
    telefone,
    role
)
VALUES (
    (SELECT id FROM auth.users WHERE email = 'willis-engmec@hotmail.com'),
    'Administrador',
    'willis-engmec@hotmail.com',
    '(11) 99999-9999',
    'admin'
); 