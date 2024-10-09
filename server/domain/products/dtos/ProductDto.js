class ProductDto {
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.price = model.price;
        this.brandId = model.brandId;
        this.categoryId = model.categoryId;
        this.likes = model.likes;
        this.dislikes = model.dislikes;
        this.image = 'data:image/png;base64,' + Buffer.from(model.image).toString('base64');
        this.infos = model.infos;
    }
}

module.exports = ProductDto;