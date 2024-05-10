module.exports = (sequelize, DataTypes) => {
    const listings = sequelize.define("listings", {
        title: {
            type: DataTypes.STRING,
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
    })

    return listings
};