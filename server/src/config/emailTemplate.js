const ROLE_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .role-badge { background: #667eea; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Role Request Received!</h1>
        </div>
        <div class="content">
            <h2>Hello {{name}},</h2>
            <p>Thank you for your interest in taking on a more active role!</p>
            <p>You have requested the following role:</p>
            <div class="role-badge">{{requestedRole}}</div>
            <p>Your request is currently under review. We'll notify you once processed.</p>
            <p>Email: <strong>{{email}}</strong></p>
            <p>Best regards,<br>The Admin Team</p>
        </div>
    </div>
</body>
</html>
`;



const ROLE_APPROVED_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .success-badge { background: #38ef7d; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Role Request Approved!</h1>
        </div>
        <div class="content">
            <h2>Congratulations {{name}}!</h2>
            <p>Your role request has been approved!</p>
            <p>Your new role:</p>
            <div class="success-badge">{{role}}</div>
            <p>Log in to explore your new capabilities!</p>
            <p>Email: <strong>{{email}}</strong></p>
            <p>Best regards,<br>The Admin Team</p>
        </div>
    </div>
</body>
</html>
`;

const ROLE_REJECTED_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Role Request Update</h1>
        </div>
        <div class="content">
            <h2>Hello {{name}},</h2>
            <p>Thank you for your interest in the <strong>{{requestedRole}}</strong> role.</p>
            <p>We're unable to approve your role request at this time.</p>
            <p>You can continue using the platform with your current role.</p>
            <p>Email: <strong>{{email}}</strong></p>
            <p>Best regards,<br>The Admin Team</p>
        </div>
    </div>
</body>
</html>
`;


// for registration in event

export const REGISTRATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Event Registration Confirmation - Campus Sync</title>
  </head>
  <body style="font-family: 'Poppins', Arial, sans-serif; background-color: #f9fafb; padding: 0; margin: 0;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
      <tr>
        <td style="background: linear-gradient(90deg, #4f46e5, #3b82f6); color: #ffffff; text-align: center; padding: 20px 10px;">
          <h2 style="margin: 0; font-size: 22px;">Campus Sync</h2>
          <p style="margin: 5px 0 0; font-size: 14px;">Smart Event Management Platform</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 25px 20px; color: #111827;">
          <h3 style="margin-top: 0;">Hello, {{userName}} 👋</h3>
          <p style="font-size: 15px; line-height: 1.6;">
            You have successfully registered for the event <strong>{{eventTitle}}</strong>! 🎉
          </p>
          <table cellspacing="0" cellpadding="0" style="width: 100%; margin: 15px 0; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>📍 Venue:</strong> {{eventVenue}}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;"><strong>🗓️ Start Date:</strong> {{eventStartDate}}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;"><strong>🏁 End Date:</strong> {{eventEndDate}}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0;"><strong>🆔 Registration ID:</strong> {{registrationId}}</td>
            </tr>
          </table>
          <p style="font-size: 15px; line-height: 1.6;">
            Please keep this QR code handy for event check-in and attendance verification:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <img src="{{qrCode}}" alt="QR Code" style="width: 150px; height: 150px; border: 2px solid #e5e7eb; border-radius: 10px;" />
          </div>
          <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
            Thank you for choosing <strong>Campus Sync</strong> to manage your events.  
            We wish you a great experience! 🚀
          </p>
        </td>
      </tr>
      <tr>
        <td style="background: #f3f4f6; text-align: center; padding: 12px;">
          <p style="margin: 0; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} Campus Sync | All Rights Reserved
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

