-- Seed existing data into the database
-- This migration will be pushed to the remote database to populate the tables

-- Books
INSERT INTO books (title, subtitle, year, description, category, link, cover_url)
SELECT * FROM (VALUES
    ('Título do Livro 1', 'Subtítulo do Livro', '2024', 'Descrição breve do livro, abordando os principais tópicos e contribuições para a área.', 'Negócios', '#', 'https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro'),
    ('Título do Livro 2', 'Subtítulo do Livro', '2023', 'Descrição breve do livro, abordando os principais tópicos e contribuições para a área.', 'Liderança', '#', 'https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro'),
    ('Título do Livro 3', 'Subtítulo do Livro', '2022', 'Descrição breve do livro, abordando os principais tópicos e contribuições para a área.', 'Educação', '#', 'https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro'),
    ('Título do Livro 4', 'Subtítulo do Livro', '2021', 'Descrição breve do livro, abordando os principais tópicos e contribuições para a área.', 'Negócios', '#', 'https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro'),
    ('Título do Livro 5', 'Subtítulo do Livro', '2020', 'Descrição breve do livro, abordando os principais tópicos e contribuições para a área.', 'Liderança', '#', 'https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro')
) AS t(title, subtitle, year, description, category, link, cover_url)
WHERE NOT EXISTS (SELECT 1 FROM books WHERE books.title = t.title);

-- Companies
INSERT INTO companies (name, role, purpose, description, link, logo_url, type)
SELECT * FROM (VALUES
    ('Empresa 1', 'Cargo / Função', 'Breve descrição do propósito da empresa.', 'Descrição detalhada sobre a empresa, suas atividades principais e o impacto gerado no mercado.', '#', 'https://placehold.co/150x150/12433e/ffffff?text=Empresa+1', 'Setor de Atuação'),
    ('Empresa 2', 'Cargo / Função', 'Breve descrição do propósito da empresa.', 'Descrição detalhada sobre a empresa, suas atividades principais e o impacto gerado no mercado.', '#', 'https://placehold.co/150x150/12433e/ffffff?text=Empresa+2', 'Setor de Atuação'),
    ('Empresa 3', 'Cargo / Função', 'Breve descrição do propósito da empresa.', 'Descrição detalhada sobre a empresa, suas atividades principais e o impacto gerado no mercado.', '#', 'https://placehold.co/150x150/12433e/ffffff?text=Empresa+3', 'Setor de Atuação')
) AS t(name, role, purpose, description, link, logo_url, type)
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE companies.name = t.name);

-- Projects
INSERT INTO projects (title, role, description, link)
SELECT * FROM (VALUES
    ('Projeto 1', 'Papel no Projeto', 'Descrição do projeto, objetivos e resultados alcançados.', '#'),
    ('Projeto 2', 'Papel no Projeto', 'Descrição do projeto, objetivos e resultados alcançados.', '#')
) AS t(title, role, description, link)
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE projects.title = t.title);

-- Expertise
INSERT INTO expertise (name)
SELECT * FROM (VALUES
    ('Inteligência Artificial & Data Science'),
    ('Engenharia Econômica e Financeira'),
    ('Otimização Matemática'),
    ('Mercado de Capitais & HFT'),
    ('Business Intelligence (BI)'),
    ('Planejamento Tributário')
) AS t(name)
WHERE NOT EXISTS (SELECT 1 FROM expertise WHERE expertise.name = t.name);

-- Timeline
INSERT INTO timeline (year_range, role, organization, description)
SELECT * FROM (VALUES
    ('2018 - 2020', 'Esp. em Engenharia Econômica e Financeira', 'UFG', 'Título: Automating Asset Trading in the Financial Market Using Artificial Intelligence.'),
    ('2013 - 2015', 'Esp. em Planejamento Tributário', 'UFG', 'Especialização focada em estratégias tributárias e planejamento fiscal.'),
    ('2005 - 2007', 'Esp. em Economia Financeira', 'UNICAMP', 'Título: Uma Gestão Eficiente de uma Carteira de Ações no Mercado Brasileiro.'),
    ('2002 - 2006', 'Doutorado em Eng. Elétrica', 'UNICAMP', 'Título: Uma Política Operativa a Usinas Individualizadas para o Sistema Interligado Nacional.'),
    ('2000 - 2002', 'Mestrado em Eng. Elétrica e de Computação', 'UFG', 'Pesquisa em alocação de contratos de energia elétrica e sistemas de apoio à decisão.'),
    ('1996 - 1999', 'Graduação em Ciência da Computação', 'IUESO', 'Desenvolvimento de Biblioteca Virtual.')
) AS t(year_range, role, organization, description)
WHERE NOT EXISTS (SELECT 1 FROM timeline WHERE timeline.role = t.role AND timeline.year_range = t.year_range);
