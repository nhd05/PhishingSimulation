import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div style={{ textAlign: "center", paddingTop: "50px" }}>
			<h1>Welcome</h1>

			<Link to="/training">
				<button
					type="button"
					style={{ padding: "10px 15px", marginTop: "20px" }}
				>
					Go to Training
				</button>
			</Link>
		</div>
	);
}
