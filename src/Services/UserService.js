import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
const Sequelize = require("sequelize");
const op = Sequelize.Op;
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let uploadCloud = (image, fName) => {
  return new Promise(async (resolve, reject) => {
    try {
      await cloudinary.uploader.upload(
        image,
        {
          resource_type: "raw",
          public_id: `image/GhGym/${fName}`,
        },
        // Send cloudinary response or catch error
        (err, result) => {
          if (err) console.log(err);
          if (result) {
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Accounts.findOne({
        where: { email: email },
      });
      if (user) resolve(true);
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.Accounts.findOne({
          where: {
            email: email,
            // , roleId: [1]
          },
          include: [{ model: db.Manager, as: "AccountManager" }],
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "fullName",
            "avatar",
            "ExternalId",
          ],
          raw: true,
        });
        if (user) {
          // compare pass //
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errorCode = 0;
            userData.errMessage = `Ok`;

            delete user.password; // ko lay password cua user //

            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.errMessage = `Wrong pass`;
          }
        } else {
          userData.errorCode = 2;
          userData.errMessage = `User isn't exist`;
        }
      } else {
        userData.errorCode = 1;
        userData.errMessage = `Your's email isn't exist in our system`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLoginForStaff = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.Accounts.findOne({
          where: {
            email: email,
            // , roleId: [1]
          },
          include: [{ model: db.Staffs, as: "AccountStaff" }],
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "fullName",
            "avatar",
          ],
          raw: true,
        });
        if (user) {
          // compare pass //
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errorCode = 0;
            userData.errMessage = `Ok`;

            delete user.password; // ko lay password cua user //
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.errMessage = `Wrong pass`;
          }
        } else {
          userData.errorCode = 2;
          userData.errMessage = `User isn't exist`;
        }
      } else {
        userData.errorCode = 1;
        userData.errMessage = `Your's email isn't exist in our system`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLoginForCustomer = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.Accounts.findOne({
          where: {
            email: email,
            // , roleId: [1]
          },
          include: [{ model: db.Customer, as: "AccountCustomer" }],
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "fullName",
            "avatar",
          ],
          raw: true,
        });
        if (user) {
          // compare pass //
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errorCode = 0;
            userData.errMessage = `Ok`;

            delete user.password; // ko lay password cua user //
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.errMessage = `Wrong pass`;
          }
        } else {
          userData.errorCode = 2;
          userData.errMessage = `User isn't exist`;
        }
      } else {
        userData.errorCode = 1;
        userData.errMessage = `Your's email isn't exist in our system`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllAccount = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      const nameInput = req.query.fullName;
      let accounts = await db.Accounts.findAndCountAll({
        where: {
          [Op.and]: [
            nameInput && {
              fullName: { [op.iLike]: `%${nameInput}%` },
            },
          ],
        },
        attributes: {
          exclude: ["password"],
        },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(accounts);
    } catch (e) {
      reject(e);
    }
  });
};
let getAccountByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Accounts.findAll({
        where: { email: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(account);
    } catch (e) {
      reject(e);
    }
  });
};
let deleteAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("check data delete: ", data);
    let user = await db.Accounts.findOne({
      where: { ExternalId: data.ExternalId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "Account not found",
      });
    }

    // if (user.avatar && user.public_id_image) {
    //     // Xóa hình cũ //
    //     await cloudinary.uploader.destroy(user.public_id_image, { invalidate: true, resource_type: "raw" },
    //         function (err, result) { console.log(result) });
    // }

    await db.Accounts.destroy({
      where: { ExternalId: data.ExternalId },
    });
    if (data.roleId === 1 || data.roleId === 2) {
      console.log("data roleId ", data.roleId);
      await db.Manager.destroy({
        where: { ExternalId: data.ExternalId },
      });
    }
    if (data.roleId === "3" || data.roleId === "4") {
      await db.Staffs.destroy({
        where: { ExternalId: data.ExternalId },
      });
    }
    if (data.roleId === "5") {
      await db.Customer.destroy({
        where: { ExternalId: data.ExternalId },
      });
    }
    resolve({
      errCode: 0,
      errMessage: "Delete account is success",
    });
  });
};
let handleUserLoginSocial = async (email, id, name, avatar) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Users.findOrCreate({
        where: { email: email, userName: name },
        defaults: {
          userName: name,
          avatar: avatar,
          roleId: 1,
          password: "",
          fullName: name,
          isActive: true,
          gender: 1,
        },
      });

      resolve({
        errCode: 0,
        errMessage: "Login OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email //
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Email da ton tai",
        });
      } else {
        let hashPass = await hashUserPassword(data.password);
        let result = {};
        let avatar = "";
        if (data.avatar && data.fileName) {
          // upload cloud //
          result = await uploadCloud(data.avatar, data.fileName);
        } else {
          avatar = "";
        }

        await db.Accounts.create({
          id: data.id,
          email: data.email,
          password: hashPass,
          fullName: data.fullName,
          avatar: result && result.secure_url ? result.secure_url : avatar,
          isActive: true,
          userName: data.userName,
          roleId: data.roleId,
          ExternalId: data.ExternalId,
        });
        if (data.roleId === "1" || data.roleId === "2") {
          await db.Manager.create({
            id: data.id,
            ManagerName: data.fullName,
            // password: hashPass,
            ManagerEmail: data.email,

            ManagerPhone: data.phoneNumber,
            Gender: data.gender,
            // DayOfBirth: data.dayOfBirth,
            ManagerAddress: data.address,
            RoleId: data.roleId,
            ManagerImage:
              result && result.secure_url ? result.secure_url : avatar,
            public_id_image: data.fileName,
            CenterId: data.centerId,
            SalaryId: data.salaryId,
            ExternalId: data.ExternalId,
            // isActive: true,
            // userName: data.userName,
          });
        } else if (data.roleId === "3" || data.roleId === "4") {
          await db.Staffs.create({
            StaffName: data.fullName,
            password: hashPass,
            StaffImage:
              result && result.secure_url ? result.secure_url : avatar,
            public_id_image: data.fileName,
            StaffPhoneNumber: data.phoneNumber,
            Gender: data.gender,
            DayOfBirth: data.dob,
            Address: data.address,
            RoleId: data.roleId,
            StaffEmail: data.email,
            CenterId: data.centerId,
            SalaryId: data.salaryId,
            ExternalId: data.ExternalId,
            // isActive: true,
            // userName: data.userName,
          });
        } else if (data.roleId === "5") {
          await db.Customer.create({
            CustomerName: data.fullName,
            Gender: data.gender,
            DayOfBirth: data.dayOfBirth,
            PhoneNumber: data.phoneNumber,
            Address: data.address,
            RoleId: data.roleId,
            // password: hashPass,
            CustomerImage:
              result && result.secure_url ? result.secure_url : avatar,
            public_id_image: data.fileName,
            CustomerEmail: data.email,
            CenterId: data.centerId,
            ExternalId: data.ExternalId,
            // SalaryId: data.salaryId,
            // isActive: true,
            // userName: data.userName,
          });
        }

        resolve({
          errCode: 0,
          errMessage: "create user is success",
        }); // return
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.ExternalId) {
        resolve({
          errorCode: 2,
          errMessage: "Missing external id",
        });
      }
      let account = await db.Accounts.findOne({
        where: { ExternalId: data.ExternalId },
        raw: false,
      });
      let result = {};
      let avatar = "";
      if (data.avatar && data.fileName) {
        // upload cloud //
        result = await uploadCloud(data.avatar, data.fileName);
      } else {
        avatar = "";
      }
      if (account) {
        account.email = data.email;
        account.fullName = data.fullName;
        account.userName = data.userName;
        account.roleId = data.roleId;

        account.avatar =
          result && result.secure_url ? result.secure_url : avatar;

        await account.save();

        if (data.roleId === "1" || data.roleId === "2") {
          let manager = await db.Manager.findOne({
            where: { ExternalId: data.ExternalId },
            raw: false,
          });
          console.log("manager: ", manager);

          if (manager) {
            manager.ManagerName = data.fullName;
            manager.ManagerEmail = data.email;
            manager.ManagerPhone = data.phoneNumber;
            manager.Gender = data.Gender;
            manager.ManagerAddress = data.address;
            manager.RoleId = data.roleId;
            manager.ManagerImage =
              result && result.secure_url ? result.secure_url : avatar;
            manager.public_id_image = data.fileName;
            manager.CenterId = data.centerId;
            manager.SalaryId = data.salaryId;

            await manager.save();
          }
        }
        if (data.roleId === "3" || data.roleId === "4") {
          console.log("check update staff");
          let staff = await db.Staffs.findOne({
            where: { ExternalId: data.ExternalId },
            raw: false,
          });
          // console.log("staff: ", manager);

          if (staff) {
            staff.StaffName = data.fullName;
            staff.StaffEmail = data.email;
            staff.StaffImage =
              result && result.secure_url ? result.secure_url : avatar;
            staff.public_id_image = data.fileName;
            staff.ManagerPhone = data.phoneNumber;
            staff.Gender = data.Gender;
            staff.ManagerAddress = data.address;
            staff.RoleId = data.roleId;
            staff.DayOfBirth = data.dob;
            staff.CenterId = data.centerId;
            staff.SalaryId = data.salaryId;

            await staff.save();
          }
        }
        if (data.roleId === "5") {
          console.log("check update staff");
          let customer = await db.Customer.findOne({
            where: { ExternalId: data.ExternalId },
            raw: false,
          });

          if (customer) {
            customer.CustomerName = data.fullName;
            customer.CustomerEmail = data.email;
            customer.CustomerImage =
              result && result.secure_url ? result.secure_url : avatar;
            customer.public_id_image = data.fileName;
            customer.PhoneNumber = data.phoneNumber;
            customer.Gender = data.Gender;
            customer.Address = data.address;
            customer.RoleId = data.roleId;
            customer.DayOfBirth = data.dob;
            customer.CenterId = data.centerId;
            // customer.SalaryId = data.salaryId;

            await customer.save();
          }
        }
        resolve({
          errorCode: 0,
          message: "Update user is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "account not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let signUpNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email //
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Email da ton tai",
        });
      } else {
        let hashPass = await hashUserPassword(data.password);

        let avatar =
          "https://res.cloudinary.com/cdmedia/image/upload/v1646921892/image/avatar/Unknown_b4jgka.png";

        await db.Users.create({
          email: data.email,
          password: hashPass,
          fullName: data.fullName,
          isActive: true,
          gender: data.gender,
          birthday: data.birthday,
          userName: data.userName,
          roleId: 1,
          avatar: avatar,
          public_id_image: "",
        }).then(function (x) {
          if (x.id) {
            // 'email', 'roleId', 'password', 'fullName', 'avatar'],
            let user = [
              {
                id: x.id,
                email: data.email,
                roleId: data.roleId,
                password: data.password,
                fullName: data.fullName,
                avatar: avatar,
              },
            ];
            resolve({
              errCode: 0,
              errMessage: "OK",
              user: user,
            });
          }
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email //
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      } else {
        let user = await db.Users.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          let result = {};

          // Có truyền image //
          if (data.avatar && data.fileName) {
            if (user.avatar && user.public_id_image) {
              // có lưu trong db //
              // Xóa hình cũ //
              await cloudinary.uploader.destroy(
                user.public_id_image,
                { invalidate: true, resource_type: "raw" },
                function (err, result) {
                  console.log(result);
                }
              );
            }
            // upload cloud //
            result = await uploadCloud(data.avatar, data.fileName);
          }

          user.fullName = data.fullName;
          user.birthday = data.birthday;
          user.gender = data.gender.value;
          user.roleId = data.roles.value;

          if (data.avatar && data.fileName) {
            user.avatar = result.secure_url;
            user.public_id_image = result.public_id;
          }

          await user.save();

          resolve({
            errCode: 0,
            message: "Update user thanh cong",
          });
        } else {
          resolve({
            errorCode: 1,
            errMessage: "User ko tim thay",
          });
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
        }); // return
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataRoles = await db.Roles.findAll();

      if (dataRoles) {
        resolve({
          errCode: 0,
          dataRoles: dataRoles,
        });
      } else {
        resolve({
          errCode: 1,
          dataRoles: [],
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Users.findAll({
        attributes: {
          exclude: ["password"],
        },
        include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getEditUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Users.findOne({
        where: { id: id },
        attributes: {
          exclude: ["password"],
        },
        include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.Users.findOne({
      where: { id: id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "User ko ton tai",
      });
    }

    if (user.avatar && user.public_id_image) {
      // Xóa hình cũ //
      await cloudinary.uploader.destroy(
        user.public_id_image,
        { invalidate: true, resource_type: "raw" },
        function (err, result) {
          console.log(result);
        }
      );
    }

    await db.Users.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete user ok",
    });
  });
};

module.exports = {
  getAllRoles,
  handleUserLoginForStaff,
  handleUserLoginForCustomer,
  getAccountByName,
  deleteAccount,
  createNewUser,
  getAllAccount,
  updateAccount,
  // getAllUser,
  // getEditUser,
  // updateUser,
  // deleteUser,
  handleUserLogin,
  // signUpNewUser,
  handleUserLoginSocial,
};
