# Usar una imagen base que permita instalar dependencias
FROM php:8.1-cli

# Instalar dependencias necesarias como curl, git, unzip y Composer
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY . /app/

# Ejecutar los comandos necesarios para instalar dependencias y configurar el proyecto
RUN composer install && yarn && yarn prod && php artisan optimize && php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force

