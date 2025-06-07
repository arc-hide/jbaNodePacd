const assyncHandler = require("express-async-handler");
const setPriority = require("../models/priorityModel");
const docStorageSchema = require("../models/docsCat");

const addPriority = assyncHandler(async (req, res) => {
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
  if (
    !firstName ||
    !lastName ||
    !idNumber ||
    !typeOfPriority ||
    !birth ||
    !death ||
    !marriage ||
    !cenomar
  ) {
    res.status(400).json({ message: "fields should not be empty" });
  }
  //insert docs to database

  // await docStorageSchema.create({
  //   typeOfPriority,
  //   birth,
  //   death,
  //   marriage,
  //   cenomar,
  // });

  //@save priority to database
  const priorityCreate = await setPriority.create({
    firstName,
    middleName,
    lastName,
    idNumber,
    typeOfPriority,
    birth,
    death,
    marriage,
    cenomar,
  });
  //check if priority is successfull

  if (priorityCreate) {
    res.redirect("/dashboard");
  } else {
    res.status(400).json({ message: "problem saving to database" });
  }
});

//searh priority
const searchPriority = assyncHandler(async (req, res) => {
  let data = await setPriority.find({
    $or: [
      { firstName: { $regex: req.params.key } },
      { lastName: { $regex: req.params.key } },
    ],
  });
  if (data == "") {
    res.send("Client not yet Verified");
  } else {
    res.send(data);
  }
});

const getPriorities = assyncHandler(async (req, res) => {
  const locals = {
    title: "dashboard",
    description: "this is the description of a priority details",
  };
  try {
    const priorityData = await setPriority.find({}).sort({ _id: -1 });
    function FormatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    }

    const adlaw = FormatDate();

    res.render("pages/dashboard", {
      title: "dashboard",
      adlaw,
      priorityData,
      adminName: req.session.user.Name,
    });
  } catch (error) {
    console.error("cannot fetch priorities", error);
  }
});
//to report page

//to download
// const priorityToDownload = assyncHandler(async (req, res) => {
//   try {
//     const curentDate = new Date();
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true, // Optional for AM/PM format
//     };
//     const dateFormat = curentDate.toLocaleDateString("en-PH", options);
//     const fetchToDownload = await setPriority.find({}).sort({ _id: -1 });
//     const philId = await setPriority.countDocuments({
//       typeOfPriority: "philid",
//     });
//     const senior = await setPriority.countDocuments({
//       typeOfPriority: "senior",
//     });
//     const pwd = await setPriority.countDocuments({
//       typeOfPriority: "pwd",
//     });
//     const urgent = await setPriority.countDocuments({
//       typeOfPriority: "urgent",
//     });
//     const hospitalReq = await setPriority.countDocuments({
//       typeOfPriority: "Hospital",
//     });
//     const pregnant = await setPriority.countDocuments({
//       typeOfPriority: "pregnant",
//     });

//     //sum of birth by priority
//     // const pregn = await setPriority.find(
//     //   {
//     //     typeOfPriority: "pregnant",
//     //   },
//     //   { birth: 1 }
//     // );
//     // //total of birth
//     // const pre = [...pregn];
//     // let pregTb = 0;
//     // pre.forEach((b) => {
//     //   return (total += b.birth);
//     // });
//     // const ptb = pregTb;
//     //total of birth

//     const prioritySum = senior + pwd + urgent + hospitalReq + pregnant;

//     console.log("philippine is:", philId);
//     console.log("allPriority:", prioritySum);
//     //total births pregnant
//     const Births = await setPriority.find(
//       { typeOfPriority: "pregnant" },
//       { birth: 1 }
//     );
//     const bth = [...Births];
//     let bn = 0;
//     bth.forEach((brth) => {
//       return (bn += brth.birth);
//     });
//     //total senior
//     const sen = await setPriority.find(
//       { typeOfPriority: "senior" },
//       { birth: 1 }
//     );
//     const sbth = [...sen];
//     let sbn = 0;
//     sbth.forEach((sb) => {
//       return (sbn += sb.birth);
//     });
//     //senior cenomar
//     const senc = await setPriority.find(
//       { typeOfPriority: "senior" },
//       { cenomar: 1 }
//     );
//     const sencen = [...senc];
//     let sc = 0;
//     sencen.forEach((scen) => {
//       return (sc += scen.cenomar);
//     });
//     //senior

//     res.render("pages/report", {
//       title: "report",
//       dateFormat,
//       fetchToDownload,
//       philId,
//       prioritySum,
//       senior,
//       pwd,
//       urgent,
//       hospitalReq,
//       pregnant,
//       bn,
//       sbn,
//       sc,
//     });
//   } catch (error) {
//     console.log("cannot fetch to download the data", error);
//   }
// });

//delete priority
const deletePriority = async (req, res) => {
  try {
    const del = await setPriority.findByIdAndDelete(req.params.id);
    if (del) {
      console.log("deleted succesfully");
    }
  } catch (error) {
    console.error("cannot be deleted", error);
  }
};

module.exports = {
  addPriority,
  searchPriority,
  getPriorities,
  deletePriority,
};
