# Usar la imagen base
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1731369831

# Establecer el directorio de trabajo
WORKDIR /app/

# Copiar los archivos al contenedor
COPY . /app/.

# Instalar dependencias de frontend y backend
RUN yarn && yarn prod && php artisan optimize && php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force
