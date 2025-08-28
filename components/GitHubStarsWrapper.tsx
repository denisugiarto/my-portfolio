import { SiGithub } from "@icons-pack/react-simple-icons";
import { StarIcon } from "lucide-react";
import SimpleTooltip from "./ui/simple-tooltip";

interface GitHubStarsWrapperProps {
  stars: number;
  loading?: boolean;
}

export default function GitHubStarsWrapper({
  stars,
  loading = false,
}: GitHubStarsWrapperProps) {
  return (
    <SimpleTooltip title="Star on Github">
      <a
        href="https://github.com/denisugiarto/my-portfolio"
        target="_blank"
        rel="noreferrer"
        title="Star on Github"
        className="group flex items-center gap-1 rounded-xl border border-border/30 bg-card/80 p-2 px-3 font-title text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
      >
        <SiGithub title="Star on Github" className="h-4 text-current" />
        <span>
          <StarIcon fill="currentColor" className="h-3.5 text-inherit" />
        </span>
        <span className="hidden font-medium lg:inline">
          {loading ? <span className="animate-pulse">···</span> : stars || 0}
        </span>
      </a>
    </SimpleTooltip>
  );
}
