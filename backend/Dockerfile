FROM php:8.2-fpm

WORKDIR /var/www/html

COPY . .

RUN composer install --no-interaction --optimize-autoloader
RUN yarn && yarn prod

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

