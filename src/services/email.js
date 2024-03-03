//link of send mailer code
//https://nodemailer.com

import nodemailer  from 'nodemailer';
const sendEmail = async(dest,subject,message)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail', // type of the email you will use to send
        auth:{
            user:process.env.SENDEREMAIL,
            pass:process.env.SENDERPASSWORD
        },
    });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from:` 'I'm Yazan👻' ${process.env.SENDEREMAIL}`, // sender address
    to:dest, // list of receivers 
    subject:subject, // Subject line
    text: "yazan message", // plain text body
    html:message, // html body
  });
//   console.log("Message sent:", info);
}
  
export default sendEmail;