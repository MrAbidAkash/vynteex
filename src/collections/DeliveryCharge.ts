// in your payload config file, e.g., payload.config.ts

import { CollectionConfig } from 'payload'

const DeliveryCharge: CollectionConfig = {
  slug: 'delivery-charge',
  labels: {
    singular: 'Delivery Charge',
    // plural: 'Delivery Charges',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    // delete: () => true,
  },
  fields: [
    {
      name: 'deliveryCharge',
      type: 'number',
      required: true,
      max: 1,
      defaultValue: 50,
    },
  ],
}

export default DeliveryCharge
