"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

/*GET*/
router.get("/", (req, res) => {
  res.render("order"); //recordar que este index refiere a index.hbs 
});

const validationRules = [
  body("name", "Please, enter your name").exists().isLength({ min: 2 }),
   body("email", "You have entered an invalid e-mail address. Please try again").exists().isEmail(),
  body("message", "Message must contain between 10 and 300 characters")
    .exists()
    .trim()
    .isLength({ min: 10, max: 300 }),
];
/*POST*/
/*Las validaciones se aplican a través de un middleware que provee express-validator*/
router.post( "/",

  validationRules,

  /*terminado el middleware, comienza el callback con los params req y res */
  async (req, res) => {
    /* Encontramos los errores de validación en la request y los envolvemos en un objeto con
    funciones muy útiles que también provee express-validator*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       const formData = req.body;
      // console.log(formData); 
      const arrWarnings = errors.array(); //arr donde viene solamente los mensajes de error), info de estos msjes
      res.render("order", { formData, arrWarnings }); //quiero que formdata y arrwarnings se vea en "order" render en order

      //aquí sigue el código de nuestro controlador POST
    } else {
      const emailMsg = {
        to: "atencioncliente@empresa.com",
        from: req.body.email,
        subject: "Message from contact form",
        html: `${req.body.name} just sent the following message: ${req.body.message}`,
      };
                        
      
       const transport = nodemailer.createTransport({
         host: process.env.HOST,
        port: process.env.PORT,
         auth: {
           user: process.env.USER,
           pass: process.env.PASS,
         },
       });
    
      const sendMailStatus = await transport.sendMail(emailMsg);
      let sendMessage = "";
      if (sendMailStatus.rejected.length) {
        sendMessage = "The message could not be sent. Please, try again";
      } else {
        sendMessage = "Message sent";
      }
      res.render("order", { sendMessage });
    }
  }
);
module.exports = router;