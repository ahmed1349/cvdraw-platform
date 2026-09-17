import { ThemedCV } from "@/features/templates/engine/ThemedCV";
import type { CVTemplateProps } from "@/features/templates/types";

export default function MinimalCode(props: CVTemplateProps) {
  return <ThemedCV {...props} />;
}
