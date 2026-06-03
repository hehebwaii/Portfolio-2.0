// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  // See docs on schema definition for more details: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "portfolio",
        label: "Portfolio Data",
        path: "content/portfolio",
        format: "json",
        fields: [
          {
            type: "object",
            name: "biosBoot",
            label: "BIOS Boot Sequence",
            fields: [
              { type: "string", name: "kernelVersion", label: "Kernel Version" },
              { type: "string", name: "diagnosticLines", label: "Diagnostic Lines", list: true },
              { type: "number", name: "completionTime", label: "Completion Time (ms)" },
              { type: "string", name: "copyrightText", label: "Copyright Text" },
              { type: "string", name: "loadingText", label: "Loading Progress Prefix" },
              { type: "string", name: "loadedText", label: "Loaded Complete Message" },
              { type: "string", name: "energyStarText", label: "Energy Star Text (Multi-line)", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "navigationSettings",
            label: "Navigation Settings",
            fields: [
              { type: "string", name: "logoText", label: "Logo Text" },
              {
                type: "object",
                name: "navLinks",
                label: "Navigation Links",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "slug", label: "Slug" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "mainTitle", label: "Main Title", ui: { component: "textarea" } },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "signatureSvgPath", label: "Signature SVG Path", ui: { component: "textarea" } },
              { type: "number", name: "signatureScaleMobile", label: "Signature Scale Mobile" },
              { type: "number", name: "signatureScaleDesktop", label: "Signature Scale Desktop" }
            ]
          },
          {
            type: "object",
            name: "services",
            label: "Services Section",
            fields: [
              { type: "string", name: "sectionHeading", label: "Section Heading" },
              {
                type: "object",
                name: "items",
                label: "Service Items",
                list: true,
                fields: [
                  { type: "string", name: "index", label: "Index (e.g. 01)" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "projects",
            label: "Projects Section",
            fields: [
              { type: "string", name: "sectionHeading", label: "Section Heading" },
              {
                type: "object",
                name: "cards",
                label: "Project Cards",
                list: true,
                fields: [
                  { type: "string", name: "index", label: "Index" },
                  { type: "string", name: "name", label: "Project Name" },
                  { type: "string", name: "category", label: "Category" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "liveUrl", label: "Live URL" },
                  { type: "string", name: "col1Image1", label: "Column 1 Image 1 URL" },
                  { type: "string", name: "col1Image2", label: "Column 1 Image 2 URL" },
                  { type: "string", name: "col2TallImage", label: "Column 2 Tall Image URL" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "skillsMatrix",
            label: "Skills Matrix",
            fields: [
              { type: "string", name: "sectionHeading", label: "Section Heading" },
              {
                type: "object",
                name: "skillCategories",
                label: "Skill Categories",
                list: true,
                fields: [
                  { type: "string", name: "categoryName", label: "Category Name" },
                  {
                    type: "object",
                    name: "skills",
                    label: "Skills",
                    list: true,
                    fields: [
                      { type: "string", name: "name", label: "Skill Name" },
                      { type: "number", name: "level", label: "Skill Level (%)" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "devHud",
            label: "Dev HUD Telemetry",
            fields: [
              { type: "number", name: "sustainationBaseLatency", label: "Sustaination Base Latency" },
              { type: "string", name: "sustainationHarvestNodes", label: "Sustaination Harvest Nodes" },
              { type: "string", name: "sustainationEfficiency", label: "Sustaination Efficiency" },
              { type: "number", name: "oscilloscopeBaseAmplitude", label: "Oscilloscope Base Amplitude" },
              {
                type: "object",
                name: "telemetryTable",
                label: "Telemetry Table Rows",
                list: true,
                fields: [
                  { type: "string", name: "coreName", label: "Core Name" },
                  { type: "string", name: "telemetryDetails", label: "Telemetry Details", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cameraSequence",
            label: "Camera Sequence Settings",
            fields: [
              { type: "number", name: "totalFrames", label: "Total Frames" },
              { type: "string", name: "act1Title", label: "Act 1 Title" },
              { type: "string", name: "act1Subtitle", label: "Act 1 Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "act2Title", label: "Act 2 Title" },
              { type: "string", name: "act2Subtitle", label: "Act 2 Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "act3Title", label: "Act 3 Title" },
              { type: "string", name: "act3Subtitle", label: "Act 3 Subtitle", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer Settings",
            fields: [
              { type: "string", name: "copyrightText", label: "Copyright Text" },
              {
                type: "object",
                name: "socialLinks",
                label: "Social Links",
                list: true,
                fields: [
                  { type: "string", name: "platformName", label: "Platform Name" },
                  { type: "string", name: "url", label: "URL" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "sectionOrder",
            label: "Sections Render Order",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.sectionKey ? `Section: ${item.sectionKey.toUpperCase()}` : "New Section" };
              }
            },
            fields: [
              {
                type: "string",
                name: "sectionKey",
                label: "Section Key",
                options: [
                  { value: "hero", label: "01. Hero Section" },
                  { value: "about", label: "02. Core Identity" },
                  { value: "skills", label: "03. Technical Capabilities" },
                  { value: "timeline", label: "04. Experience Timeline" },
                  { value: "services", label: "05. Services" },
                  { value: "projects", label: "06. Projects" },
                  { value: "canvas", label: "07. 3D Camera Scroll Sequence" },
                  { value: "filmstrip", label: "08. Film Strip" },
                  { value: "achievements", label: "09. Verified Benchmarks" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "timeline",
            label: "Experience Timeline",
            fields: [
              { type: "string", name: "sectionHeading", label: "Section Heading" },
              {
                type: "object",
                name: "items",
                label: "Timeline Items",
                list: true,
                fields: [
                  { type: "string", name: "id", label: "Unique ID (e.g. btech)" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "date", label: "Date Range (e.g. 2023-2027)" },
                  { type: "boolean", name: "active", label: "Currently Active Role" },
                  { type: "string", name: "detail", label: "Detailed Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "aboutProfile",
            label: "Core Identity (About)",
            fields: [
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "networkLabel", label: "Network Label" },
              { type: "string", name: "networkUrl", label: "Network URL" },
              { type: "string", name: "languages", label: "Languages", list: true },
              { type: "string", name: "story", label: "Story", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "filmstrip",
            label: "Film Strip (Photography)",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "photos",
                label: "Photos",
                list: true,
                fields: [
                  { type: "image", name: "url", label: "Image URL" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "backstory", label: "Backstory", ui: { component: "textarea" } },
                  { type: "string", name: "gear", label: "Gear (e.g. Sony A7III)" },
                  { type: "string", name: "settings", label: "Settings (e.g. f/8 | 1/250s)" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "achievements",
            label: "Verified Benchmarks (Achievements)",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "benchmarks",
                label: "Benchmarks",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "date", label: "Date" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
