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
        className="group flex h-12 items-center gap-3 rounded-none border-[3px] border-foreground bg-background px-4 font-bold uppercase tracking-wider text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <SiGithub title="Star on Github" className="h-5 w-5 fill-current" />
        <span className="flex items-center gap-1">
          <StarIcon className="h-5 w-5 fill-current stroke-[3]" />
          <span className="font-black text-sm">
            {loading ? <span className="animate-pulse">···</span> : stars || 0}
          </span>
        </span>
      </a>
    </SimpleTooltip>
  );
}
