import { Input } from '@/app/components/ui/Input';
import { VehicleSelect } from '@/app/components/ui/vehicle-select';
import { ViewTypeSelect } from '@/app/components/ui/view-type-select';
import { TourFormData, TourViewChoiceType } from '@/types/tour';

type TourInfoFormProps = {
  formData: TourFormData;
  updateFormData: (data: Partial<TourFormData>) => void;
};

export const TourInfoForm = ({
  formData,
  updateFormData,
}: TourInfoFormProps) => {
  const handleChange =
    (field: keyof TourFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateFormData({ [field]: e.target.value });
    };

  const handleVehicleChange = (value: string) => {
    updateFormData({ vehicle: value });
  };

  const handleViewTypeChange = (value: TourViewChoiceType) => {
    updateFormData({ view: value });
  };

  return (
    <>
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Informations générales
      </h2>
      <div className="space-y-5">
        <Input
          value={formData.title}
          onChange={handleChange('title')}
          placeholder="Titre de la visite"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={handleChange('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Une brève description de la visite que vous souhaitez créer."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Véhicule
          </label>
          <VehicleSelect
            value={formData.vehicle}
            onChange={handleVehicleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de vue
          </label>
          <ViewTypeSelect
            value={formData.view}
            onChange={handleViewTypeChange}
          />
        </div>
      </div>
    </>
  );
};