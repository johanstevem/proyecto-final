# Utilizar una imagen base con PHP y Composer
FROM php:8.4-cli

# Instalar las dependencias necesarias para Composer
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . /app/.

# Instalar las dependencias de Composer y ejecutar otros comandos
RUN composer install && yarn && yarn prod && php artisan optimize && php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force

# Comando para iniciar la aplicación
CMD ["php", "artisan", "serve"]
