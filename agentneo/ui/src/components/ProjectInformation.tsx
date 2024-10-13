import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, DollarSign, Clock, FileText, Coins, AlertTriangle } from 'lucide-react';

interface ProjectInfoProps {
  projectData: {
    id: number;
    project_name: string;
    start_time: string;
    end_time: string | null;
    duration: number | null;
    total_cost: number | null;
    total_tokens: number | null;
  } | null;
}

const ProjectInformation: React.FC<ProjectInfoProps> = ({ projectData }) => {
  if (!projectData) {
    return <div>No project data available</div>;
  }

  const calculateDuration = () => {
    if (projectData.duration) {
      return `${projectData.duration.toFixed(2)} seconds`;
    }
    if (projectData.start_time && projectData.end_time) {
      const start = new Date(projectData.start_time);
      const end = new Date(projectData.end_time);
      const durationMs = end.getTime() - start.getTime();
      return `${(durationMs / 1000).toFixed(2)} seconds`;
    }
    return "In progress";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Project Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem icon={<Folder className="w-5 h-5 text-indigo-600" />} label="Project Name" value={projectData.project_name} />
          <InfoItem icon={<DollarSign className="w-5 h-5 text-green-600" />} label="Total Cost" value={projectData.total_cost ? `$${projectData.total_cost.toFixed(2)}` : 'N/A'} />
          <InfoItem icon={<Clock className="w-5 h-5 text-blue-600" />} label="Duration" value={calculateDuration()} />
          <InfoItem icon={<Coins className="w-5 h-5 text-yellow-600" />} label="Total Tokens" value={projectData.total_tokens ? projectData.total_tokens.toLocaleString() : 'N/A'} />
          <InfoItem icon={<Clock className="w-5 h-5 text-purple-600" />} label="Start Time" value={new Date(projectData.start_time).toLocaleString()} />
          <InfoItem icon={<Clock className="w-5 h-5 text-red-600" />} label="End Time" value={projectData.end_time ? new Date(projectData.end_time).toLocaleString() : 'In progress'} />
        </div>
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    {icon}
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  </div>
);

export default ProjectInformation;