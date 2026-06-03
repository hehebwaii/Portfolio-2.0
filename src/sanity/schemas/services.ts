export const servicesSchema = {
  name: 'services',
  title: 'Services Configuration',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Services',
    },
    {
      name: 'items',
      title: 'Service Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          title: 'Service Item',
          fields: [
            {
              name: 'index',
              title: 'Index (e.g. 01)',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};
