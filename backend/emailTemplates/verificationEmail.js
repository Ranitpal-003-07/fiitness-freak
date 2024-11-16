const verificationEmail = (name, token) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
        }
        p {
          font-size: 16px;
          line-height: 1.5;
          color: #555555;
        }
        a {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007BFF;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin-top: 20px;
        }
        a:hover {
          background-color: #0056b3;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          text-align: center;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Hello ${name},</h1>
        <p>Thank you for registering on our platform. To complete your registration and verify your email address, please click the button below:</p>
        <a href="${process.env.CLIENT_URL}/verify-email/${encodeURIComponent(token)}">Verify Your Email</a>

        <p>If you did not register for an account, please ignore this email or contact support if you have any concerns.</p>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Aimfit Gym. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

module.exports = verificationEmail;
