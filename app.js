
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import fuelEntryRoutes from "./routes/fuelEntryRoutes.js";
import fuelTransactionRoutes from "./routes/fuelTransactionRoutes.js";
import fuelPumpAttendantRoutes from "./routes/fuelPumpAttendantRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}));
app.use(cookieParser()); 

connectDB();


app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/fuel-entry", fuelEntryRoutes);
app.use("/api/fuel-transactions", fuelTransactionRoutes);
app.use("/api/attendant", fuelPumpAttendantRoutes);

export default app;
