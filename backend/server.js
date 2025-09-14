require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const ee = require('@google/earthengine'); // <-- ADD THIS

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// --- GEE AUTHENTICATION ---
try {
    const GEE_PRIVATE_KEY = require('./config/gee-credentials.json');
    ee.data.authenticateViaPrivateKey(GEE_PRIVATE_KEY, 
        () => {
            console.log('GEE Authentication Successful.');
            ee.initialize(null, null, 
                () => console.log('GEE Initialized.'),
                (err) => console.error('GEE Initialization Error:', err)
            );
        },
        (err) => console.error('GEE Authentication Error:', err)
    );
} catch (error) {
    console.error('Could not load GEE credentials. Make sure config/gee-credentials.json exists.', error);
}
// -------------------------

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/satellite', require('./routes/satelliteRoutes')); // <-- ADD THIS

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));