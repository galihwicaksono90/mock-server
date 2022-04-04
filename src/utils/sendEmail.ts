import nodemailer from "nodemailer";

export async function sendEmail(to: string, text: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "mtbyos5gemwrqwc2@ethereal.email",
      pass: "ydC4S38hzZMpNTQ6ck",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo" <foo@example.com',
    to,
    subject: "HEllo",
    text,
  });

  console.log("Message sent: $s", info.messageId);
  console.log("Preview url: $s", nodemailer.getTestMessageUrl(info));
}
