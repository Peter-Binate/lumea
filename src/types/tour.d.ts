// Définition de l'énumération des types de compartiments
export const TOUR_VIEW_CHOICES = {
    OUTSIDE: 0,
    INSIDE: 1,
    MOTOR: 2,
    TRUNK: 3,
    OTHER: 4,
} as const;
  
export type TourViewChoiceType = 
    (typeof TOUR_VIEW_CHOICES)[keyof typeof TOUR_VIEW_CHOICES];
  
export interface Compartment {
    id: string;
    type: TourViewChoiceType;
    isActive: boolean;
}