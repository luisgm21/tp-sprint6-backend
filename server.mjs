import 'dotenv/config';
import app from './src/app.mjs';
import connectDB from './src/config/db.mjs';

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();