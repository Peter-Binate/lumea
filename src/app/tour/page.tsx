import { Plus } from 'lucide-react';
import DashboardTemplate from '../components/templates/dashboard/DashboardTemplate';
import { Button } from '../components/ui/Button';

export default function Tour() {
  return (
    <>
      <h1 className="text-slate-900 text-[28px] font-semibold mt-8 mb-8 sm:mt-0">
        🏠 Vos tours
      </h1>
      <DashboardTemplate>
        {/* <div className="flex justify-between py-5 px-6"> */}
        <div className="flex flex-col md:flex-row md:justify-between py-5 px-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">Vos visites</h2>
            <p className="text-gray-600 text-sm">
              Retrouvez la liste de vos différentes visites Gaussian
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button className="w-full">
              <Plus /> Demander une visite
            </Button>
          </div>
        </div>
      </DashboardTemplate>
    </>
  );
}
