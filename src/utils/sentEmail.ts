import nodemailer from 'nodemailer';
export const sentEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.email.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'jishan1873@gmail.com',
      pass: 'dyxs scyj dbnx ijlj',
    },
  });
  await transporter.sendMail({
    from: 'jishan1873@gmail.com', // sender address
    to, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
};
