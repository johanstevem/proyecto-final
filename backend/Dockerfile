# Usar la imagen base
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1731369831

# Establecer el directorio de trabajo
WORKDIR /app/

# Copiar los archivos al contenedor
COPY . /app/.

# Instalar Composer
RUN apt-get update && apt-get install -y curl php-cli php-mbstring git unzip
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# Instalar dependencias
RUN composer install && yarn && yarn prod && php artisan optimize && php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force
