import { NewProjectForm } from "@/components/modules/dashboard/project/create/ProjectForm";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
export default function NewProject() {
	return (
		<>
			<div className="py-3 pl-4">
				<DashboardBreadCrumb breadcrumbData={{ level: "Project", title: "[새 프로젝트]", project_id: "" }} />
			</div>
			<NewProjectForm />
		</>
	);
}
