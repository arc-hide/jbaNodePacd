const assyncHandler = require("express-async-handler");
const setPriority = require("../models/priorityModel");

const priorityToDownload = assyncHandler(async (req, res) => {
  try {
    const curentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      // second: "2-digit",
      // hour12: true, // Optional for AM/PM format
    };
    const dateFormat = curentDate.toLocaleDateString("en-PH", options);
    const fetchToDownload = await setPriority.find({}).sort({ _id: -1 });
    const philId = await setPriority.countDocuments({
      typeOfPriority: "philid",
    });
    const senior = await setPriority.countDocuments({
      typeOfPriority: "senior",
    });
    const pwd = await setPriority.countDocuments({
      typeOfPriority: "pwd",
    });
    const urgent = await setPriority.countDocuments({
      typeOfPriority: "urgent",
    });
    const hospitalReq = await setPriority.countDocuments({
      typeOfPriority: "Hospital",
    });
    const pregnant = await setPriority.countDocuments({
      typeOfPriority: "pregnant",
    });

    const prioritySum = senior + pwd + urgent + hospitalReq + pregnant + philId;

    //@total pregnant api
    //pregnant birth
    const Birthpreg = await setPriority.find(
      { typeOfPriority: "pregnant" },
      { birth: 1 }
    );
    const bth = [...Birthpreg];
    let bn = 0;
    bth.forEach((brth) => {
      return (bn += brth.birth);
    });
    //pregnat cenomar
    const pregc = await setPriority.find(
      { typeOfPriority: "pregnant" },
      { cenomar: 1 }
    );
    const pregNum = [...pregc];
    let pc = 0;
    pregNum.forEach((preg) => {
      return (pc += preg.cenomar);
    });
    //pregnant marriage
    const pregm = await setPriority.find(
      { typeOfPriority: "pregnant" },
      { marriage: 1 }
    );
    const pregmar = [...pregm];
    let pm = 0;
    pregmar.forEach((prem) => {
      return (pm += prem.marriage);
    });
    //pregnant death cert
    const pregd = await setPriority.find(
      { typeOfPriority: "pregnant" },
      { death: 1 }
    );
    const pregde = [...pregd];
    let pd = 0;
    pregde.forEach((pred) => {
      return (pd += pred.death);
    });
    //@end of pregnat api
    //@senior citizen datus
    //total senior birth
    const sen = await setPriority.find(
      { typeOfPriority: "senior" },
      { birth: 1 }
    );
    const sbth = [...sen];
    let sbn = 0;
    sbth.forEach((sb) => {
      return (sbn += sb.birth);
    });
    //senior cenomar
    const senc = await setPriority.find(
      { typeOfPriority: "senior" },
      { cenomar: 1 }
    );
    const sencen = [...senc];
    let sc = 0;
    sencen.forEach((scen) => {
      return (sc += scen.cenomar);
    });
    //senior marriage
    const senm = await setPriority.find(
      { typeOfPriority: "senior" },
      { marriage: 1 }
    );
    const senmar = [...senm];
    let sm = 0;
    senmar.forEach((smar) => {
      return (sm += smar.marriage);
    });
    //senior death
    const send = await setPriority.find(
      { typeOfPriority: "senior" },
      { death: 1 }
    );
    const sendet = [...send];
    let sd = 0;
    sendet.forEach((sdeath) => {
      return (sd += sdeath.death);
    });
    //@hospital requirements
    //birth
    const hosb = await setPriority.find(
      { typeOfPriority: "Hospital" },
      { birth: 1 }
    );
    const hr = [...hosb];
    let hb = 0;
    hr.forEach((hrb) => {
      return (hb += hrb.birth);
    });
    //cenomar
    const hosc = await setPriority.find(
      { typeOfPriority: "Hospital" },
      { cenomar: 1 }
    );
    const hrcen = [...hosc];
    let hc = 0;
    hrcen.forEach((hrc) => {
      return (hc += hrc.cenomar);
    });
    //marriage
    const hosm = await setPriority.find(
      { typeOfPriority: "Hospital" },
      { marriage: 1 }
    );
    const hrmar = [...hosm];
    let hm = 0;
    hrmar.forEach((hrm) => {
      return (hm += hrm.marriage);
    });
    //death
    const hosd = await setPriority.find(
      { typeOfPriority: "Hospital" },
      { death: 1 }
    );
    const hrdea = [...hosd];
    let hd = 0;
    hrdea.forEach((hrd) => {
      return (hd += hrd.death);
    });
    //@end of hospital req
    //@phil id
    //phil-id birth
    const phild = await setPriority.find(
      { typeOfPriority: "philid" },
      { birth: 1 }
    );
    const philda = [...phild];
    let phib = 0;
    philda.forEach((phd) => {
      return (phib += phd.birth);
    });

    //phil-id cenomar
    const philc = await setPriority.find(
      { typeOfPriority: "philid" },
      { cenomar: 1 }
    );
    const philcen = [...philc];
    let phicn = 0;
    philcen.forEach((phce) => {
      return (phicn += phce.cenomar);
    });

    //phil-id marriage
    const philm = await setPriority.find(
      { typeOfPriority: "philid" },
      { marriage: 1 }
    );
    const philmar = [...philm];
    let phima = 0;
    philmar.forEach((phim) => {
      return (phima += phim.marriage);
    });
    //phil death
    const philde = await setPriority.find(
      { typeOfPriority: "philid" },
      { death: 1 }
    );
    const phildeath = [...philde];
    let phid = 0;
    phildeath.forEach((phide) => {
      return (phid += phide.death);
    });
    //@end of phil id
    //@start of emergency urgent birth
    const urgentb = await setPriority.find(
      { typeOfPriority: "urgent" },
      { birth: 1 }
    );
    const urgeb = [...urgentb];
    let urb = 0;
    urgeb.forEach((emerb) => {
      return (urb += emerb.birth);
    });

    //urgent cenomar
    const urgentc = await setPriority.find(
      { typeOfPriority: "urgent" },
      { cenomar: 1 }
    );
    const urgec = [...urgentc];
    let urc = 0;
    philcen.forEach((emerc) => {
      return (urc += emerc.cenomar);
    });

    //urgent marriage
    const urgentm = await setPriority.find(
      { typeOfPriority: "urgent" },
      { marriage: 1 }
    );
    const urgem = [...urgentm];
    let urm = 0;
    philmar.forEach((emerm) => {
      return (urm += emerm.marriage);
    });
    //urgent death
    const urgentd = await setPriority.find(
      { typeOfPriority: "urgent" },
      { death: 1 }
    );
    const urged = [...urgentd];
    let urd = 0;
    urged.forEach((emerd) => {
      return (urd += emerd.death);
    });
    //@end of emergency
    //@start of pwd birth
    const pwdb = await setPriority.find(
      { typeOfPriority: "pwd" },
      { birth: 1 }
    );
    const pwdbirth = [...pwdb];
    let pdb = 0;
    pwdbirth.forEach((pwb) => {
      return (pdb += pwb.birth);
    });

    //pwd cenomar
    const pwdcen = await setPriority.find(
      { typeOfPriority: "pwd" },
      { cenomar: 1 }
    );
    const pwdc = [...pwdcen];
    let pw = 0;
    pwdc.forEach((pwd) => {
      return (pw += pwd.cenomar);
    });

    //pwd marriage
    const pwdmar = await setPriority.find(
      { typeOfPriority: "pwd" },
      { marriage: 1 }
    );
    const pwdma = [...urgentm];
    let pwmar = 0;
    pwdma.forEach((pwdm) => {
      return (pwmar += pwdm.marriage);
    });
    //pwd death
    const pwddeath = await setPriority.find(
      { typeOfPriority: "pwd" },
      { death: 1 }
    );
    const pwdd = [...pwddeath];
    let pwdet = 0;
    pwdd.forEach((pwdeth) => {
      return (pwdet += pwdeth.death);
    });
    //@end of pwd

    const totalBirth = bn + sbn + phib + hb + urb + pdb;
    const totalCenomar = sc + pc + hc + phicn + urc + pw;
    const totalMarriage = sm + pm + hm + phima + urm + pwmar;
    const totalDeath = sd + pd + hd + phid + urd + pwdet;
    const totalDocs = totalBirth + totalCenomar + totalMarriage + totalDeath;
    res.render("pages/report", {
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
      sd,
      sm,
      pm,
      pc,
      pd,
      hb,
      hc,
      hm,
      hd,
      phib,
      phicn,
      phima,
      phid,
      urb,
      urc,
      urm,
      urd,
      pdb,
      pw,
      pwmar,
      pwdet,
      totalBirth,
      totalCenomar,
      totalMarriage,
      totalDeath,
      totalDocs,
      adminName: req.session.user.Name,
    });
  } catch (error) {
    console.log("cannot fetch to download the data", error);
  }
});

module.exports = { priorityToDownload };
