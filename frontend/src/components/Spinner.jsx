import React from "react"
import ReactLoading from "react-loading"

export function Spinner() {
	return (
		<div className="loader">
			<ReactLoading type="spokes" color="#eee" height="20%" width="30%" />
		</div>
	)
}
