import Report from "../models/report.model.js";

// Create a new report
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

  const { id: veterinarianId } = req.user; // Veterinarian ID from token

  try {
    // Create the report
    const newReport = new Report({
      ownerName,
      ownerPhone,
      ownerEmail,
      petId, // Store only the pet ID
      petName, // Store pet name
      chipNumber,
      species,
      weight,
      consultationDate,
      consultationReason,
      clinicalSigns,
      diagnosis,
      treatment,
      recommendations,
      veterinarianId, // Store only the veterinarian ID
    });

    // Save the report in the database
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

// Get a report by ID
export const getReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    // Find the report by its ID
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ report });
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get reports by pet
export const getReportsByPet = async (req, res) => {
  const { petId } = req.params;

  try {
    const reports = await Report.find({ petId }); // Filter by petId
    res.json({ reports });
  } catch (error) {
    console.error("Error fetching reports by pet:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get reports created by a veterinarian
export const getReportsByVeterinarian = async (req, res) => {
  const { id: veterinarianId } = req.user;

  try {
    const reports = await Report.find({ veterinarianId }); // Filter by veterinarianId
    res.json({ reports });
  } catch (error) {
    console.error("Error fetching reports by veterinarian:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a report
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

// Delete a report
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
