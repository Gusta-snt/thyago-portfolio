-- Register Tau Money
INSERT INTO companies (name, role, purpose, description, link, logo_url, type)
VALUES (
    'Tau Money',
    'Founder / CEO',
    'Educação financeira e soluções para liberdade econômica.',
    'A Tau Money é focada em transformar a relação das pessoas com o dinheiro através de educação, tecnologia e estratégias de investimento inteligentes.',
    'https://www.taumoney.com.br/',
    'https://www.taumoney.com.br/favicon.ico', -- Placeholder or actual logo if known
    'Educação Financeira'
)
ON CONFLICT DO NOTHING;
