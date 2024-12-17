# Usar una imagen base de PHP con Ubuntu
FROM php:8.4-cli

# Instalar dependencias necesarias para Composer y otros comandos
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos del proyecto
COPY . /app/

# Ejecutar los comandos necesarios
RUN composer install && yarn && yarn prod && php artisan optimize && php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force

# Establecer el comando por defecto para el contenedor
CMD ["php", "artisan", "serve"]
