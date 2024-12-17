# Usa una imagen base de PHP con Composer preinstalado
FROM php:8.1-cli

# Instala Node.js y Yarn
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs && \
    npm install -g yarn

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu aplicación
COPY . /app/

# Instala las dependencias de Composer y Yarn
RUN composer install && \
    yarn && \
    yarn prod

# Ejecuta las optimizaciones de Laravel
RUN php artisan optimize && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan migrate --force

# Comando por defecto (opcional)
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
