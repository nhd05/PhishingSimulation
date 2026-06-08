TEMPLATES = {
    "prize": {
        "legit": {
            "subject": "You have a reward waiting — check the app",
            "body": """
            <p>Hi there,</p>
            <p>Great news! You've earned a reward through our loyalty program.</p>
            <p>To see what you've won, <strong>log in to your account directly</strong> 
            at <a href="#">www.ourapp.com</a> and visit the Rewards section.</p>
            <p>We will never ask you to click a link in an email to claim prizes.</p>
            <p>— The Rewards Team</p>
            """
        },
        "phishing": {
            "subject": "🎉 WINNER! Claim your $500 gift card NOW — expires in 2 hrs",
            "body": """
            <p>Congratulations, you have been <strong>randomly selected</strong> as today's winner!</p>
            <p>You have won a <strong>$500 Amazon Gift Card</strong>. 
            You must claim it within 2 hours or it will be reassigned.</p>
            <p><a href="#">👉 CLICK HERE TO CLAIM YOUR PRIZE 👈</a></p>
            <p>Please provide your billing details to cover the $1.99 shipping fee.</p>
            <p>— Customer Rewards Dept</p>
            """
        }
    },
    "urgency": {
        "legit": {
            "subject": "We noticed a new sign-in to your account",
            "body": """
            <p>Hi,</p>
            <p>We noticed a sign-in to your account from a new device. 
            If this was you, no action is needed.</p>
            <p>If this wasn't you, visit <strong>account settings</strong> by typing 
            <strong>www.ourapp.com</strong> directly into your browser 
            and change your password there.</p>
            <p>We will never ask you to click a link to secure your account.</p>
            <p>— Security Team</p>
            """
        },
        "phishing": {
            "subject": "⚠️ URGENT: Your account has been compromised — act within 24hrs",
            "body": """
            <p>Dear Customer,</p>
            <p>Your account has been <span style="color:red"><strong>suspended</strong></span> 
            due to suspicious activity.</p>
            <p>You must verify your identity immediately or your account will be 
            <strong>permanently deleted</strong>.</p>
            <p><a href="#">🔒 Click here to restore access now →</a></p>
            <p>— Account Security Department</p>
            """
        }
    },
    "it": {
        "legit": {
            "subject": "Reminder: Update your password in the employee portal",
            "body": """
            <p>Hi,</p>
            <p>This is a reminder that your password is due for its 90-day update.</p>
            <p>Please log in directly at <strong>portal.company.com</strong> 
            by typing it into your browser — do not use links from emails.</p>
            <p>The IT team will never ask for your current password.</p>
            <p>— IT Help Desk</p>
            """
        },
        "phishing": {
            "subject": "IT ALERT: Your password expires in 1 hour — reset immediately",
            "body": """
            <p>Dear Employee,</p>
            <p>Your network password will expire in <strong>1 hour</strong>. 
            Failure to reset it will lock you out of all company systems.</p>
            <p><a href="#">Click here to reset your password now →</a></p>
            <p>Enter your current password to verify your identity before resetting.</p>
            <p>— IT Support Team</p>
            """
        }
    },
    "bank": {
        "legit": {
            "subject": "Transaction alert: $2,847.00 charge on your account",
            "body": """
            <p>Hi,</p>
            <p>A transaction of <strong>$2,847.00</strong> was processed on your account.</p>
            <p>If you don't recognize this, please call the number 
            <strong>on the back of your card</strong> or log in directly at 
            <strong>www.yourbank.com</strong> to dispute it.</p>
            <p>We will never ask you to verify transactions by clicking an email link.</p>
            <p>— Your Bank</p>
            """
        },
        "phishing": {
            "subject": "🚨 FRAUD ALERT: Unauthorized $2,847.00 transaction — verify NOW",
            "body": """
            <p>Dear Valued Customer,</p>
            <p>A suspicious transaction of <strong>$2,847.00</strong> has been flagged 
            on your account from an unrecognized device in another country.</p>
            <p>You have <strong>12 hours</strong> to verify or your account will be frozen.</p>
            <p><a href="#">🔐 Verify my identity and stop this transaction →</a></p>
            <p>— Fraud Prevention Team</p>
            """
        }
    }
}