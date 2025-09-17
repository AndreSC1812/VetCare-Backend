import nodemailer from "nodemailer";

// Configure nodemailer transport using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail service
  auth: {
    user: "notificationsvetcare@gmail.com", // VetCare email
    pass: "lwja ntkd ywaf kzhm", // previously configured app password
  },
});

export const sendNotification = async (req, res) => {
  const { to, fullname, message } = req.body;

  try {
    // Validate fields
    if (!to || !fullname || !message) {
      return res
        .status(400)
        .json({ message: "Missing data to send the email" });
    }

    // Email options
    const mailOptions = {
      from: `notificationsvetcare@gmail.com`, // Sender
      to, // Recipient
      subject: `Notification from ${fullname}`, // Subject
      // Email HTML template
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
    <h2 style="color: #3bbba4; text-align: center;">VetCare Notification</h2>
    <p style="color: #333;">This is a notification from <strong>${fullname}</strong>:</p>
    <div style="border: 1px solid #3bbba4; padding: 15px; background-color: #f9f9f9; border-radius: 5px; margin: 10px 0;">
      <p style="color: #333;">${message}</p>
    </div>
    <p style="color: #333;">Thank you for trusting us.</p>
    <p style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
      <strong>VetCare</strong> | We care for what you love
    </p>
  </div>
`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Email sent successfully",
      info,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
};
