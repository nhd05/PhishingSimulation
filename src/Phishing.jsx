import { useNavigate } from "react-router-dom";
export default function Phishing() {
	const navigate = useNavigate();
	return (
		<div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
			<h1>Email Phishing</h1>

			<p>
				Phishing emails attempt to steal sensitive information by pretending to
				be trusted organizations.
			</p>

			<p>
				Phishing is a type of cyberattack where criminals impersonate trusted
				entities — like banks, tech companies, or even coworkers — to trick
				people into handing over sensitive information such as passwords, credit
				card numbers, or personal details. The name comes from the idea of
				"fishing" for victims, casting a wide net and hoping someone takes the
				bait. These attacks usually arrive via email, but can also come through
				text messages (called "smishing") or phone calls ("vishing"). A classic
				example is an email that looks like it's from your bank, warning you
				that your account has been compromised and urging you to click a link
				immediately — that link leads to a fake website designed to steal your
				login credentials.
			</p>

			<p>
				What makes phishing so effective is that it exploits human psychology
				rather than technical vulnerabilities. Attackers create a sense of
				urgency ("Your account will be closed in 24 hours!"), fear, or authority
				to pressure people into acting without thinking. More targeted versions,
				called spear phishing, are personalized using details gathered from
				social media or data breaches, making them much harder to spot. To
				protect yourself, always verify the sender's actual email address (not
				just the display name), avoid clicking links in unsolicited messages,
				and go directly to a website by typing the URL yourself rather than
				following a link. When in doubt, contact the organization directly
				through official channels — a few extra seconds of caution can save you
				a lot of trouble.
			</p>

			<p>
				One of the simplest and most effective habits you can build is to slow
				down before you click. Phishing attacks are engineered to make you react
				quickly and emotionally, so the moment you feel that sense of urgency —
				"act now or lose access!" — treat it as a red flag. Take a breath and
				examine the message carefully. Check the sender's actual email address
				by hovering over or clicking the name; a message claiming to be from
				PayPal but sent from something like support@paypa1-help.net is a dead
				giveaway. Look for small misspellings in domain names, awkward grammar,
				or generic greetings like "Dear Customer" instead of your actual name.
				Legitimate companies that have your account information will almost
				always address you personally.
			</p>

			<p>
				When it comes to links and attachments, adopt a "when in doubt, don't"
				mentality. Instead of clicking a link in an email, open your browser and
				navigate directly to the website yourself. If an email claims there's a
				problem with your account, log in the way you normally would — not
				through the link provided. For attachments, be especially wary of
				unexpected files, even from people you know, since attackers can spoof
				or compromise email accounts. If a colleague sends you an attachment out
				of the blue, a quick message or call to confirm they actually sent it
				takes seconds and can prevent a serious mistake.
			</p>

			<p>
				On the technical side, a few tools go a long way. Two-factor
				authentication (2FA) is one of the best defenses you can have — even if
				a phisher gets your password, they still can't access your account
				without the second verification step. Use a password manager so every
				account has a unique, strong password; that way, if one set of
				credentials is stolen, the damage is contained. Keep your devices and
				apps updated, since security patches often close vulnerabilities that
				attackers exploit. And consider using a browser or email provider with
				built-in phishing detection, as these can flag suspicious sites and
				messages before you even interact with them. None of these steps require
				being a tech expert — they're small habits that add up to a much
				stronger defense.
			</p>
			<button
				type="button"
				onClick={() => navigate("/quiz")}
				style={{
					marginTop: "30px",
					padding: "10px 20px",
					cursor: "pointer",
				}}
			>
				Take Quiz
			</button>
		</div>
	);
}
