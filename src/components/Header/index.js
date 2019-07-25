import React from "react";
import "./Header.css";

class Header extends React.Component {
	render() {
		return (
			<nav classname="Nav">
				<div classname="Nav-menus">
					<div classname="Nav-brand">
						<a classname="Nav-brand-logo" href="/">
							Instagram
						</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;