# Usar la imagen base
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1731369831

# Establecer el directorio de trabajo
WORKDIR /app/

# Copiar los archivos al contenedor
COPY . /app/

# Instalar las dependencias del sistema
RUN apt-get update && apt-get install -y \
    curl \
    php-cli \
    php-mbstring \
    php-xml \
    php-curl \
    php-json \
    php-bcmath \
    git \
    unzip \
    && apt-get clean

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# Verificar la instalación de Composer
RUN composer --version

# Instalar dependencias de Composer, Yarn y Laravel
RUN composer install && yarn && yarn prod \
    && php artisan optimize \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan migrate --force

# Comando para iniciar el servidor web
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]

