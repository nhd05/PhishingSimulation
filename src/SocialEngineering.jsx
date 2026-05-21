import { useNavigate } from "react-router-dom";
export default function SocialEngineering() {
	const navigate = useNavigate();
	return (
		<div style={{ padding: "20px" }}>
			<h1>Password Security</h1>

			<p>
				Strong passwords should contain uppercase, lowercase, numbers, and
				symbols.
			</p>

			<p>
				Social engineering is the broader umbrella that phishing falls under. At
				its core, it's the art of manipulating people into giving up
				confidential information or taking actions they normally wouldn't — by
				exploiting trust, emotion, and human nature rather than hacking software
				or systems. Attackers essentially "hack the person" instead of the
				computer. Beyond phishing, social engineering shows up in many forms:
				pretexting, where someone invents a fake scenario to extract information
				(like calling an employee pretending to be IT support); baiting, where
				they lure victims with something enticing like a free USB drive that
				contains malware; and tailgating, where someone physically follows an
				authorized person into a restricted area. The common thread is deception
				— making you believe the situation is legitimate so you lower your
				guard.
			</p>

			<p>
				What makes social engineering particularly dangerous is that it can
				bypass even the most sophisticated security systems. A company can have
				the best firewalls and encryption in the world, but if an employee is
				tricked into handing over their login credentials over the phone, none
				of that matters. Attackers do their homework too — they'll research a
				target on LinkedIn, social media, or through previous data breaches to
				craft a believable story. A call from someone who knows your boss's
				name, your company's internal project names, and your job title feels a
				lot more convincing than a generic scam.
			</p>

			<p>
				To protect yourself, the most important mindset shift is to verify
				before you trust. If someone contacts you requesting sensitive
				information or access — even if they claim to be from your IT
				department, your bank, or a government agency — don't just take their
				word for it. Hang up and call back using an official number you look up
				yourself. Organizations that legitimately need something from you will
				never have a problem with you verifying their identity first. Be equally
				skeptical of unsolicited "gifts" like USB drives or QR codes in public
				places, as these are common baiting tactics.
			</p>

			<p>
				On a practical level, be very mindful of what you share publicly online.
				Social media profiles are a goldmine for attackers building a fake
				persona to manipulate you with. Limit personal details like your
				workplace, daily routine, and relationships on public accounts. In
				professional settings, follow a "need to know" principle — don't share
				sensitive information unless you're certain of who's asking and why.
				Many companies also run security awareness training and simulated social
				engineering tests, which are genuinely useful because experiencing a
				fake attack in a safe environment is one of the best ways to recognize a
				real one later. Ultimately, a healthy dose of skepticism — not paranoia,
				just thoughtful caution — is your strongest tool against social
				engineering of any kind.
			</p>
			<button
				type="button"
				onClick={() => navigate("/quiz?module=socialengineering")}
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
