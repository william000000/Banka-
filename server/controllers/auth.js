// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();
// const verifyMe = (req, res, next) => {
//   const head = req.headers.token;
//   jwt.verify(head, process.env.secretKey, (error, reverse) => {
//     if (error) {
//       return res.status(401).json({
//         status: 401,
//         message: 'login or create user account',
//       });
//     } else {
//       req.user = reverse;
//       next();
//     }
//   });
// };

// export default verifyMe;