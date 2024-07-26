import {Lead} from "../../../types/Lead.ts";
import {useState} from "react";
import CloseIcon from "../../atoms/CloseSvg.tsx";
import {validateLeadsFields} from "./validateLeadAndTemplate.ts";
import {Button} from "../../atoms/Button.tsx";

export default function MessageGenerationModal({
	isActive,
	leads,
	onClose,
}: {
	isActive: boolean;
	leads: Lead[];
	onClose: () => void;
}) {
	const [messageTemplate, setMessageTemplate] = useState(`Hi {firstName}, I'm doing a survey. 
Who would you rate working in {companyName} as {gender} on a scale of 1-10?
`);

	const validation = validateLeadsFields(leads, messageTemplate);

	return (
		<>
			{isActive && (
				<div className="fixed top-0 left-0 w-full h-dvh flex justify-center items-center z-30 bg-glass">
					<div className="max-w-2xl m-auto bg-white w-full min-h-96 max-h-dvh border-2 border-gray-500 rounded-2xl shadow-xl overflow-scroll">
						<div className="flex justify-between p-2">
							<div className="font-bold text-2xl">
								Custom message generation
							</div>
							<div
								className={"cursor-pointer"}
								onClick={onClose}
							>
								<CloseIcon />
							</div>
						</div>
						<div className="px-2 mt-2 text-xl">
							Message template
						</div>
						<div className="p-2">
							<textarea
								value={messageTemplate}
								onChange={(e) => setMessageTemplate(e.target.value)}
								className="border border-gray-400 rounded-lg p-2 w-full"
							>
							</textarea>
							<div className="mt-2">
								{validation.areAllValid ? (
									<div className="text-blue-600">
										All leads message will be generated correctly
									</div>
								) : (
									<div>
										<div className="underline my-4 text-red-800">
											Some leads doesn't have the correct data. So, their message will be empty
										</div>
										<ol className="list-decimal pl-8">
											{validation.leads.filter(l => !l.isValid).map((lead) => (
												<li key={lead.leadId}>
													{lead.firstName} {lead.lastName} has the following invalid fields: {" "}
													<pre>
														{lead.invalidFields.join(', ')}
													</pre>
												</li>
											))}
										</ol>
									</div>
								)}
								<div className="mt-6">
									<Button
										disabled={!messageTemplate}
										onClick={() => console.log("generate")}
									>
										{validation.areAllValid ? "Generate message" : "Generate message anyway"}
									</Button>
									<Button
										className="mt-2"
										variant={'danger'}
										onClick={onClose}
									>
										Cancel
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}