-- Create tables for the portfolio

-- Books table
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    year TEXT,
    description TEXT,
    category TEXT,
    link TEXT,
    cover_url TEXT
);

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    role TEXT,
    purpose TEXT,
    description TEXT,
    link TEXT,
    logo_url TEXT,
    type TEXT
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    role TEXT,
    description TEXT,
    link TEXT
);

-- Expertise table
CREATE TABLE expertise (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL
);

-- Timeline table
CREATE TABLE timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    year_range TEXT NOT NULL,
    role TEXT NOT NULL,
    organization TEXT,
    description TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;

-- Create public read-only policies
CREATE POLICY "Allow public read-only access for books" ON books FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for expertise" ON expertise FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for timeline" ON timeline FOR SELECT USING (true);

-- Create authenticated write policies (for admin use)
CREATE POLICY "Allow authenticated full access for books" ON books FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access for companies" ON companies FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access for projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access for expertise" ON expertise FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access for timeline" ON timeline FOR ALL TO authenticated USING (true);
