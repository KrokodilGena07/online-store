class BrandDto {
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.image = 'data:image/png;base64,' + Buffer.from(model.image).toString('base64');
    }
}

module.exports = BrandDto;