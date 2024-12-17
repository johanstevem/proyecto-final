FROM php:8.1-fpm

# Instalar dependencias
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos al contenedor
COPY . .

# Instalar dependencias de Composer
RUN composer install

# Exponer el puerto 9000 para php-fpm
EXPOSE 9000

# Iniciar php-fpm
CMD ["php-fpm"]
