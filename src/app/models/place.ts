export type LanguageCode = 'en';

export type Photo = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: { displayName: string; uri: string; photoUri: string }[];
  flagContentUri: string;
  googleMapsUri: string;
};

export type Review = {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: {
    text: string;
    languageCode: LanguageCode;
  };
  originalText: {
    text: String;
    languageCode: LanguageCode;
  };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
  flagContentUri: string;
  googleMapsUri: string;
};

export type Place = {
  id: string;
  types: string[];
  formattedAddress: string;
  rating: number;
  displayName: {
    text: string;
    languageCode: LanguageCode;
  };
  photos: Photo[];
  iconMaskBaseUri: string;
  iconBackgroundColor: string;
  reviews?: Review[];
};
