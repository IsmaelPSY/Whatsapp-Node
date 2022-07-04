'use strict';

module.exports = {
    async up(queryInterface, DataTypes ) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('message', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            sender_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            consersation_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'conversations',
                    key: 'id'
                }
            },
            message: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        })
        await queryInterface.addConstraint(
            'message', //nombre de la tabla
            {
                fields: ['id','sender_id', 'consersation_id', 'message'], //columnas que tendran esta restriccion  
                type: 'unique', //restriccion para que los valores sean unicos
                name: 'unique_sender_id_consersation_id' //nombre para guardar el cambio
            }
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};