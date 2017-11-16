import Sequelize from 'sequelize';

/**
  This file defines the models present in the Bored & Broke database.
  The function at the bottom of this file creates tables for each of the defined
  models if the tables haven't been created already.
*/

export class models {
  models() {

    // Connect to the database.
    this.sequelize = new Sequelize('ebdb', 'boredandbroke', 'put password here', {
      host: 'aa7h0812c86b9x.cinowngvasql.us-east-2.rds.amazonaws.com',
      dialect: 'postgres'
    });

    // Define the User model.
    this.User = this.sequelize.define('user', {

     // This id should be the user's Facebook id.
     id: { type: Sequelize.STRING,  primaryKey: true, allowNull: false },
     name: { type: Sequelize.STRING },
     bio: { type: Sequelize.STRING }

     });

    // Define the Activity model.
    this.Activity = this.sequelize.define('activity', {

     // Self incrementing primary key.
     id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
     // We can check that it has been 24 hours since the last time activities
     // have been added to the database.
     date_added: { type: Sequelize.INTEGER }, // YYYYMMDD syntax.
     name: { type: Sequelize.STRING },
     date: { type: Sequelize.INTEGER }, // YYYYMMDD syntax.
     location: { type: Sequelize.STRING },
     image_url: { type: Sequelize.STRING },
     link: { type: Sequelize.STRING },
     price: { type: Sequelize.DOUBLE },
     description: { type: Sequelize.STRING }

     });

    // Define the Tagline model. This can be used to query for a user's saved
    // activities, since a Tagline entry is created every time a user saves an
    // activity.
    this.Tagline = this.sequelize.define('tagline', {

     // Self incrementing primary key.
     id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

     // Foreign key to the Activity table.
     activity_id: {
       type: Sequelize.INTEGER,
       references: {
         model: this.Activity,
         key: 'id',
         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
       }
     },

     // Foreign key to the User table.
     user_id: {
       type: Sequelize.STRING,
       references: {
         model: this.User,
         key: 'id',
         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
       }
     },
     tagline: { type: Sequelize.STRING }

     });

  }
  
  sync() {
    this.sequelize.sync();
  }
}
