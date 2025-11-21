import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST', 'mail.askfernando.pt')
        self.smtp_port = int(os.environ.get('SMTP_PORT', 465))
        self.smtp_user = os.environ.get('SMTP_USER', 'contactos@askfernando.pt')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.from_email = os.environ.get('SMTP_FROM_EMAIL', 'contactos@askfernando.pt')
        self.to_email = os.environ.get('SMTP_TO_EMAIL', 'fernandomendes@askfernando.pt')

    async def send_contact_email(self, name: str, email: str, phone: str, message: str, language: str):
        """Send contact form email to Fernando"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'New Contact from {name} - AskFernando.pt'
            msg['From'] = self.from_email
            msg['To'] = self.to_email
            msg['Reply-To'] = email

            # Create HTML content
            html_content = f"""
            <html>
              <head>
                <style>
                  body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                  .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                  .header {{ background-color: #1e40af; color: white; padding: 20px; text-align: center; }}
                  .content {{ background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }}
                  .field {{ margin-bottom: 15px; }}
                  .label {{ font-weight: bold; color: #1e40af; }}
                  .value {{ margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #ea580c; }}
                  .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>New Contact Message</h1>
                    <p>AskFernando.pt</p>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Name:</div>
                      <div class="value">{name}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email:</div>
                      <div class="value"><a href="mailto:{email}">{email}</a></div>
                    </div>
                    <div class="field">
                      <div class="label">Phone:</div>
                      <div class="value">{phone if phone else 'Not provided'}</div>
                    </div>
                    <div class="field">
                      <div class="label">Language:</div>
                      <div class="value">{language.upper()}</div>
                    </div>
                    <div class="field">
                      <div class="label">Message:</div>
                      <div class="value">{message}</div>
                    </div>
                  </div>
                  <div class="footer">
                    <p>This email was sent from the contact form at askfernando.pt</p>
                  </div>
                </div>
              </body>
            </html>
            """

            # Create plain text version
            text_content = f"""
            New Contact Message - AskFernando.pt
            
            Name: {name}
            Email: {email}
            Phone: {phone if phone else 'Not provided'}
            Language: {language.upper()}
            
            Message:
            {message}
            
            ---
            This email was sent from the contact form at askfernando.pt
            """

            # Attach both versions
            part1 = MIMEText(text_content, 'plain')
            part2 = MIMEText(html_content, 'html')
            msg.attach(part1)
            msg.attach(part2)

            # Send email using SSL
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_user,
                password=self.smtp_password,
                use_tls=True,
                start_tls=False
            )

            logger.info(f"Contact email sent successfully to {self.to_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            raise Exception(f"Email sending failed: {str(e)}")

email_service = EmailService()
