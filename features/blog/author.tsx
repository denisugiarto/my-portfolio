import { AuthorType } from "@/types/blog";
import Image from "next/image";

export default function Author({
  name,
  profile_image,
}: Pick<AuthorType, "name" | "profile_image">) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={profile_image}
        alt={name}
        className="h-8 w-8 rounded-full"
        width={32}
        height={32}
      />
      <p className="text-sm font-medium dark:text-slate-50">{name}</p>
    </div>
  );
}
