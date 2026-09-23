const asyncHandler = require("express-async-handler");
const setPriority = require("../models/priorityModel");

// =====================================================
// DATE FORMAT
// Output: 09/24/2026 12:55 AM
// =====================================================

const formatDateTime = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

// =====================================================
// ADD PRIORITY
// =====================================================

const addPriority = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    idNumber,
    typeOfPriority,
    birth,
    death,
    marriage,
    cenomar,
  } = req.body;

  // -----------------------------------------------
  // Validate required fields
  // -----------------------------------------------

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !idNumber?.trim() ||
    !typeOfPriority?.trim() ||
    birth === undefined ||
    death === undefined ||
    marriage === undefined ||
    cenomar === undefined
  ) {
    return res.status(400).json({
      message: "Fields should not be empty",
    });
  }

  // -----------------------------------------------
  // Save priority to database
  // -----------------------------------------------

  const priorityCreate = await setPriority.create({
    firstName: firstName.trim(),
    middleName: middleName?.trim() || "",
    lastName: lastName.trim(),
    idNumber: idNumber.trim(),
    typeOfPriority: typeOfPriority.trim(),
    birth,
    death,
    marriage,
    cenomar,
  });

  // -----------------------------------------------
  // Check if successful
  // -----------------------------------------------

  if (!priorityCreate) {
    return res.status(400).json({
      message: "Problem saving to database",
    });
  }

  return res.redirect("/dashboard");
});

// =====================================================
// SEARCH PRIORITY
// =====================================================

const searchPriority = asyncHandler(async (req, res) => {
  const key = req.params.key?.trim();

  if (!key) {
    return res.status(400).json({
      message: "Search keyword is required",
    });
  }

  // Escape regex special characters
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const data = await setPriority.find({
    $or: [
      {
        firstName: {
          $regex: escapedKey,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: escapedKey,
          $options: "i",
        },
      },
    ],
  });

  if (data.length === 0) {
    return res.send("Client not yet Verified");
  }

  return res.json(data);
});

// =====================================================
// GET PRIORITIES / DASHBOARD
// =====================================================

const getPriorities = asyncHandler(async (req, res) => {
  try {
    const priorityData = await setPriority
      .find({})
      .sort({ _id: -1 });

    const adlaw = formatDateTime(new Date());

    const adminName = req.session?.user?.Name || "Administrator";

    return res.render("pages/dashboard", {
      title: "dashboard",
      adlaw,
      priorityData,
      adminName,
    });
  } catch (error) {
    console.error("Cannot fetch priorities:", error);

    return res.status(500).send("Unable to fetch priorities");
  }
});

// =====================================================
// REPORT
// =====================================================

const priorityToDownload = asyncHandler(async (req, res) => {
  try {
    // -----------------------------------------------
    // Current Philippine date/time
    // -----------------------------------------------

    const dateFormat = formatDateTime(new Date());

    // -----------------------------------------------
    // Get all priority records
    // -----------------------------------------------

    const fetchToDownload = await setPriority
      .find({})
      .sort({ _id: -1 });

    // -----------------------------------------------
    // Count priority types
    // -----------------------------------------------

    const [
      philId,
      senior,
      pwd,
      urgent,
      hospitalReq,
      pregnant,
    ] = await Promise.all([
      setPriority.countDocuments({
        typeOfPriority: "philid",
      }),

      setPriority.countDocuments({
        typeOfPriority: "senior",
      }),

      setPriority.countDocuments({
        typeOfPriority: "pwd",
      }),

      setPriority.countDocuments({
        typeOfPriority: "urgent",
      }),

      setPriority.countDocuments({
        typeOfPriority: "Hospital",
      }),

      setPriority.countDocuments({
        typeOfPriority: "pregnant",
      }),
    ]);

    // -----------------------------------------------
    // Total priority
    // -----------------------------------------------

    const prioritySum =
      senior +
      pwd +
      urgent +
      hospitalReq +
      pregnant;

    // -----------------------------------------------
    // Pregnant - total birth
    // -----------------------------------------------

    const pregnantBirthResult = await setPriority.aggregate([
      {
        $match: {
          typeOfPriority: "pregnant",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $convert: {
                input: "$birth",
                to: "double",
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      },
    ]);

    const bn = pregnantBirthResult[0]?.total || 0;

    // -----------------------------------------------
    // Senior - total birth
    // -----------------------------------------------

    const seniorBirthResult = await setPriority.aggregate([
      {
        $match: {
          typeOfPriority: "senior",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $convert: {
                input: "$birth",
                to: "double",
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      },
    ]);

    const sbn = seniorBirthResult[0]?.total || 0;

    // -----------------------------------------------
    // Senior - total CENOMAR
    // -----------------------------------------------

    const seniorCenomarResult = await setPriority.aggregate([
      {
        $match: {
          typeOfPriority: "senior",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $convert: {
                input: "$cenomar",
                to: "double",
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      },
    ]);

    const sc = seniorCenomarResult[0]?.total || 0;

    // -----------------------------------------------
    // Debug information
    // -----------------------------------------------

    console.log("PhilID:", philId);
    console.log("Total Priority:", prioritySum);

    // -----------------------------------------------
    // Render report
    // -----------------------------------------------

    return res.render("pages/report", {
      title: "report",
      dateFormat,
      fetchToDownload,
      philId,
      prioritySum,
      senior,
      pwd,
      urgent,
      hospitalReq,
      pregnant,
      bn,
      sbn,
      sc,
    });
  } catch (error) {
    console.error(
      "Cannot fetch data for report:",
      error
    );

    return res.status(500).send(
      "Unable to generate report"
    );
  }
});

// =====================================================
// DELETE ONE PRIORITY
// =====================================================

const deletePriority = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Priority ID is required",
    });
  }

  const deletedPriority =
    await setPriority.findByIdAndDelete(id);

  if (!deletedPriority) {
    return res.status(404).json({
      message: "Priority record not found",
    });
  }

  console.log("Priority deleted successfully");

  return res.redirect("/dashboard");
});

// =====================================================
// DELETE ALL PRIORITIES
// =====================================================

const deleteAllPriority = asyncHandler(async (req, res) => {
  const deleteResult = await setPriority.deleteMany({});

  console.log(
    `Deleted ${deleteResult.deletedCount} priority records`
  );

  return res.redirect("/dashboard");
});

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  addPriority,
  searchPriority,
  getPriorities,
  priorityToDownload,
  deletePriority,
  deleteAllPriority,
};