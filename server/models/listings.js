module.exports = (sequelize, DataTypes) => {
    const listings = sequelize.define("listings", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        propertyType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        area: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imgurl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return listings
};