import HeroSectionFeature from "@/features/Hero";
import AboutSectionFeature from "@/features/About";
import SkillSectionFeature from "@/features/Skill";
import ExperienceSectionFeature from "@/features/Experience";
import ProjectSectionFeature from "@/features/Project";
import ContactSectionFeature from "@/features/Contact";

const LandingPage = () => {
  return (
    <>
      <HeroSectionFeature />
      <AboutSectionFeature />
      <SkillSectionFeature />
      <ExperienceSectionFeature />
      <ProjectSectionFeature />
      <ContactSectionFeature />
    </>
  );
};

export default LandingPage;
