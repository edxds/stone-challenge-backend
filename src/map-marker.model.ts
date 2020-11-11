import mongoose, { Document, Schema } from 'mongoose';

import { defaultSchemaOptions } from './database';

const mapMarkerSchema = new Schema(
  {
    type: { type: String, enum: ['CLIENT', 'PROPOSAL', 'QUALIFICATION'] },
    favorite: { type: Boolean, required: true, default: false },
    position: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    info: {
      address: { type: String, required: true },
      shopName: { type: String, required: true },
      shopType: { type: String, required: true },
      merchantName: { type: String, required: true },
      averageCardRevenue: { type: Number, required: true },
    },
  },
  { ...defaultSchemaOptions },
);

export type StoneMapMarkerType = 'CLIENT' | 'PROPOSAL' | 'QUALIFICATION';

export type StoneMapMarkerInfo = {
  address: string;
  shopName: string;
  shopType: string;
  merchantName: string;
  averageCardRevenue: number;
};

export interface MapMarkerSchema extends Document {
  id: number;
  type: StoneMapMarkerType;
  favorite: boolean;
  position: { lat: number; lng: number };
  info: StoneMapMarkerInfo;
}

export const MapMarker = mongoose.model<MapMarkerSchema>('MapMarker', mapMarkerSchema);
