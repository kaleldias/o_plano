FROM postgres:17-alpine

# Copia o dump.sql para o diretório de inicialização do PostgreSQL
COPY dump.sql /docker-entrypoint-initdb.d/dump.sql

# Define as variáveis de ambiente padrão do PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=senha123
ENV POSTGRES_DB=o_plano
