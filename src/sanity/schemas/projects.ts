export const projectsSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'index',
      title: 'Index (e.g. 001)',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'string',
    },
    {
      name: 'col1Image1',
      title: 'Column 1 Image 1',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'col1Image2',
      title: 'Column 1 Image 2',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'col2TallImage',
      title: 'Column 2 Tall Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
