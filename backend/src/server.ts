import app from './app';
import sequelize from './utils/database';
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
