import { Chip } from "@heroui/react";
import config from "@/config";
import PageTransition from "@/components/PageTransition";
import Divider from "@/components/Divider";
import PageTitle from "@/components/PageTitle";

export default function Page() {
  document.title = config.pageTitle + " - Skills";

  const webDev = [
    { label: "HTML", info: "" },
    { label: "CSS", info: "" },
    { label: "JavaScript", info: "" },
    { label: "TypeScript", info: "" },
    { label: "Sass", info: "" },
    { label: "Vue.js", info: "2019" },
    { label: "Quasar", info: "" },
    { label: "React", info: "2024" },
    { label: "Next.js", info: "" },
    { label: "PHP", info: "" },
    { label: "Git", info: "" },
    { label: "Node.js", info: "" },
    { label: "Express.js", info: "" },
    { label: "REST APIs", info: "" },
    { label: "Electron", info: "" },
  ];

  const graphicDesign = [
    { label: "Figma", info: "" },
    { label: "Affinity Photo", info: "" },
    { label: "Affinity Designer", info: "" },
    { label: "Affinity Publisher", info: "" },
    { label: "Adobe Photoshop", info: "" },
    { label: "Adobe Illustrator", info: "" },
    { label: "Adobe InDesign", info: "" },
    { label: "CLIP Studio Paint", info: "" },
    { label: "Aseprite", info: "" },
  ];

  return (
    <PageTransition>
      <div className="page">
        <PageTitle title="Skills" icon="iconamoon:lightning-1-light" />

        <h2>Web development</h2>
        <div className="flex flex-wrap gap-2">
          {webDev.map((item) => (
            <Chip
              variant="flat"
              className="bg-white/20 text-white"
              key={item.label}
            >
              {item.label}
            </Chip>
          ))}
        </div>

        <Divider />

        <h2>Graphic design / Illustration</h2>
        <div className="flex flex-wrap gap-2">
          {graphicDesign.map((item) => (
            <Chip
              variant="flat"
              className="bg-white/20 text-white"
              key={item.label}
            >
              {item.label}
            </Chip>
          ))}
        </div>

        <Divider />

        <h2>Languages</h2>
        <ul className="list-disc list-inside">
          <li>
            <b>Swedish</b> — fluent (native)
          </li>
          <li>
            <b>English</b> — fluent
          </li>
        </ul>
      </div>
    </PageTransition>
  );
}
