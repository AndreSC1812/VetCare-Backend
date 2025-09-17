import Report from "../models/report.model.js";

// Crear un nuevo informe
export const createReport = async (req, res) => {
  const {
    ownerName,
    ownerPhone,
    ownerEmail,
    petId,
    petName,
    chipNumber,
    species,
    weight,
    consultationDate,
    consultationReason,
    clinicalSigns,
    diagnosis,
    treatment,
    recommendations,
  } = req.body;

  const { id: veterinarianId } = req.user; // ID del veterinario desde el token

  try {
    // Crear el informe
    const newReport = new Report({
      ownerName,
      ownerPhone,
      ownerEmail,
      petId, // Guardamos solo el ID de la mascota
      petName, // Guardamos el nombre de la mascota
      chipNumber,
      species,
      weight,
      consultationDate,
      consultationReason,
      clinicalSigns,
      diagnosis,
      treatment,
      recommendations,
      veterinarianId, // Guardamos solo el ID del veterinario
    });

    // Guardar el informe en la base de datos
    const savedReport = await newReport.save();

    res.status(201).json({
      message: "Report created successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener un informe por ID
export const getReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    // Buscar el informe por su ID
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Si se encuentra el informe, devolverlo
    res.json({ report });
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener informes por mascota
export const getReportsByPet = async (req, res) => {
  const { petId } = req.params;

  try {
    const reports = await Report.find({ petId }); // Filtramos por `petId`
    res.json({ reports });
  } catch (error) {
    console.error("Error fetching reports by pet:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener informes creados por un veterinario
export const getReportsByVeterinarian = async (req, res) => {
  const { id: veterinarianId } = req.user;

  try {
    const reports = await Report.find({
      veterinarianId, // Buscamos los informes por `veterinarianId`
    });
    res.json({ reports });
  } catch (error) {
    console.error("Error fetching reports by veterinarian:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Actualizar un informe
export const updateReport = async (req, res) => {
  const { reportId } = req.params;
  const updateData = req.body;

  try {
    const updatedReport = await Report.findByIdAndUpdate(reportId, updateData, {
      new: true,
    });
    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json({
      message: "Report updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Eliminar un informe
export const deleteReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Server error" });
  }
};
