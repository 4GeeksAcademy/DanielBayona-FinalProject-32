import React, { Component } from "react";
import envFile from "../../../../docs/assets/env-file.png"


const Dark = ({ children }) => <span className="bg-dark text-white px-1 rounded">{children}</span>;
export const BackendURL = () => (
	<div className="mt-5 pt-5 w-50 mx-auto">
		<h2> WELCOME! </h2>
		<p>Welcome to Taskyist
			Efficient Task and Employee Management
			Our Goal At Taskyst,
			we offer you a comprehensive platform designed
			to record and manage the activities
			of your company and your employees.
		</p>
	</div>
);
