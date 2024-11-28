import nodemailer from "nodemailer";

// Configurar el transporte de nodemailer usando Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // Usamos el servicio Gmail
  auth: {
    user: "notificationsvetcare@gmail.com", // correo de vetcare
    pass: "lwja ntkd ywaf kzhm", //contraseña de aplicación configurada previamente
  },
});

export const sendNotification = async (req, res) => {
  const { to, fullname, message } = req.body;

  try {
    // Validar campos
    if (!to || !fullname || !message) {
      return res
        .status(400)
        .json({ message: "Faltan datos para enviar el correo" });
    }

    // Opciones del correo
    const mailOptions = {
      from: `notificationsvetcare@gmail.com`, // El remitente
      to, // Destinatario
      subject: `Notificación de ${fullname}`, // Asunto
      //plantilla de el mensaje que se envia
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
    <h2 style="color: #3bbba4; text-align: center;">Notificación de Vetcare</h2>
    <p style="color: #333;">Esta es una notificación de <strong>${fullname}</strong>:</p>
    <div style="border: 1px solid #3bbba4; padding: 15px; background-color: #f9f9f9; border-radius: 5px; margin: 10px 0;">
      <p style="color: #333;">${message}</p>
    </div>
    <p style="color: #333;">Gracias por confiar en nosotros.</p>
    <p style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
      <strong>VetCare</strong> | Cuidamos lo que amas
    </p>
  </div>
`,
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Correo enviado exitosamente",
      info,
    });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo", error });
  }
};
