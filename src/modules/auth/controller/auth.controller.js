import userModel from "../../../../DB/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../../services/email.js";

const signup = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const user = await userModel.findOne({email}).select("email");
        // res.json({message:"data",user});
        if(user){
            res.status(409).json({message:"email is exist"});
        }
        else{
            const hash = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
            //or
            //const hash = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
            const saveUser=await userModel.create({userName:name,email,password:hash});
            if(!saveUser){
                res.status(400).json({message:"fail regester user"});
            }else{
                let token=jwt.sign({id:saveUser._id},process.env.TOKENCONFERMEMAIL,{expiresIn:'1h'});
                let message = `
<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">

  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  img {
    -ms-interpolation-mode: bicubic;
  }
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>

      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end copy -->
          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="${req.protocol}://${req.headers.host}${process.env.baseUrl}/auth/confermEmail/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Click to confirm email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="https://blogdesire.com" target="_blank">https://blogdesire.com/xxx-xxx-xxxx</a></p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br> Paste</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

        </table>
      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>
</html>
                `;
                await sendEmail(email,"confirm email",message);
                res.status(201).json({message:"success"});
            }
        }
    }catch(err){
        console.log(err);
    }
    { // how it work and note:
        // step of signup function :
        /*
        1 - declaration the data(email,name,password ....) from req.body
        2- check if the email exist in DB
        3- if exist > return response exist email
        if not exist > continuos to store the data
        4- if not exist email >> hash password by bcrypt 
        5- save the usermodule in DB and check if saved or not
        6- after save > the default confirmEmail is false
        7- set the then i will creat token and send it in the link >> this token contain id user
        8- in the link will take you to confirmEmail function > then tack token and check the id and set confirmEmail "true"        
        */
       /* note :: other way to confirm signup
       - when the user is input the data >> send to email code and store this code in the DB
       then compare the code that the use is input with the code in the DB
       but thear is a problem :: how can i know the id of the user(who user ?)
       */
    }
}
const confermEmail = async (req,res)=>{
    try{
        const {token}=req.params;
        const decode = jwt.verify(token,process.env.TOKENCONFERMEMAIL);
        if(decode){
            let user = await userModel.findByIdAndUpdate(
                {_id:decode.id,confirmEmail:false},
                {confirmEmail:true}
                );
                res.json({message:"success",user});
            }
            else{
                res.json({message:"invalid token"});
                // res.redirect("http://localhost:3000/api/v1/auth/fun2");
            }
    }catch(err){
        console.log(err);
    }
    {//how this function work
    /*
        - take the token from the link and check if the token is true or false
        - if token true >> find the id of the user and check if the confirmEmail false then set it true    
    */
    }        
}
const signin = async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        res.json({message:"error :email not exist"});
    }
    else{
        if(user.confirmEmail){
            const match = await bcrypt.compare(password,user.password);
            if(match){
                const token = jwt.sign({id:user._id},process.env.TOKENLOGIN,{expiresIn:60*60*24});
                res.json({message:"success",token});
            }else{
                res.json({message:"password not true"});
            }
        }
        else{
            res.json({message:"you must confirm email"});
        }
    }
  }catch(err){
    res.json({message:"error singin",err});
  }
}
const fun1 = async(req,res)=>{
    //you can redirect the req to another function
    //you must take the front and 
    res.redirect("http://localhost:3000/api/v1/auth/fun2");
}
const fun2 = async(req,res)=>{
    const {data} = req.body;
    console.log(data);
}
export{
    signup,confermEmail,signin ,fun1,fun2
}