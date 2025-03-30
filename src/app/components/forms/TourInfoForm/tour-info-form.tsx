import Input from '@/app/components/ui/Input';
import { TourTypeRadio } from '@/app/components/ui/tour-type-radio';
import { TourFormData } from '@/types/tour';

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

  const handleTourTypeChange = (value: string) => {
    updateFormData({ tour_type: value });
  };

  return (
    <>
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Informations générales
      </h2>
      <div className="space-y-5">
        <Input
          label="Titre"
          value={formData.title}
          onChange={handleChange('title')}
          placeholder="Nom de la visite"
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
            Type de tour
          </label>
          <TourTypeRadio onChange={handleTourTypeChange} />
        </div>
      </div>
    </>
  );
};
