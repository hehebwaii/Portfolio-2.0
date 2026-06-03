export const biosBootSchema = {
  name: 'biosBoot',
  title: 'Bios Boot Configuration',
  type: 'document',
  fields: [
    {
      name: 'kernelVersion',
      title: 'Kernel Version',
      type: 'string',
      initialValue: '2.0.26',
    },
    {
      name: 'diagnosticLines',
      title: 'Diagnostic Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'completionTime',
      title: 'Completion Time (ms)',
      type: 'number',
      initialValue: 2200,
    },
  ],
};
