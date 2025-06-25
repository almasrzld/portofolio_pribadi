import HeroSectionFeature from "@/features/Hero";
import AboutSectionFeature from "@/features/About";
import SkillSectionFeature from "@/features/Skill";
import ProjectSectionFeature from "@/features/Project";
import ContactSectionFeature from "@/features/Contact";

const LandingPage = () => {
  return (
    <>
      <HeroSectionFeature />
      <AboutSectionFeature />
      <SkillSectionFeature />
      <ProjectSectionFeature />
      <ContactSectionFeature />
    </>
  );
};

export default LandingPage;
