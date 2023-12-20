import chaosLogo from '/src/assets/images/chaosgroup-logo.svg';

function Logo() {
	return (
		<div className="logo-container">
			<a href="/">
				<img src={chaosLogo} alt="ChaosGroup Logo" />
			</a>
		</div>
	);
}
export default Logo;

