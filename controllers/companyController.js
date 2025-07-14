import Company from "../models/companyModel.js";

// Create - Register new company
export const registerCompany = async (req, res) => {
  try {
    const { name, contactPerson } = req.body;

    const existing = await Company.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const company = new Company({ name, contactPerson });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Update company by ID
export const updateCompany = async (req, res) => {
  try {
    const { name, contactPerson } = req.body;
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { name, contactPerson },
      { new: true }
    );
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete - Soft delete (archive) company
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
