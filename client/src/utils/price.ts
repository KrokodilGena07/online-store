export const price = (price: number) => {
    return new Intl
        .NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'})
        .format(price);
};