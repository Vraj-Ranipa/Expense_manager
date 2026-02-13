import { ProjectGrid } from "@/components/projects/project-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectsClientProps {
    data: any[];
}

export function ProjectsClient({ data }: ProjectsClientProps) {
    return (
        <div className="space-y-4">
            <ProjectGrid data={data} />
        </div>
    );
}
