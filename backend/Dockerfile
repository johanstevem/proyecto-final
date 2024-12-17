FROM php:8.1-fpm

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git && docker-php-ext-configure gd --with-freetype --with-jpeg && docker-php-ext-install gd pdo pdo_mysql

WORKDIR /var/www/html

COPY . .

RUN composer install

EXPOSE 9000

CMD ["php-fpm"]
