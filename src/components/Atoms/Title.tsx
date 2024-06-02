import { cn } from "@/lib/utils";

type Props = {
  text: string;
  isCenter?: boolean;
};

function Title({ text, isCenter }: Props) {
  return (
    <p
      className={cn("text-2xl font-medium", {
        "text-center": isCenter,
      })}
    >
      {text}
    </p>
  );
}

export default Title;
